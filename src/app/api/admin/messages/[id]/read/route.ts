import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    requireAuth(request);
    
    const message = await prisma.contactMessage.update({
      where: { id: params.id },
      data: { read: true }
    });
    
    return NextResponse.json(message);
  } catch (error: any) {
    if (error.message === 'Token manquant' || error.message === 'Token invalide') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    console.error('Erreur PUT message read:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}



