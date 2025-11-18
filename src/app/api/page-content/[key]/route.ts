import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/lib/auth';

const prisma = new PrismaClient();

type Params = { key: string };

export async function PUT(
  request: NextRequest,
  context: any
) {
  try {
    requireAuth(request);
    
    const body = await request.json();
    const { key: keyFromBody, value, type = 'text' } = body;
    
    // Gérer les deux formats de params (Next.js 13+ peut retourner une Promise)
    const resolvedParams = await Promise.resolve(
      context?.params as Params | Promise<Params>
    );
    const rawKeyFromUrl = resolvedParams?.key;
    
    // Utiliser la clé du body en priorité, sinon celle de l'URL
    let decodedKey = keyFromBody || rawKeyFromUrl;
    
    // Décoder la clé si elle vient de l'URL
    if (decodedKey && decodedKey !== rawKeyFromUrl) {
      try {
        decodedKey = decodeURIComponent(decodedKey);
        if (decodedKey.includes('%')) {
          decodedKey = decodeURIComponent(decodedKey);
        }
      } catch (e) {
        // Ignorer l'erreur de décodage
      }
    }
    
    console.log(`[API] PUT request - key from body: "${keyFromBody}", key from URL: "${rawKeyFromUrl}", final: "${decodedKey}"`);
    console.log(`[API] Value:`, value?.substring(0, 100));
    
    if (!decodedKey || decodedKey === 'undefined' || !decodedKey.trim()) {
      console.error(`[API] Invalid key - body: "${keyFromBody}", URL: "${rawKeyFromUrl}"`);
      return NextResponse.json(
        { error: 'Clé invalide. La clé doit être fournie dans le body de la requête.' },
        { status: 400 }
      );
    }
    
    const content = await prisma.siteContent.upsert({
      where: { key: decodedKey },
      update: { value, type },
      create: { 
        key: decodedKey, 
        value, 
        type 
      }
    });
    
    console.log(`[API] Saved content:`, { id: content.id, key: content.key, valueLength: content.value?.length || 0 });
    
    return NextResponse.json(content);
  } catch (error: any) {
    if (error.message === 'Token manquant' || error.message === 'Token invalide') {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }
    console.error('Erreur page-content PUT:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    const resolvedParams = await Promise.resolve(
      context?.params as Params | Promise<Params>
    );
    const rawKey = resolvedParams.key;
    
    let decodedKey = rawKey;
    try {
      decodedKey = decodeURIComponent(rawKey);
      if (decodedKey.includes('%')) {
        decodedKey = decodeURIComponent(decodedKey);
      }
    } catch (e) {
      decodedKey = rawKey;
    }
    
    const content = await prisma.siteContent.findUnique({
      where: { key: decodedKey }
    });
    
    if (!content) {
      return NextResponse.json(null);
    }
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Erreur page-content GET:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

