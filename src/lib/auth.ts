import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AuthUser {
  userId: string;
  email: string;
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as JwtPayload & AuthUser;
    return { userId: decoded.userId, email: decoded.email };
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  
  return parts[1];
}

export function requireAuth(request: NextRequest): AuthUser {
  const token = getTokenFromRequest(request);
  
  if (!token) {
    throw new Error('Token manquant');
  }
  
  const user = verifyToken(token);
  
  if (!user) {
    throw new Error('Token invalide');
  }
  
  return user;
}

