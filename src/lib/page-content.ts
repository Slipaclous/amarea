const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface PageContent {
  [key: string]: string;
}

export async function getPageContent(page: string): Promise<PageContent> {
  try {
    // Ajouter un timestamp pour éviter le cache
    const res = await fetch(`${API_URL}/page-content?page=${page}&t=${Date.now()}`, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    if (!res.ok) {
      console.warn('Failed to fetch page content:', res.status);
      return {};
    }
    const content = await res.json();
    
    // Convertir le tableau en objet avec les clés
    const contentMap: PageContent = {};
    if (Array.isArray(content)) {
      content.forEach((item: any) => {
        if (item && item.key && item.value !== undefined) {
          contentMap[item.key] = item.value;
        }
      });
    }
    
    return contentMap;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return {};
  }
}

export async function getContent(key: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/page-content/${encodeURIComponent(key)}`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return null;
    const content = await res.json();
    return content?.value || null;
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
}

