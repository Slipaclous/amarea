import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    requireAuth(request);
    
    await prisma.contactMessage.delete({ where: { id: params.id } });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Token manquant' || error.message === 'Token invalide') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    console.error('Erreur DELETE message:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}



