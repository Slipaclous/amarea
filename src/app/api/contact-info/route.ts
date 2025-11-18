import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contactInfo = await prisma.contactInfo.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error('Erreur contact-info:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}




