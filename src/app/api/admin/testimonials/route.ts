import { NextRequest } from 'next/server';
import { handleResourceGet, handleResourcePost } from '../utils/resourceHandlers';

export function GET(request: NextRequest) {
  return handleResourceGet(request, 'testimonials');
}

export function POST(request: NextRequest) {
  return handleResourcePost(request, 'testimonials');
}




