import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Erreur testimonials:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}




