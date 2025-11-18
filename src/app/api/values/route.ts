import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const values = await prisma.value.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(values);
  } catch (error) {
    console.error('Erreur values:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}




