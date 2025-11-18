import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, weddingDate, guestCount, budget, message } = body;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        weddingDate: weddingDate || null,
        guestCount: guestCount || null,
        budget: budget || null,
        message
      }
    });

    return NextResponse.json({ success: true, message: contactMessage });
  } catch (error) {
    console.error('Erreur contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}



