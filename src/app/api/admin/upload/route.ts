import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { requireAuth } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 Mo
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const BUCKET_NAME = 'images';

// Initialiser Supabase avec la clé de service (serveur-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

function sanitizeFilename(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9.-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || 'image';
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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const extension = getExtension(file);
    const baseName = sanitizeFilename(file.name.replace(/\.[^.]+$/, ''));
    const fileName = `${Date.now()}-${baseName}.${extension}`;

    // Traiter l'image avec Sharp
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

    // Uploader vers Supabase Storage
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, finalBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('[API][admin][upload] Erreur Supabase:', error);
      return NextResponse.json(
        { error: `Erreur upload: ${error.message}` },
        { status: 500 }
      );
    }

    // Récupérer l'URL publique
    const { data: publicData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: publicData.publicUrl,
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

