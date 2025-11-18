import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const stats = await prisma.stat.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erreur stats:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}




