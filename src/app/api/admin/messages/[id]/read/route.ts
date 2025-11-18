import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/lib/auth';

const prisma = new PrismaClient();

type Params = { id: string };

export async function PUT(
  request: NextRequest,
  context: any
) {
  try {
    requireAuth(request);

    const params = await Promise.resolve(
      context?.params as Params | Promise<Params>
    );

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



