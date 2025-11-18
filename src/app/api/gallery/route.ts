import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(images);
  } catch (error) {
    console.error('Erreur gallery:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}




