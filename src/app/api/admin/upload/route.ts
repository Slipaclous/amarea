import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';
import { requireAuth } from '@/lib/auth';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 Mo
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images');

function sanitizeFilename(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || 'image';
}

async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

function getExtension(file: File) {
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  return 'jpg';
}

export async function POST(request: NextRequest) {
  try {
    requireAuth(request);

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'Aucun fichier reçu' },
        { status: 400 }
      );
    }

    if (!SUPPORTED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format non pris en charge. Utilisez JPG, PNG ou WEBP.' },
        { status: 415 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Le fichier dépasse 4 Mo. Compressez-le avant upload.' },
        { status: 413 }
      );
    }

    await ensureUploadDir();

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const extension = getExtension(file);
    const baseName = sanitizeFilename(file.name.replace(/\.[^.]+$/, ''));
    const fileName = `${Date.now()}-${baseName}.${extension}`;
    const outputPath = path.join(UPLOAD_DIR, fileName);

    let transformer = sharp(buffer).rotate();
    const metadata = await transformer.metadata();

    if ((metadata.width || 0) > 1600) {
      transformer = transformer.resize({
        width: 1600,
        withoutEnlargement: true,
      });
    }

    let finalBuffer: Buffer;
    switch (extension) {
      case 'png':
        finalBuffer = await transformer.png({ compressionLevel: 8 }).toBuffer();
        break;
      case 'webp':
        finalBuffer = await transformer.webp({ quality: 80 }).toBuffer();
        break;
      default:
        finalBuffer = await transformer.jpeg({ quality: 82 }).toBuffer();
        break;
    }

    await fs.writeFile(outputPath, finalBuffer);

    return NextResponse.json({
      url: `/images/${fileName}`,
      size: finalBuffer.length,
      originalName: file.name,
    });
  } catch (error: any) {
    if (error?.message === 'Token manquant' || error?.message === 'Token invalide') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    console.error('[API][admin][upload] Erreur upload:', error);
    return NextResponse.json(
      { error: 'Impossible de téléverser le fichier' },
      { status: 500 }
    );
  }
}

