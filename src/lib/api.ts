const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchServices() {
  try {
    const res = await fetch(`${API_URL}/services`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function fetchTestimonials() {
  try {
    const res = await fetch(`${API_URL}/testimonials`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function fetchGallery() {
  try {
    const res = await fetch(`${API_URL}/gallery`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch gallery');
    return res.json();
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
}

export async function fetchStats() {
  try {
    const res = await fetch(`${API_URL}/stats`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
}

export async function fetchValues() {
  try {
    const res = await fetch(`${API_URL}/values`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch values');
    return res.json();
  } catch (error) {
    console.error('Error fetching values:', error);
    return [];
  }
}

export async function fetchContactInfo() {
  try {
    const res = await fetch(`${API_URL}/contact-info`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch contact info');
    return res.json();
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return [];
  }
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  weddingDate?: string;
  guestCount?: string;
  budget?: string;
  message: string;
}) {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit contact');
    return res.json();
  } catch (error) {
    console.error('Error submitting contact:', error);
    throw error;
  }
}

