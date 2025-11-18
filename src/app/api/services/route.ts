import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Erreur services:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}



