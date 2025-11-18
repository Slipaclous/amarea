import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/lib/auth';

const prisma = new PrismaClient();

const resourceMap = {
  services: prisma.service,
  testimonials: prisma.testimonial,
  gallery: prisma.galleryImage,
  stats: prisma.stat,
  values: prisma.value,
  'contact-info': prisma.contactInfo,
};

type ResourceKey = keyof typeof resourceMap;

function resolveResource(resourceKey: string) {
  return resourceMap[resourceKey as ResourceKey];
}

function handleAuthErrors(error: any) {
  if (error?.message === 'Token manquant' || error?.message === 'Token invalide') {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    );
  }
  return null;
}

export async function handleResourceGet(request: NextRequest, resourceKey: string) {
  try {
    console.log('[API][admin]', 'GET resource:', resourceKey);
    requireAuth(request);

    const resource = resolveResource(resourceKey);
    if (!resource) {
      console.warn('[API][admin]', 'Resource not found:', resourceKey);
      return NextResponse.json(
        { error: 'Ressource non trouvée' },
        { status: 404 }
      );
    }

    // Type assertion to work around Prisma union type issue
    const items = await (resource as any).findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(items);
  } catch (error: any) {
    const authResponse = handleAuthErrors(error);
    if (authResponse) return authResponse;

    console.error(`[API][admin] Erreur GET ${resourceKey}:`, error);
    return NextResponse.json(
      { error: error?.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function handleResourcePost(request: NextRequest, resourceKey: string) {
  try {
    console.log('[API][admin]', 'POST resource:', resourceKey);
    requireAuth(request);

    const resource = resolveResource(resourceKey);
    if (!resource) {
      console.warn('[API][admin]', 'Resource not found (POST):', resourceKey);
      return NextResponse.json(
        { error: 'Ressource non trouvée' },
        { status: 404 }
      );
    }

    const body = await request.json();
    // Type assertion here as well
    const item = await (resource as any).create({ data: body });

    return NextResponse.json(item);
  } catch (error: any) {
    const authResponse = handleAuthErrors(error);
    if (authResponse) return authResponse;

    console.error(`[API][admin] Erreur POST ${resourceKey}:`, error);
    return NextResponse.json(
      { error: error?.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}