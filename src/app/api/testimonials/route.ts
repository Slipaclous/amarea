import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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




