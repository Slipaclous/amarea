import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    requireAuth(request);
    
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(messages);
  } catch (error: any) {
    if (error.message === 'Token manquant' || error.message === 'Token invalide') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    console.error('Erreur messages:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}




