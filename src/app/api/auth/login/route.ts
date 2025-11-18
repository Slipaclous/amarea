import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('DEBUG: Login attempt started');
    const { email, password } = await request.json();
    console.log('DEBUG: Email reçu:', email);

    console.log('DEBUG: Recherche utilisateur...');
    const user = await prisma.user.findUnique({
      where: { email }
    });
    console.log('DEBUG: Utilisateur trouvé:', user ? 'OUI' : 'NON');

    if (!user) {
      console.log('DEBUG: Utilisateur non trouvé');
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    console.log('DEBUG: Vérification du mot de passe...');
    const isValid = await bcrypt.compare(password, user.password);
    console.log('DEBUG: Mot de passe valide:', isValid);

    if (!isValid) {
      console.log('DEBUG: Mot de passe invalide');
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    console.log('DEBUG: Génération du token JWT...');
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    console.log('DEBUG: Token généré avec succès');

    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('❌ ERREUR LOGIN:', error);
    console.error('Stack:', error instanceof Error ? error.stack : 'Pas de stack');
    
    // Retourner plus de détails sur l'erreur en développement
    const errorMessage = error instanceof Error ? error.message : 'Erreur serveur inconnue';
    const isDev = process.env.NODE_ENV !== 'production';
    
    return NextResponse.json(
      { 
        error: 'Erreur serveur',
        ...(isDev && { details: errorMessage, timestamp: new Date().toISOString() })
      },
      { status: 500 }
    );
  }
}




