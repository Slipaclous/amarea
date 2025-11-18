import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

type Params = { id: string };

export async function DELETE(
  request: NextRequest,
  context: any
) {
  try {
    requireAuth(request);

    const params = await Promise.resolve(
      context?.params as Params | Promise<Params>
    );

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



