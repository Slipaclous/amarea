'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { fetchGallery } from '@/lib/api';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  useEffect(() => {
    fetchGallery().then(setGalleryImages);
  }, []);

  const defaultGalleryImages = [
    {
      id: 1,
      src: '/api/placeholder/600/400',
      alt: 'Mariage élégant en extérieur',
      category: 'Cérémonie',
      title: 'Cérémonie romantique',
      description: 'Une cérémonie d\'exception dans un cadre idyllique où chaque détail raconte votre histoire'
    },
    {
      id: 2,
      src: '/api/placeholder/600/800',
      alt: 'Décoration florale raffinée',
      category: 'Décoration',
      title: 'Compositions florales',
      description: 'Des bouquets d\'exception créés par nos maîtres fleuristes avec des fleurs sélectionnées'
    },
    {
      id: 3,
      src: '/api/placeholder/600/400',
      alt: 'Réception somptueuse',
      category: 'Réception',
      title: 'Réception d\'exception',
      description: 'Une soirée inoubliable dans un cadre prestigieux pensé pour vos invités'
    },
    {
      id: 4,
      src: '/api/placeholder/600/600',
      alt: 'Détails raffinés',
      category: 'Détails',
      title: 'Attention aux détails',
      description: 'Chaque élément est pensé et orchestré pour sublimer votre journée spéciale'
    },
    {
      id: 5,
      src: '/api/placeholder/600/400',
      alt: 'Mariage vintage',
      category: 'Cérémonie',
      title: 'Style vintage',
      description: 'Un mariage aux accents rétro et élégants inspiré des grandes heures'
    },
    {
      id: 6,
      src: '/api/placeholder/600/800',
      alt: 'Table dressée',
      category: 'Réception',
      title: 'Art de la table',
      description: 'Une mise en scène raffinée pour une réception d\'exception et mémorable'
    },
    {
      id: 7,
      src: '/api/placeholder/600/400',
      alt: 'Mariage moderne',
      category: 'Cérémonie',
      title: 'Design contemporain',
      description: 'Une approche moderne et sophistiquée du mariage d\'aujourd\'hui'
    },
    {
      id: 8,
      src: '/api/placeholder/600/600',
      alt: 'Décoration minimaliste',
      category: 'Décoration',
      title: 'Élégance minimaliste',
      description: 'La beauté dans la simplicité et le raffinement des lignes épurées'
    }
  ];

  const displayImages = galleryImages.length > 0 ? galleryImages : defaultGalleryImages;
  const categories = ['Tous', ...Array.from(new Set(displayImages.map(img => img.category)))];
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filteredImages = activeCategory === 'Tous' 
    ? displayImages 
    : displayImages.filter(img => img.category === activeCategory);

  const nextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex].id);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      setSelectedImage(filteredImages[prevIndex].id);
    }
  };

  const selectedImageData = displayImages.find(img => img.id === selectedImage);

  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      {/* Hero Section */}
      <section className="relative py-40 bg-[#2C2C2C] overflow-hidden">
        {/* Texture subtile */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Lignes décoratives */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center space-y-12"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative inline-block"
            >
              <div className="absolute -inset-8 border border-[#C9A96E]/20 rotate-45"></div>
              <Image
                src="/img/amarea.png"
                alt="Amarea"
                width={180}
                height={72}
                className="relative object-contain w-44 h-auto mx-auto filter grayscale contrast-125"
                priority
              />
            </motion.div>

            {/* Titre */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-[#C9A96E]"></div>
                <span className="text-[#C9A96E] text-xs tracking-[0.3em] font-light uppercase">
                  Portfolio
                </span>
                <div className="h-px w-12 bg-[#C9A96E]"></div>
              </div>

              <h1 className="font-serif text-6xl md:text-7xl text-[#FFFEF9] tracking-tight leading-tight">
                <span className="block font-light">Nos</span>
                <span className="block font-normal italic">réalisations</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[#D4D4D4] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light"
            >
              Découvrez nos plus belles créations et laissez-vous inspirer 
              par l'élégance intemporelle de nos mariages
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section - Style éditorial */}
      <section className="py-16 bg-[#FFFEF9] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category)}
                className={`relative px-8 py-3 font-light tracking-wider text-sm uppercase transition-all duration-300 ${
                  activeCategory === category
                    ? 'text-[#2C2C2C]'
                    : 'text-[#5C5C5C] hover:text-[#2C2C2C]'
                }`}
              >
                <span className="relative z-10">{category}</span>
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 border-b-2 border-[#C9A96E]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid - Masonry style élégant */}
      <section className="py-20 bg-[#FFFEF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="relative overflow-hidden">
                  {/* Bordure décorative */}
                  <div className="absolute -inset-2 border border-[#E5E5E5] group-hover:border-[#C9A96E] transition-colors duration-500 opacity-0 group-hover:opacity-100"></div>
                  
                  <div className="relative aspect-square bg-[#F5F5F0] flex items-center justify-center overflow-hidden">
                    {/* Texture */}
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                    }}></div>
                    
                    {image.src && (image.src.startsWith('http') || image.src.startsWith('/')) ? (
                      <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[#5C5C5C] text-sm tracking-[0.2em] uppercase font-light">
                        {image.title || `Image ${image.id}`}
                      </span>
                    )}
                  </div>
                  
                  {/* Overlay subtil */}
                  <div className="absolute inset-0 bg-[#2C2C2C] opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center text-[#FFFEF9] space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase font-light">
                        {image.category}
                      </div>
                      <p className="font-serif text-xl font-light">Voir le détail</p>
                    </div>
                  </div>
                </div>

                {/* Info sous l'image */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-6 bg-[#C9A96E]"></div>
                    <span className="text-[#C9A96E] text-xs tracking-[0.2em] uppercase font-light">
                      {image.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#2C2C2C] font-normal">
                    {image.title}
                  </h3>
                  <p className="text-[#5C5C5C] text-sm font-light leading-relaxed">
                    {image.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal élégant */}
      <AnimatePresence>
        {selectedImage && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2C2C2C]/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            {/* Overlay avec texture */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#FFFEF9] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bordure décorative */}
              <div className="absolute -inset-4 border border-[#C9A96E]/20 pointer-events-none"></div>

              {/* Bouton fermer */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center bg-[#2C2C2C] text-[#FFFEF9] hover:bg-[#C9A96E] transition-colors duration-300"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col lg:flex-row h-full">
                {/* Image */}
                <div className="flex-1 bg-[#F5F5F0] flex items-center justify-center p-12 relative">
                  {/* Texture */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                  }}></div>
                  
                  <div className="relative">
                    {selectedImageData?.src && (selectedImageData.src.startsWith('http') || selectedImageData.src.startsWith('/')) ? (
                      <img src={selectedImageData.src} alt={selectedImageData.alt} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[#5C5C5C] text-lg tracking-[0.2em] uppercase font-light">
                        {selectedImageData?.title || `Image ${selectedImage}`}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Informations */}
                <div className="lg:w-96 p-12 space-y-8 overflow-y-auto">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-[#C9A96E]"></div>
                      <span className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase font-light">
                        {selectedImageData.category}
                      </span>
                    </div>
                    
                    <h2 className="font-serif text-3xl text-[#2C2C2C] font-normal leading-tight">
                      {selectedImageData.title}
                    </h2>
                    
                    <p className="text-[#5C5C5C] leading-relaxed font-light">
                      {selectedImageData.description}
                    </p>
                  </div>

                  {/* Ornement décoratif */}
                  <div className="pt-8 border-t border-[#E5E5E5]">
                    <div className="flex items-center justify-between text-[#5C5C5C] text-xs tracking-[0.2em] uppercase font-light">
                      <span>Portfolio Amarea</span>
                      <span>{filteredImages.findIndex(img => img.id === selectedImage) + 1}/{filteredImages.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boutons de navigation */}
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#2C2C2C] text-[#FFFEF9] hover:bg-[#C9A96E] transition-colors duration-300"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#2C2C2C] text-[#FFFEF9] hover:bg-[#C9A96E] transition-colors duration-300"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-32 bg-[#2C2C2C] relative overflow-hidden">
        {/* Motif subtil */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2 className="font-serif text-5xl md:text-6xl text-[#FFFEF9] font-light">
                Inspiré par nos
                <span className="block italic mt-2">créations ?</span>
              </h2>
              <p className="text-[#D4D4D4] text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Créons ensemble le mariage qui vous ressemble, 
                avec la même attention aux détails et le même raffinement
              </p>
            </div>
            
            <button className="group relative px-12 py-5 overflow-hidden border border-[#C9A96E]">
              <div className="absolute inset-0 bg-[#C9A96E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <span className="relative text-[#FFFEF9] group-hover:text-[#2C2C2C] font-light tracking-wider text-sm uppercase transition-colors">
                Planifier votre mariage
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}