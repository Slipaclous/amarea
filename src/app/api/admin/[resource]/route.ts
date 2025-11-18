import { NextRequest } from 'next/server';
import { handleResourceGet, handleResourcePost } from '../utils/resourceHandlers';

export async function GET(
  request: NextRequest,
  context: any
) {
  const params = await Promise.resolve(
    context?.params as { resource: string } | Promise<{ resource: string }>
  );
  return handleResourceGet(request, params.resource);
}

export async function POST(
  request: NextRequest,
  context: any
) {
  const params = await Promise.resolve(
    context?.params as { resource: string } | Promise<{ resource: string }>
  );
  return handleResourcePost(request, params.resource);
}

