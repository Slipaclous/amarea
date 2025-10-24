'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      {/* Hero Section - Élégance minimaliste avec typographie forte */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Texture papier subtile en fond */}
        <div className="absolute inset-0 bg-[#FFFEF9]">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>

        {/* Lignes décoratives Art Déco */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30"></div>

        {/* Ornements latéraux subtils */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A96E] to-transparent opacity-20"></div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A96E] to-transparent opacity-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center space-y-16"
          >
            {/* Monogramme élégant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
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

            {/* Titre principal - Typographie majestueuse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16 bg-[#C9A96E]"></div>
                <span className="text-[#C9A96E] text-sm tracking-[0.3em] font-light uppercase">
                  Wedding Planner
                </span>
                <div className="h-px w-16 bg-[#C9A96E]"></div>
              </div>

              <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl text-[#2C2C2C] tracking-tight leading-[0.9]">
                <span className="block font-light italic">L'art de</span>
                <span className="block font-normal">célébrer</span>
                <span className="block font-light">l'amour</span>
              </h1>
            </motion.div>

            {/* Description raffinée */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-[#5C5C5C] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
            >
              Créateur de mariages sur-mesure où chaque détail raconte votre histoire 
              avec raffinement et authenticité
            </motion.p>

            {/* CTA discret et élégant */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
            >
              <Link href="/contact">
                <button className="group relative px-10 py-4 overflow-hidden">
                  <div className="absolute inset-0 bg-[#2C2C2C] transition-transform duration-500 group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-[#C9A96E] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-3 text-[#FFFEF9] font-light tracking-wider text-sm uppercase">
                    Découvrir nos services
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
              
              <Link href="/gallery">
                <button className="group px-10 py-4 border border-[#2C2C2C] hover:border-[#C9A96E] transition-colors duration-300">
                  <span className="flex items-center gap-3 text-[#2C2C2C] group-hover:text-[#C9A96E] font-light tracking-wider text-sm uppercase transition-colors">
                    Nos réalisations
                    <Heart className="w-4 h-4" />
                  </span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Ornement floral stylisé en coin */}
        <div className="absolute bottom-8 left-8 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#C9A96E]">
            <path d="M50,50 Q30,30 50,10 Q70,30 50,50 Q70,70 50,90 Q30,70 50,50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="3" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* Section Services - Grille élégante avec séparateurs */}
      <section className="py-32 bg-[#FFFEF9] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête de section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#C9A96E]"></div>
              <span className="text-[#C9A96E] text-xs tracking-[0.3em] font-light uppercase">
                Nos services
              </span>
              <div className="h-px w-12 bg-[#C9A96E]"></div>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl text-[#2C2C2C] font-light mb-6">
              Une expérience <span className="italic">d'exception</span>
            </h2>
            <p className="text-[#5C5C5C] text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Chaque mariage est unique. Notre approche sur-mesure garantit 
              une attention méticuleuse à chaque détail.
            </p>
          </motion.div>

          {/* Grille de services avec séparateurs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#E5E5E5]">
            {[
              {
                number: "01",
                title: "Organisation Complète",
                description: "De la vision initiale à l'exécution finale, nous orchestrons chaque aspect avec une précision horlogère et une sensibilité artistique.",
              },
              {
                number: "02",
                title: "Direction Artistique",
                description: "Création d'une identité visuelle cohérente et raffinée qui reflète votre personnalité et sublime votre histoire d'amour.",
              },
              {
                number: "03",
                title: "Coordination Jour J",
                description: "Une présence discrète et efficace pour que vous viviez pleinement votre journée pendant que nous veillons à la perfection.",
              }
            ].map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative border-r border-b border-[#E5E5E5] p-12 hover:bg-[#FAF9F5] transition-colors duration-500"
              >
                {/* Ligne d'accentuation au survol */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#C9A96E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <div className="space-y-6">
                  <div className="text-[#C9A96E] text-sm font-light tracking-[0.2em]">
                    {service.number}
                  </div>
                  
                  <h3 className="font-serif text-2xl text-[#2C2C2C] font-normal">
                    {service.title}
                  </h3>
                  
                  <p className="text-[#5C5C5C] leading-relaxed font-light text-base">
                    {service.description}
                  </p>

                  {/* Petit ornement */}
                  <div className="w-8 h-px bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignage - Mise en valeur du texte */}
      <section className="py-32 bg-[#FAF9F5] relative overflow-hidden">
        {/* Guillemets décoratifs géants */}
        <div className="absolute top-16 left-16 text-[200px] text-[#C9A96E] opacity-5 font-serif leading-none">"</div>
        <div className="absolute bottom-16 right-16 text-[200px] text-[#C9A96E] opacity-5 font-serif leading-none rotate-180">"</div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <p className="font-serif text-3xl md:text-4xl text-[#2C2C2C] leading-relaxed font-light italic">
              Amarea a transformé notre mariage en un moment absolument magique. 
              Chaque détail était parfait, au-delà de nos rêves les plus fous.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 bg-[#C9A96E]"></div>
              <span className="text-[#5C5C5C] text-sm tracking-[0.2em] uppercase font-light">
                Sophie & Thomas
              </span>
              <div className="h-px w-8 bg-[#C9A96E]"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section CTA finale - Épurée et impactante */}
      <section className="py-40 bg-[#2C2C2C] relative overflow-hidden">
        {/* Motif subtil en fond */}
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
            className="space-y-12"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-[#C9A96E]"></div>
              <Sparkles className="w-4 h-4 text-[#C9A96E]" />
              <div className="h-px w-16 bg-[#C9A96E]"></div>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl text-[#FFFEF9] font-light mb-8">
              Commençons à écrire
              <span className="block italic mt-2">votre histoire</span>
            </h2>
            
            <p className="text-[#D4D4D4] text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Prenez rendez-vous pour une première rencontre où nous découvrirons 
              ensemble votre vision et comment la concrétiser.
            </p>
            
            <Link href="/contact">
              <button className="group relative px-12 py-5 overflow-hidden border border-[#C9A96E]">
                <div className="absolute inset-0 bg-[#C9A96E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative flex items-center gap-3 text-[#FFFEF9] group-hover:text-[#2C2C2C] font-light tracking-wider text-sm uppercase transition-colors">
                  Prendre rendez-vous
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}