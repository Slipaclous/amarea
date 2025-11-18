'use client';

import { X, UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FormFieldsProps {
  activeTab: string;
  formData: any;
  setFormData: (data: any) => void;
  token?: string | null;
}

export default function FormFields({ activeTab, formData, setFormData, token }: FormFieldsProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'gallery' && formData?.src) {
      setImagePreview(formData.src);
    } else {
      setImagePreview(null);
    }
  }, [activeTab, formData?.src]);

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, src: url });
    if (url && (url.startsWith('http') || url.startsWith('/'))) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageUpload = async (file: File) => {
    const resolvedToken =
      token ||
      (typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null);

    if (!resolvedToken) {
      setUploadError('Session invalide. Merci de vous reconnecter.');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setUploadError('Le fichier dépasse 4 Mo. Réduisez-le avant upload.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const payload = new FormData();
      payload.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resolvedToken}`,
        },
        body: payload,
      });

      if (!response.ok) {
        const { error } = await response.json().catch(() => ({ error: 'Téléversement impossible' }));
        throw new Error(error || 'Téléversement impossible');
      }

      const result = await response.json();
      setFormData({
        ...formData,
        src: result.url,
        alt: formData.alt || result.originalName?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      });
      setImagePreview(result.url);
    } catch (error: any) {
      setUploadError(error?.message || 'Échec du téléversement');
    } finally {
      setUploading(false);
    }
  };

  const getDefaultFields = () => {
    switch (activeTab) {
      case 'services':
        return {
          number: '',
          title: '',
          description: '',
          order: 0
        };
      case 'testimonials':
        return {
          text: '',
          author: '',
          role: '',
          featured: false,
          order: 0
        };
      case 'gallery':
        return {
          src: '',
          alt: '',
          title: '',
          description: '',
          category: 'Cérémonie',
          order: 0
        };
      case 'stats':
        return {
          number: '',
          label: '',
          order: 0
        };
      case 'values':
        return {
          title: '',
          description: '',
          icon: 'Heart',
          order: 0
        };
      case 'contact-info':
        return {
          type: 'Phone',
          title: '',
          details: '',
          description: '',
          order: 0
        };
      default:
        return {};
    }
  };

  const fields = Object.keys(getDefaultFields()).filter(
    key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt'
  );

  const renderField = (key: string) => {
    const defaultFields = getDefaultFields();
    const value = formData[key] ?? defaultFields[key as keyof typeof defaultFields];

    // Champ spécial pour les images de la galerie
    if (activeTab === 'gallery' && key === 'src') {
      return (
        <div key={key} className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm mb-2 text-[#5C5C5C] font-medium">
              Visuel principal *
            </label>
            <div className="rounded-2xl border-2 border-dashed border-[#E5E5E5] bg-[#FAF9F5] p-5 text-center">
              <input
                id="gallery-upload-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                    event.target.value = '';
                  }
                }}
                disabled={uploading}
              />
              <label
                htmlFor="gallery-upload-input"
                className={`flex flex-col items-center justify-center gap-3 cursor-pointer rounded-xl px-4 py-6 transition ${
                  uploading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white'
                }`}
              >
                <div className="rounded-full bg-white/80 p-3 text-[#C9A96E]">
                  <UploadCloud size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2C2C2C]">
                    {uploading ? 'Téléversement en cours...' : 'Déposez un fichier ou cliquez pour parcourir'}
                  </p>
                  <p className="text-xs text-[#5C5C5C] mt-1">
                    JPG, PNG ou WEBP • 1600px max conseillé • 4 Mo max
                  </p>
                </div>
              </label>
              {uploadError && (
                <p className="mt-2 text-xs text-red-600">
                  {uploadError}
                </p>
              )}
              {!token && (
                <p className="mt-2 text-xs text-red-600">
                  Impossible d&apos;uploader sans authentification valide.
                </p>
              )}
            </div>
          </div>

          {imagePreview && (
            <div className="relative w-full h-48 border border-[#E5E5E5] rounded-xl overflow-hidden">
              <img
                src={imagePreview}
                alt="Aperçu"
                className="w-full h-full object-cover"
                onError={() => setImagePreview(null)}
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setFormData({ ...formData, src: '' });
                }}
                className="absolute top-2 right-2 p-2 bg-white/90 text-red-600 rounded-full shadow"
                aria-label="Supprimer l'image"
              >
                <X size={16} />
              </button>
              <p className="absolute bottom-2 left-3 text-xs text-white/90 bg-black/40 px-2 py-1 rounded">
                {formData.src}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm mb-2 text-[#5C5C5C] font-medium">
              URL personnalisée (optionnel)
            </label>
            <input
              type="url"
              value={value || ''}
              onChange={(e) => handleImageUrlChange(e.target.value)}
              placeholder="https://cdn.exemple.com/photo.jpg"
              className="w-full p-3 border border-[#E5E5E5] focus:border-[#C9A96E] outline-none"
            />
            <p className="text-xs text-[#5C5C5C] mt-1">
              Laissez vide pour conserver l&apos;image téléversée ci-dessus.
            </p>
          </div>
        </div>
      );
    }

    // Champ spécial pour les catégories de galerie
    if (activeTab === 'gallery' && key === 'category') {
      return (
        <div key={key}>
          <label className="block text-sm mb-2 text-[#5C5C5C] font-medium">
            Catégorie *
          </label>
          <select
            value={value || 'Cérémonie'}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full p-3 border border-[#E5E5E5] focus:border-[#C9A96E] outline-none"
          >
            <option value="Cérémonie">Cérémonie</option>
            <option value="Décoration">Décoration</option>
            <option value="Réception">Réception</option>
            <option value="Détails">Détails</option>
          </select>
        </div>
      );
    }

    // Champ spécial pour featured (témoignages)
    if (activeTab === 'testimonials' && key === 'featured') {
      return (
        <div key={key} className="md:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
              className="w-5 h-5 border border-[#E5E5E5] focus:border-[#C9A96E]"
            />
            <span className="text-sm text-[#5C5C5C] font-medium">
              Mettre en avant (témoignage vedette)
            </span>
          </label>
        </div>
      );
    }

    // Champ spécial pour icon (valeurs)
    if (activeTab === 'values' && key === 'icon') {
      return (
        <div key={key}>
          <label className="block text-sm mb-2 text-[#5C5C5C] font-medium">
            Icône
          </label>
          <select
            value={value || 'Heart'}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full p-3 border border-[#E5E5E5] focus:border-[#C9A96E] outline-none"
          >
            <option value="Heart">Heart (Cœur)</option>
            <option value="Award">Award (Trophée)</option>
            <option value="Users">Users (Personnes)</option>
          </select>
        </div>
      );
    }

    // Champ spécial pour type (contact-info)
    if (activeTab === 'contact-info' && key === 'type') {
      return (
        <div key={key}>
          <label className="block text-sm mb-2 text-[#5C5C5C] font-medium">
            Type *
          </label>
          <select
            value={value || 'Phone'}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full p-3 border border-[#E5E5E5] focus:border-[#C9A96E] outline-none"
          >
            <option value="Phone">Phone (Téléphone)</option>
            <option value="Mail">Mail (Email)</option>
            <option value="MapPin">MapPin (Adresse)</option>
            <option value="Clock">Clock (Horaires)</option>
          </select>
        </div>
      );
    }

    // Champs texte longs
    if (key === 'description' || key === 'text' || key === 'message') {
      return (
        <div key={key} className="md:col-span-2">
          <label className="block text-sm mb-2 text-[#5C5C5C] font-medium">
            {key === 'text' ? 'Témoignage' : key === 'message' ? 'Message' : 'Description'} *
          </label>
          <textarea
            value={value || ''}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            className="w-full p-3 border border-[#E5E5E5] focus:border-[#C9A96E] outline-none resize-y"
            rows={4}
            placeholder={`Entrez ${key === 'text' ? 'le témoignage' : key === 'message' ? 'le message' : 'la description'}...`}
          />
        </div>
      );
    }

    // Champs numériques
    if (key === 'order') {
      return (
        <div key={key}>
          <label className="block text-sm mb-2 text-[#5C5C5C] font-medium">
            Ordre d'affichage
          </label>
          <input
            type="number"
            value={value || 0}
            onChange={(e) => setFormData({ ...formData, [key]: parseInt(e.target.value) || 0 })}
            className="w-full p-3 border border-[#E5E5E5] focus:border-[#C9A96E] outline-none"
            min="0"
          />
          <p className="text-xs text-[#5C5C5C] mt-1">Plus le nombre est petit, plus l'élément apparaît en premier</p>
        </div>
      );
    }

    // Champs texte standards
    return (
      <div key={key}>
        <label className="block text-sm mb-2 text-[#5C5C5C] font-medium">
          {key === 'number' ? 'Numéro' : 
           key === 'title' ? 'Titre' : 
           key === 'author' ? 'Auteur' : 
           key === 'role' ? 'Rôle (ex: Mariés en 2023)' : 
           key === 'alt' ? 'Texte alternatif (pour l\'accessibilité)' : 
           key === 'label' ? 'Libellé' : 
           key === 'details' ? 'Détails' : 
           key.charAt(0).toUpperCase() + key.slice(1)} *
        </label>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          className="w-full p-3 border border-[#E5E5E5] focus:border-[#C9A96E] outline-none"
          placeholder={`Entrez ${key}...`}
        />
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(renderField)}
    </div>
  );
}

