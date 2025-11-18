'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Settings, 
  MessageSquare, 
  Image as ImageIcon, 
  Users, 
  Award,
  Phone,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  FileText,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import FormFields from './components/FormFields';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function Admin() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('services');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    if (!storedToken) {
      router.push('/admin/login');
      return;
    }
    setToken(storedToken);
  }, [router]);

  useEffect(() => {
    if (!token) return;
    loadData(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, activeTab]);

  const loadData = async (authToken: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/${activeTab}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setLastRefreshedAt(new Date().toISOString());
      } else {
        const errorText = await response.text();
        console.error(`[Admin] Failed to load ${activeTab}:`, response.status, errorText);
      }
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    if (!token) {
      alert('Session expirée. Veuillez vous reconnecter.');
      router.push('/admin/login');
      return;
    }
    
    try {
      const endpoint = activeTab === 'messages' 
        ? `${API_URL}/admin/messages/${id}`
        : `${API_URL}/admin/${activeTab}/${id}`;
      
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        loadData(token);
      }
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    if (!token) {
      alert('Session expirée. Veuillez vous reconnecter.');
      router.push('/admin/login');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/admin/messages/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        loadData(token);
      }
    } catch (error) {
      console.error('Erreur marquage lu:', error);
    }
  };

  const handleEdit = (item: any) => {
    setEditing(item.id);
    // Initialiser avec les valeurs par défaut si nécessaire
    const defaultData = getDefaultDataForTab(activeTab);
    setFormData({ ...defaultData, ...item });
  };

  const getDefaultDataForTab = (tab: string) => {
    switch (tab) {
      case 'services':
        return { number: '', title: '', description: '', order: 0 };
      case 'testimonials':
        return { text: '', author: '', role: '', featured: false, order: 0 };
      case 'gallery':
        return { src: '', alt: '', title: '', description: '', category: 'Cérémonie', order: 0 };
      case 'stats':
        return { number: '', label: '', order: 0 };
      case 'values':
        return { title: '', description: '', icon: 'Heart', order: 0 };
      case 'contact-info':
        return { type: 'Phone', title: '', details: '', description: '', order: 0 };
      default:
        return {};
    }
  };

  const handleSave = async () => {
    if (!token) {
      alert('Session expirée. Veuillez vous reconnecter.');
      router.push('/admin/login');
      return;
    }
    try {
      const isUpdate = editing !== null && editing !== 'new';
      const url = isUpdate
        ? `${API_URL}/admin/${activeTab}/${editing}`
        : `${API_URL}/admin/${activeTab}`;
      
      const response = await fetch(url, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setEditing(null);
        setFormData(getDefaultDataForTab(activeTab));
        loadData(token);
      }
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const tabs = [
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'testimonials', label: 'Témoignages', icon: MessageSquare },
    { id: 'gallery', label: 'Galerie', icon: ImageIcon },
    { id: 'stats', label: 'Statistiques', icon: Users },
    { id: 'values', label: 'Valeurs', icon: Award },
    { id: 'contact-info', label: 'Contact', icon: Phone },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const tabDescriptions: Record<string, string> = {
    services: 'Structurez les prestations phares et leur wording.',
    testimonials: 'Gérez les retours clients et mettez des avis en avant.',
    gallery: 'Alimentez la galerie avec les images les plus inspirantes.',
    stats: 'Communiquez des chiffres clés pour rassurer vos prospects.',
    values: 'Expliquez les valeurs qui différencient Amarea.',
    'contact-info': 'Organisez les points de contact disponibles.',
    messages: 'Centralisez et traitez les messages entrants.',
  };

  const activeTabConfig = tabs.find((t) => t.id === activeTab);

  const filteredData = data.filter((item = {}) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return Object.values(item).some((value) => {
      if (value === null || value === undefined) return false;
      if (typeof value === 'object') {
        try {
          return JSON.stringify(value).toLowerCase().includes(query);
        } catch {
          return false;
        }
      }
      return value.toString().toLowerCase().includes(query);
    });
  });

  const unreadCount = activeTab === 'messages'
    ? data.filter((item) => !item.read).length
    : 0;

  const lastRefreshLabel = lastRefreshedAt
    ? new Date(lastRefreshedAt).toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Jamais synchronisé';

  const summaryCards = [
    { label: 'Éléments totaux', value: data.length.toString() },
    { label: 'Résultats affichés', value: filteredData.length.toString() },
    { label: 'Dernière mise à jour', value: lastRefreshLabel },
    ...(activeTab === 'messages'
      ? [{ label: 'Messages non lus', value: unreadCount.toString() }]
      : []),
  ];

  const canCreate = activeTab !== 'messages';
  const emptyStateMessage = searchQuery.trim()
    ? 'Aucun élément ne correspond à votre recherche.'
    : 'Aucun élément pour le moment.';

  return (
    <div className="min-h-screen bg-[#0B0C11] text-[#1F1E1A]">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="flex flex-col bg-[#08090F] text-[#F9F7F0]">
          <div className="px-6 py-8 border-b border-white/10">
            <p className="text-[11px] uppercase tracking-[0.5em] text-white/40">
              Console
            </p>
            <h1 className="mt-2 text-2xl font-serif">Amarea Admin</h1>
            <p className="mt-2 text-sm text-white/60">
              Pilotez chaque section du site avec sérénité.
            </p>
          </div>
          <nav className="flex-1 px-3 py-6 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                    setEditing(null);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} />
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                      Actif
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
          <div className="px-6 py-6 space-y-3 border-t border-white/5">
            <Link
              href="/admin/content"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm text-white/90 transition hover:border-white hover:bg-white/10"
            >
              <FileText size={16} />
              Éditer les textes des pages
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm text-white/70 transition hover:border-red-400 hover:text-red-200"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </aside>

        <div className="flex flex-col bg-[#FFFEF9]">
          <header className="border-b border-[#E3DED4] bg-white/80 px-6 py-5 backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.5em] text-[#A18C5F]">
                  Section active
                </p>
                <h2 className="mt-1 text-3xl font-serif text-[#2C2C2C]">
                  {activeTabConfig?.label}
                </h2>
                <p className="mt-1 text-sm text-[#5C5C5C]">
                  {tabDescriptions[activeTab]}
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#E5E5E5] px-5 py-2.5 text-sm text-[#2C2C2C] transition hover:border-[#C9A96E] hover:text-[#C9A96E]"
                >
                  <Globe size={16} />
                  Retour au site
                </Link>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Rechercher un contenu..."
                  className="w-full rounded-xl border border-[#E5E5E5] bg-white px-4 py-2.5 text-sm text-[#2C2C2C] placeholder:text-[#9B9B9B] focus:border-[#C9A96E] focus:outline-none focus:ring-1 focus:ring-[#C9A96E] lg:w-64"
                />
                {canCreate && (
                  <button
                    onClick={() => {
                      setEditing('new');
                      setFormData(getDefaultDataForTab(activeTab));
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#2C2C2C] px-5 py-2.5 text-sm font-medium text-[#FFFEF9] transition hover:bg-[#C9A96E]"
                  >
                    <Plus size={16} />
                    Nouveau contenu
                  </button>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-2xl border border-[#E5E5E5] bg-white p-4 shadow-sm"
                  >
                    <p className="text-[11px] uppercase tracking-[0.4em] text-[#A18C5F]">
                      {card.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-[#2C2C2C]">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>

              {loading ? (
                <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-[#E5E5E5] bg-white/60 text-sm text-[#5C5C5C]">
                  Chargement des données...
                </div>
              ) : (
                <>
                  {editing && canCreate && (
                    <div className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.4em] text-[#A18C5F]">
                            {editing === 'new' ? 'Création' : 'Édition'}
                          </p>
                          <h3 className="text-2xl font-serif text-[#2C2C2C]">
                            {editing === 'new'
                              ? `Ajouter un ${activeTabConfig?.label?.toLowerCase()}`
                              : 'Mettre à jour le contenu'}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="flex items-center gap-2 rounded-xl bg-[#2C2C2C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#C9A96E]"
                          >
                            <Save size={16} />
                            {editing === 'new' ? 'Créer' : 'Enregistrer'}
                          </button>
                          <button
                            onClick={() => {
                              setEditing(null);
                              setFormData(getDefaultDataForTab(activeTab));
                            }}
                            className="flex items-center gap-2 rounded-xl border border-[#E5E5E5] px-4 py-2 text-sm text-[#2C2C2C] transition hover:border-[#C9A96E]"
                          >
                            <X size={16} />
                            Annuler
                          </button>
                        </div>
                      </div>

                      {activeTab === 'gallery' && (
                        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                          📸 Entrez l’URL complète (https://...) ou un chemin local
                          déjà présent dans le dossier public.
                        </div>
                      )}

                      {activeTab === 'testimonials' && (
                        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                          💬 Utilisez “Mettre en avant” pour un témoignage vedette
                          sur la page d’accueil.
                        </div>
                      )}

                      <div className="mt-6">
                        <FormFields
                          activeTab={activeTab}
                          formData={formData}
                          setFormData={setFormData}
                          token={token}
                        />
                      </div>
                    </div>
                  )}

                  <section className="rounded-2xl border border-[#E5E5E5] bg-white shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F0ECE3] px-6 py-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#2C2C2C]">
                          Liste des contenus
                        </h3>
                        <p className="text-sm text-[#5C5C5C]">
                          {filteredData.length} élément{filteredData.length > 1 ? 's' : ''} affiché{filteredData.length > 1 ? 's' : ''}
                        </p>
                      </div>
                      <button
                        onClick={() => token && loadData(token)}
                        disabled={!token}
                        className="flex items-center gap-2 rounded-xl border border-[#E5E5E5] px-4 py-2 text-sm text-[#2C2C2C] transition hover:border-[#C9A96E] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Actualiser
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      {filteredData.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#E5E5E5] bg-[#FAF9F5] px-6 py-10 text-center text-sm text-[#5C5C5C]">
                          {emptyStateMessage}
                        </div>
                      ) : (
                        filteredData.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl border border-[#E5E5E5] bg-white px-5 py-4 transition hover:border-[#C9A96E]"
                          >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                              <div className="flex-1">
                                {activeTab === 'messages' ? (
                                  <div className="space-y-3">
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                      <div>
                                        <div className="text-lg font-semibold text-[#2C2C2C]">
                                          {item.name}
                                        </div>
                                        <div className="text-sm text-[#5C5C5C]">
                                          {item.email}
                                        </div>
                                        {item.phone && (
                                          <div className="text-sm text-[#5C5C5C]">
                                            📞 {item.phone}
                                          </div>
                                        )}
                                      </div>
                                      {!item.read && (
                                        <span className="rounded-full bg-[#C9A96E] px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white">
                                          Nouveau
                                        </span>
                                      )}
                                    </div>
                                    {item.weddingDate && (
                                      <div className="text-sm">
                                        <span className="font-medium">
                                          Date du mariage :
                                        </span>{' '}
                                        {item.weddingDate}
                                      </div>
                                    )}
                                    {(item.guestCount || item.budget) && (
                                      <div className="flex flex-wrap gap-4 text-sm">
                                        {item.guestCount && (
                                          <div>
                                            <span className="font-medium">
                                              Invités :
                                            </span>{' '}
                                            {item.guestCount}
                                          </div>
                                        )}
                                        {item.budget && (
                                          <div>
                                            <span className="font-medium">
                                              Budget :
                                            </span>{' '}
                                            {item.budget}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    <div className="rounded-xl border border-[#F0ECE3] bg-[#FAF9F5] p-4">
                                      <div className="text-xs uppercase tracking-[0.4em] text-[#A18C5F]">
                                        Message
                                      </div>
                                      <p className="mt-2 text-sm text-[#2C2C2C] whitespace-pre-wrap">
                                        {item.message}
                                      </p>
                                    </div>
                                    <div className="text-xs text-[#5C5C5C]">
                                      Reçu le{' '}
                                      {new Date(item.createdAt).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </div>
                                  </div>
                                ) : activeTab === 'gallery' ? (
                                  <div className="flex flex-col gap-4 sm:flex-row">
                                    {item.src && (item.src.startsWith('http') || item.src.startsWith('/')) ? (
                                      <img
                                        src={item.src}
                                        alt={item.alt || item.title}
                                        className="h-24 w-24 rounded-xl object-cover"
                                        onError={(event) => {
                                          (event.target as HTMLImageElement).style.display = 'none';
                                        }}
                                      />
                                    ) : (
                                      <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#F5F5F0] text-xs text-[#5C5C5C]">
                                        Pas d'image
                                      </div>
                                    )}
                                    <div>
                                      <div className="text-lg font-semibold">
                                        {item.title || 'Sans titre'}
                                      </div>
                                      <div className="text-xs uppercase tracking-[0.4em] text-[#C9A96E]">
                                        {item.category}
                                      </div>
                                      {item.description && (
                                        <p className="mt-2 text-sm text-[#5C5C5C]">
                                          {item.description.substring(0, 80)}...
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ) : activeTab === 'testimonials' ? (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <div className="text-lg font-semibold">
                                        {item.author}
                                      </div>
                                      {item.featured && (
                                        <span className="rounded-full bg-[#C9A96E] px-2 py-0.5 text-[11px] uppercase tracking-[0.3em] text-white">
                                          Vedette
                                        </span>
                                      )}
                                    </div>
                                    {item.role && (
                                      <div className="text-xs uppercase tracking-[0.4em] text-[#C9A96E]">
                                        {item.role}
                                      </div>
                                    )}
                                    {item.text && (
                                      <p className="text-sm italic text-[#5C5C5C]">
                                        “{item.text.substring(0, 120)}...”
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <div className="text-lg font-semibold">
                                      {item.title || item.number || item.label}
                                    </div>
                                    {item.description && (
                                      <p className="text-sm text-[#5C5C5C]">
                                        {item.description.substring(0, 100)}...
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {activeTab === 'messages' ? (
                                  <>
                                    {!item.read && (
                                      <button
                                        onClick={() => handleMarkAsRead(item.id)}
                                        className="rounded-xl border border-[#C9A96E] px-3 py-2 text-xs font-medium text-[#C9A96E] transition hover:bg-[#C9A96E] hover:text-white"
                                      >
                                        Marquer comme lu
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleDelete(item.id)}
                                      className="rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                      Supprimer
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleEdit(item)}
                                      className="rounded-xl border border-[#E5E5E5] px-3 py-2 text-xs font-medium text-[#2C2C2C] transition hover:border-[#C9A96E]"
                                      title="Modifier"
                                    >
                                      Modifier
                                    </button>
                                    <button
                                      onClick={() => handleDelete(item.id)}
                                      className="rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                                      title="Supprimer"
                                    >
                                      Supprimer
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </section>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

