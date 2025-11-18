import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

const resourceMap: { [key: string]: any } = {
  services: prisma.service,
  testimonials: prisma.testimonial,
  gallery: prisma.galleryImage,
  stats: prisma.stat,
  values: prisma.value,
  'contact-info': prisma.contactInfo,
};

type Params = { resource: string; id: string };

export async function PUT(
  request: NextRequest,
  context: any
) {
  let resolvedParams: Params | undefined; // Declare outside try block
  
  try {
    requireAuth(request);

    resolvedParams = await Promise.resolve(
      context?.params as Params | Promise<Params>
    );
    const resource = resourceMap[resolvedParams.resource];
    if (!resource) {
      return NextResponse.json(
        { error: 'Ressource non trouvée' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const item = await resource.update({
      where: { id: resolvedParams.id },
      data: body
    });
    
    return NextResponse.json(item);
  } catch (error: any) {
    if (error.message === 'Token manquant' || error.message === 'Token invalide') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    console.error(`Erreur PUT ${resolvedParams?.resource || 'unknown'}:`, error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: any
) {
  let resolvedParams: Params | undefined; // Declare outside try block
  
  try {
    requireAuth(request);

    resolvedParams = await Promise.resolve(
      context?.params as Params | Promise<Params>
    );
    const resource = resourceMap[resolvedParams.resource];
    if (!resource) {
      return NextResponse.json(
        { error: 'Ressource non trouvée' },
        { status: 404 }
      );
    }

    await resource.delete({ where: { id: resolvedParams.id } });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Token manquant' || error.message === 'Token invalide') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    console.error(`Erreur DELETE ${resolvedParams?.resource || 'unknown'}:`, error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}