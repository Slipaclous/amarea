import { NextRequest } from 'next/server';
import { handleResourceGet, handleResourcePost } from '../utils/resourceHandlers';

export async function GET(
  request: NextRequest,
  { params }: { params: { resource: string } }
) {
  return handleResourceGet(request, params.resource);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { resource: string } }
) {
  return handleResourcePost(request, params.resource);
}

