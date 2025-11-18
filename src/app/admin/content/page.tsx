'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { 
  FileText, 
  Home, 
  User, 
  Mail, 
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Sparkles,
  Layers,
  Target,
  Feather,
  BookOpen,
  NotebookPen,
  Map,
  Gem,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface PageContent {
  [key: string]: string;
}

type FieldType = 'text' | 'textarea';

type PageKey = 'home' | 'about' | 'contact' | 'gallery';

interface FieldConfig {
  key: string;
  label: string;
  placeholder?: string;
  type?: FieldType;
  helper?: string;
}

interface SectionConfig {
  id: string;
  title: string;
  description?: string;
  accent: string;
  icon: LucideIcon;
  fields: FieldConfig[];
}

interface PageConfig {
  name: string;
  description: string;
  icon: LucideIcon;
  sections: SectionConfig[];
}

const pageConfigs: Record<PageKey, PageConfig> = {
  home: {
    name: 'Page d\'accueil',
    description: 'Héros, promesses clés et appel à l’action final.',
    icon: Home,
    sections: [
      {
        id: 'home-hero',
        title: 'Héros & accroche',
        description: 'Sous-titre, titres et description principale visible au-dessus de la ligne de flottaison.',
        accent: '#FDEAD7',
        icon: Sparkles,
        fields: [
          { key: 'home.subtitle', label: 'Sous-titre (ex: Wedding Planner)', placeholder: 'Wedding Planner' },
          { key: 'home.title1', label: 'Titre ligne 1', placeholder: 'L\'art de' },
          { key: 'home.title2', label: 'Titre ligne 2', placeholder: 'célébrer' },
          { key: 'home.title3', label: 'Titre ligne 3', placeholder: 'l\'amour' },
          { key: 'home.description', label: 'Description principale', type: 'textarea', placeholder: 'Créateur de mariages sur-mesure...' },
          { key: 'home.cta1', label: 'Bouton 1', placeholder: 'Découvrir nos services', helper: 'Bouton principal (ex: découvrir les services).' },
          { key: 'home.cta2', label: 'Bouton 2', placeholder: 'Nos réalisations', helper: 'Second bouton facultatif (ex: voir la galerie).' },
        ],
      },
      {
        id: 'home-services',
        title: 'Section Services',
        description: 'Accroche qui introduit les prestations phares.',
        accent: '#E8F2EE',
        icon: Layers,
        fields: [
          { key: 'home.services.title', label: 'Titre section Services', placeholder: 'Une expérience d\'exception' },
          { key: 'home.services.subtitle', label: 'Sous-titre section Services', type: 'textarea', placeholder: 'Chaque mariage est unique...' },
        ],
      },
      {
        id: 'home-cta',
        title: 'CTA final',
        description: 'Bloc de conclusion qui pousse à la prise de contact.',
        accent: '#F0EEF7',
        icon: Target,
        fields: [
          { key: 'home.cta.title', label: 'Titre section CTA finale', placeholder: 'Commençons à écrire votre histoire' },
          { key: 'home.cta.description', label: 'Description section CTA', type: 'textarea', placeholder: 'Prenez rendez-vous...' },
          { key: 'home.cta.button', label: 'Bouton CTA', placeholder: 'Prendre rendez-vous' },
        ],
      },
    ],
  },
  about: {
    name: 'Page À propos',
    description: 'Histoire de la maison, manifeste et preuve sociale.',
    icon: User,
    sections: [
      {
        id: 'about-hero',
        title: 'En-tête & manifeste',
        description: 'Présente l’ADN du studio et sa promesse fondatrice.',
        accent: '#F4EFE9',
        icon: Feather,
        fields: [
          { key: 'about.subtitle', label: 'Sous-titre', placeholder: 'À propos' },
          { key: 'about.title1', label: 'Titre ligne 1', placeholder: 'L\'histoire' },
          { key: 'about.title2', label: 'Titre ligne 2', placeholder: 'd\'Amarea' },
          { key: 'about.description', label: 'Description', type: 'textarea', placeholder: 'Créateur de mariages d\'exception...' },
        ],
      },
      {
        id: 'about-story',
        title: 'Récit & storytelling',
        description: 'Déroulez votre histoire, les temps forts et votre vision.',
        accent: '#E9F0FF',
        icon: BookOpen,
        fields: [
          { key: 'about.story.label', label: 'Label section Histoire', placeholder: 'Notre histoire' },
          { key: 'about.story.title1', label: 'Titre Histoire ligne 1', placeholder: 'Une passion devenue' },
          { key: 'about.story.title2', label: 'Titre Histoire ligne 2', placeholder: 'métier' },
          { key: 'about.story.paragraph1', label: 'Paragraphe 1', type: 'textarea', placeholder: 'Fondée en 2019...' },
          { key: 'about.story.paragraph2', label: 'Paragraphe 2', type: 'textarea', placeholder: 'Notre équipe d\'experts...' },
          { key: 'about.story.paragraph3', label: 'Paragraphe 3', type: 'textarea', placeholder: 'Chaque mariage...' },
          { key: 'about.story.quote', label: 'Citation signature', type: 'textarea', placeholder: 'Créer des moments d\'exception...' },
        ],
      },
      {
        id: 'about-values',
        title: 'Valeurs fondatrices',
        description: 'Ligne éditoriale qui structure vos convictions.',
        accent: '#FFF4E7',
        icon: Gem,
        fields: [
          { key: 'about.values.title', label: 'Titre section Valeurs', placeholder: 'Les principes qui nous guident' },
        ],
      },
      {
        id: 'about-cta',
        title: 'Invitation à la rencontre',
        description: 'Conclusion et bouton d’action.',
        accent: '#F0EEF7',
        icon: Target,
        fields: [
          { key: 'about.cta.title', label: 'Titre CTA', placeholder: 'Prêt à créer votre mariage d\'exception ?' },
          { key: 'about.cta.description', label: 'Description CTA', type: 'textarea', placeholder: 'Découvrez comment...' },
          { key: 'about.cta.button', label: 'Bouton CTA', placeholder: 'Découvrir nos services' },
        ],
      },
    ],
  },
  contact: {
    name: 'Page Contact',
    description: 'Texte d’accueil, formulaire et informations pratiques.',
    icon: Mail,
    sections: [
      {
        id: 'contact-hero',
        title: 'Introduction & ton de voix',
        description: 'Prépare le visiteur avant qu’il ne remplisse le formulaire.',
        accent: '#E9F5FF',
        icon: MessageSquare,
        fields: [
          { key: 'contact.subtitle', label: 'Sous-titre', placeholder: 'Contact' },
          { key: 'contact.title1', label: 'Titre ligne 1', placeholder: 'Parlons de' },
          { key: 'contact.title2', label: 'Titre ligne 2', placeholder: 'votre projet' },
          { key: 'contact.description', label: 'Description', type: 'textarea', placeholder: 'Prêt à créer le mariage...' },
        ],
      },
      {
        id: 'contact-form',
        title: 'Bloc formulaire',
        description: 'Encadrez les champs et rassurez sur l’accompagnement.',
        accent: '#FFF4E7',
        icon: NotebookPen,
        fields: [
          { key: 'contact.form.title', label: 'Titre formulaire', placeholder: 'Une première conversation' },
          { key: 'contact.form.description', label: 'Description formulaire', type: 'textarea', placeholder: 'Chaque mariage est unique...' },
          { key: 'contact.form.quote', label: 'Citation inspirante', type: 'textarea', placeholder: 'Votre histoire mérite...' },
        ],
      },
      {
        id: 'contact-map',
        title: 'Informations pratiques',
        description: 'Adresse, zone d’intervention ou lieu de rendez-vous.',
        accent: '#E8F2EE',
        icon: Map,
        fields: [
          { key: 'contact.map.title', label: 'Titre section Carte', placeholder: 'Venez nous rencontrer' },
          { key: 'contact.map.description', label: 'Description section Carte', type: 'textarea', placeholder: 'Au cœur de Paris...' },
        ],
      },
    ],
  },
  gallery: {
    name: 'Page Galerie',
    description: 'Accroche de la page portfolio et CTA final.',
    icon: ImageIcon,
    sections: [
      {
        id: 'gallery-hero',
        title: 'Introduction de la galerie',
        description: 'Présente l’esprit de vos réalisations.',
        accent: '#F4EFE9',
        icon: ImageIcon,
        fields: [
          { key: 'gallery.subtitle', label: 'Sous-titre', placeholder: 'Portfolio' },
          { key: 'gallery.title1', label: 'Titre ligne 1', placeholder: 'Nos' },
          { key: 'gallery.title2', label: 'Titre ligne 2', placeholder: 'réalisations' },
          { key: 'gallery.description', label: 'Description', type: 'textarea', placeholder: 'Découvrez nos plus belles créations...' },
        ],
      },
      {
        id: 'gallery-cta',
        title: 'CTA inspiration',
        description: 'Relance après la visite du portfolio.',
        accent: '#F0EEF7',
        icon: Target,
        fields: [
          { key: 'gallery.cta.title', label: 'Titre CTA', placeholder: 'Inspiré par nos créations ?' },
          { key: 'gallery.cta.description', label: 'Description CTA', type: 'textarea', placeholder: 'Créons ensemble...' },
          { key: 'gallery.cta.button', label: 'Bouton CTA', placeholder: 'Planifier votre mariage' },
        ],
      },
    ],
  },
};

const getFieldsForPage = (pageKey: PageKey) =>
  pageConfigs[pageKey].sections.flatMap((section) => section.fields);

export default function ContentEditor() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<PageKey>('home');
  const [content, setContent] = useState<PageContent>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const currentPage = pageConfigs[activePage];
  const currentSections = currentPage.sections;

  const sectionStats = useMemo(() => {
    return currentSections.map((section) => {
      const total = section.fields.length;
      const filled = section.fields.reduce((count, field) => {
        const value = content[field.key];
        return value && value.trim().length > 0 ? count + 1 : count;
      }, 0);

      return {
        id: section.id,
        title: section.title,
        total,
        filled,
        completion: total === 0 ? 0 : Math.round((filled / total) * 100),
      };
    });
  }, [currentSections, content]);

  const totalFields = sectionStats.reduce((acc, section) => acc + section.total, 0);
  const completedFields = sectionStats.reduce((acc, section) => acc + section.filled, 0);
  const completionRate = totalFields === 0 ? 0 : Math.round((completedFields / totalFields) * 100);
  const fullyCompletedSections = sectionStats.filter((section) => section.filled === section.total).length;
  const lastSavedLabel = lastSavedAt
    ? new Date(lastSavedAt).toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Jamais';

  const scrollToSection = (id: string) => {
    const node = sectionRefs.current[id];
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    if (!storedToken) {
      router.push('/admin/login');
      return;
    }
    setToken(storedToken);
    loadContent(storedToken);
  }, [activePage, router]);

  const loadContent = async (authToken: string | null = token) => {
    setLoading(true);
    try {
      const pageFields = getFieldsForPage(activePage);
      const response = await fetch(`${API_URL}/page-content?page=${activePage}&t=${Date.now()}`, {
        headers: authToken
          ? {
              Authorization: `Bearer ${authToken}`,
            }
          : {},
        cache: 'no-store'
      });
      
      const contentMap: PageContent = {};
      
      pageFields.forEach((field) => {
        contentMap[field.key] = '';
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`[Admin] Content loaded for page "${activePage}":`, data.length, 'items');
        console.log('[Admin] Content details:', data);
        if (Array.isArray(data)) {
          data.forEach((item: any) => {
            if (item && item.key) {
              contentMap[item.key] = item.value || '';
              console.log(`[Admin] Loaded: ${item.key} = "${(item.value || '').substring(0, 50)}..."`);
            }
          });
        } else {
          console.warn('[Admin] Response is not an array:', typeof data, data);
        }
      } else {
        const errorText = await response.text();
        console.error('[Admin] Failed to load content:', response.status, response.statusText, errorText);
      }
      
      setContent(contentMap);
    } catch (error) {
      console.error('Erreur chargement:', error);
      // En cas d'erreur, initialiser quand même avec les valeurs par défaut
      const fallbackFields = getFieldsForPage(activePage);
      const contentMap: PageContent = {};
      fallbackFields.forEach((field) => {
        contentMap[field.key] = '';
      });
      setContent(contentMap);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setContent({ ...content, [key]: value });
  };

  const handleSave = async () => {
    const currentToken = token || localStorage.getItem('admin_token');
    
    if (!currentToken) {
      alert('Vous devez être connecté pour sauvegarder. Redirection vers la page de connexion...');
      router.push('/admin/login');
      return;
    }

    setSaving(true);
    try {
      const pageFields = getFieldsForPage(activePage);

      // Sauvegarder tous les champs de la page actuelle (même ceux vides)
      const savePromises = pageFields.map(async (field) => {
        const key = field.key;
        const value = content[key] || '';
        
        console.log(`[Admin] Saving: ${key} = "${value.substring(0, 50)}..."`);
        
        // Encoder la clé pour l'URL (les points doivent être encodés)
        const encodedKey = encodeURIComponent(key);
        console.log(`[Admin] Encoded key: "${encodedKey}"`);
        
        const response = await fetch(`${API_URL}/page-content/${encodedKey}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`
          },
          body: JSON.stringify({ key, value, type: 'text' })
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`[Admin] Failed to save ${key}:`, response.status, errorText);
          return { ok: false, key, error: errorText };
        }
        
        const savedData = await response.json();
        console.log(`[Admin] Saved ${key}:`, savedData);
        return { ok: true, key, data: savedData };
      });

      const results = await Promise.all(savePromises);
      const errors = results.filter(r => !r.ok);
      
      if (errors.length > 0) {
        console.error('[Admin] Some saves failed:', errors);
        throw new Error('Certaines sauvegardes ont échoué');
      }
      
      console.log('[Admin] All content saved successfully:', results.length, 'items');

      // Recharger le contenu pour confirmer (avec cache bypass)
      await new Promise(resolve => setTimeout(resolve, 500)); // Petit délai pour laisser la DB se mettre à jour
      await loadContent(currentToken);
      setLastSavedAt(new Date().toISOString());

      alert('✅ Contenu sauvegardé avec succès !\n\n💡 Rafraîchissez la page du site (F5) pour voir les changements.');
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      alert('❌ Erreur lors de la sauvegarde. Vérifiez la console pour plus de détails.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070F] text-[#F9F7F0]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080A12]/90 backdrop-blur">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-white"
            >
              <ArrowLeft size={18} />
              Retour
            </button>
            <div>
              <p className="text-[11px] uppercase tracking-[0.5em] text-white/50">Éditeur de contenu</p>
              <h1 className="text-3xl font-serif">Console éditoriale</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-white/60">
              Dernière sauvegarde : <span className="font-semibold text-white">{lastSavedLabel}</span>
            </span>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-2xl bg-[#C9A96E] px-6 py-3 text-sm font-semibold text-[#1F1E1A] transition hover:bg-[#B48B58] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />
              {saving ? 'Sauvegarde...' : 'Sauvegarder tout'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Page active</p>
            <p className="mt-2 text-2xl font-serif">{currentPage.name}</p>
            <p className="mt-2 text-sm text-white/60">{currentPage.description}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Sections</p>
            <p className="mt-2 text-3xl font-semibold">{currentSections.length}</p>
            <p className="text-sm text-white/60">{fullyCompletedSections} terminées</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Champs complétés</p>
            <p className="mt-2 text-3xl font-semibold">{completedFields}/{totalFields}</p>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#C9A96E]"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Progression</p>
            <p className="mt-2 text-3xl font-semibold">{completionRate}%</p>
            <p className="text-sm text-white/60 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#C9A96E]" />
              Synchro en temps réel
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/60">Choix du gabarit</p>
              <h2 className="mt-2 text-2xl font-serif text-white">Sélectionnez la page à éditer</h2>
            </div>
            <FileText className="h-10 w-10 text-white/30" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(Object.keys(pageConfigs) as PageKey[]).map((pageKey) => {
              const page = pageConfigs[pageKey];
              const Icon = page.icon;
              const isActive = activePage === pageKey;
              return (
                <button
                  key={pageKey}
                  onClick={() => setActivePage(pageKey)}
                  className={`flex items-start gap-3 rounded-3xl border px-4 py-4 text-left transition ${
                    isActive
                      ? 'border-[#C9A96E] bg-white/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30'
                  }`}
                >
                  <span className="rounded-2xl bg-white/10 p-3">
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className="text-lg font-medium">{page.name}</p>
                    <p className="text-sm text-white/60">{page.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4 self-start lg:sticky lg:top-28">
            <div className="rounded-3xl border border-white/10 bg-[#0C101C] p-6 shadow-2xl">
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Pilotage</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-semibold">{completionRate}%</p>
                  <p className="text-sm text-white/60">{completedFields}/{totalFields} champs remplis</p>
                </div>
                <span className="text-xs text-white/60">{fullyCompletedSections}/{currentSections.length} sections</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#C9A96E] to-[#F0D8A8]"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="mt-6 w-full rounded-2xl bg-[#C9A96E] px-4 py-3 text-sm font-semibold text-[#1F1E1A] transition hover:bg-[#B48B58] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Sauvegarde en cours...' : 'Sauvegarder ces contenus'}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0C101C] p-6 shadow-2xl">
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Navigation par section</p>
              <div className="mt-4 space-y-3">
                {sectionStats.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/80 transition hover:border-white/40"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span>{section.title}</span>
                      <span className="text-xs text-white/60">{section.completion}%</span>
                    </div>
                    <p className="text-xs text-white/50">{section.filled}/{section.total} champs</p>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[#C9A96E]"
                        style={{ width: `${section.completion}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            {loading ? (
              <div className="rounded-3xl border border-white/10 bg-[#0C101C] p-10 text-center text-white/70">
                Chargement du contenu…
              </div>
            ) : (
              currentSections.map((section) => {
                const Icon = section.icon;
                const stats = sectionStats.find((item) => item.id === section.id);
                return (
                  <section
                    key={section.id}
                    ref={(node) => {
                      sectionRefs.current[section.id] = node;
                    }}
                    className="rounded-3xl border border-white/10 bg-[#0C101C] p-6 shadow-xl"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10"
                          style={{ backgroundColor: section.accent }}
                        >
                          <Icon className="text-[#2C2C2C]" size={22} />
                        </div>
                        <div>
                          <p className="text-xl font-serif text-white">{section.title}</p>
                          {section.description && (
                            <p className="text-sm text-white/60">{section.description}</p>
                          )}
                        </div>
                      </div>
                      {stats && (
                        <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
                          {stats.filled}/{stats.total} champs ({stats.completion}%)
                        </span>
                      )}
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      {section.fields.map((field) => {
                        const isTextarea = field.type === 'textarea';
                        return (
                          <div key={field.key} className={isTextarea ? 'md:col-span-2' : ''}>
                            <label className="mb-2 block text-sm font-medium text-white">
                              {field.label}
                              {!content[field.key] && (
                                <span className="ml-2 text-xs text-white/40">(vide)</span>
                              )}
                            </label>
                            {isTextarea ? (
                              <textarea
                                value={content[field.key] || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                rows={4}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-white/30 focus:border-[#C9A96E] focus:outline-none focus:ring-1 focus:ring-[#C9A96E]"
                              />
                            ) : (
                              <input
                                type="text"
                                value={content[field.key] || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-white/30 focus:border-[#C9A96E] focus:outline-none focus:ring-1 focus:ring-[#C9A96E]"
                              />
                            )}
                            {(field.helper || field.placeholder) && (
                              <p className="mt-2 text-xs text-white/50">
                                {field.helper || `Valeur par défaut : "${field.placeholder}"`}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>

        <div className="sm:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-full bg-[#C9A96E] px-6 py-3 text-sm font-semibold text-[#1F1E1A] shadow-2xl transition hover:bg-[#B48B58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </main>
    </div>
  );
}

