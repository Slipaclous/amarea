import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    
    console.log(`[API] GET request for page: "${page}"`);
    
    const where = page ? { key: { startsWith: `${page}.` } } : {};
    
    console.log(`[API] Prisma query where:`, JSON.stringify(where));
    
    const content = await prisma.siteContent.findMany({
      where,
      orderBy: { key: 'asc' }
    });
    
    console.log(`[API] Found ${content.length} items in database`);
    if (content.length > 0) {
      console.log(`[API] First item:`, content[0]);
    } else {
      // Vérifier s'il y a des données dans la table
      const allContent = await prisma.siteContent.findMany({ take: 5 });
      console.log(`[API] Total items in SiteContent table:`, allContent.length);
      if (allContent.length > 0) {
        console.log(`[API] Sample keys:`, allContent.map(c => c.key));
      }
    }
    
    return NextResponse.json(content, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Erreur page-content:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, type = 'text' } = body;
    
    const content = await prisma.siteContent.upsert({
      where: { key },
      update: { value, type },
      create: { key, value, type }
    });
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Erreur page-content POST:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

