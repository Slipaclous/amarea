'use client';

import { motion } from 'framer-motion';
import { Award, Users, Heart, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchStats, fetchValues, fetchTestimonials } from '@/lib/api';
import { getPageContent } from '@/lib/page-content';

export default function About() {
  const [stats, setStats] = useState<any[]>([]);
  const [values, setValues] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    const loadData = async () => {
      const [statsData, valuesData, testimonialsData, contentData] = await Promise.all([
        fetchStats(),
        fetchValues(),
        fetchTestimonials(),
        getPageContent('about')
      ]);
      setStats(statsData);
      setValues(valuesData);
      setTestimonials(testimonialsData);
      setContent(contentData);
      console.log('[About] Content loaded:', contentData);
    };
    loadData();
  }, []);

  const defaultStats = [
    { number: '150+', label: 'Mariages organisés' },
    { number: '98%', label: 'Clients satisfaits' },
    { number: '5', label: 'Années d\'expérience' },
    { number: '24/7', label: 'Support dédié' }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  const iconMap: { [key: string]: JSX.Element } = {
    Heart: <Heart className="w-6 h-6" />,
    Award: <Award className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
  };

  const defaultValues = [
    {
      icon: "Heart",
      title: "Passion",
      description: "Chaque mariage est unique et mérite notre passion et notre dévouement absolu pour créer des moments d'exception."
    },
    {
      icon: "Award",
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque détail pour créer des moments inoubliables qui dépassent vos attentes."
    },
    {
      icon: "Users",
      title: "Personnalisation",
      description: "Chaque couple est unique, c'est pourquoi nous créons des expériences sur mesure qui vous ressemblent."
    }
  ];

  const displayValues = values.length > 0 ? values.map(v => ({ ...v, icon: v.icon || "Heart" })) : defaultValues;
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      text: "Amarea a transformé notre rêve en réalité. Leur attention aux détails et leur professionnalisme sont exceptionnels. Une équipe formidable.",
      author: "Sophie & Marc",
      role: "Mariés en 2023"
    },
    {
      text: "Une équipe formidable qui a su comprendre notre vision et la sublimer avec une élégance rare. Merci pour cette journée absolument parfaite.",
      author: "Emma & Thomas",
      role: "Mariés en 2023"
    }
  ];

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
                  {content['about.subtitle'] || 'À propos'}
                </span>
                <div className="h-px w-12 bg-[#C9A96E]"></div>
              </div>

              <h1 className="font-serif text-6xl md:text-7xl text-[#FFFEF9] tracking-tight leading-tight">
                <span className="block font-light">{content['about.title1'] || 'L\'histoire'}</span>
                <span className="block font-normal italic">{content['about.title2'] || 'd\'Amarea'}</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[#D4D4D4] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light"
            >
              {content['about.description'] || 'Créateur de mariages d\'exception depuis 2019, nous transformons vos rêves en réalité avec une expertise reconnue et une passion inébranlable'}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Grille élégante */}
      <section className="py-20 bg-[#FFFEF9] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {displayStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center py-12 border-r border-[#E5E5E5] last:border-r-0 md:last:border-r-0"
              >
                <div className="font-serif text-5xl md:text-6xl text-[#2C2C2C] mb-3 font-light">
                  {stat.number}
                </div>
                <div className="text-[#5C5C5C] text-sm tracking-[0.2em] uppercase font-light">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-[#FFFEF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 lg:sticky lg:top-32"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-[#C9A96E]"></div>
                  <span className="text-[#C9A96E] text-xs tracking-[0.3em] font-light uppercase">
                    {content['about.story.label'] || 'Notre histoire'}
                  </span>
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl text-[#2C2C2C] font-light leading-tight">
                  {content['about.story.title1'] || 'Une passion devenue'}
                  <span className="block italic mt-2">{content['about.story.title2'] || 'métier'}</span>
                </h2>
              </div>

              <div className="space-y-6 text-[#5C5C5C] text-base leading-relaxed font-light">
                {content['about.story.paragraph1'] && (
                  <p>{content['about.story.paragraph1']}</p>
                )}
                {content['about.story.paragraph2'] && (
                  <p>{content['about.story.paragraph2']}</p>
                )}
                {content['about.story.paragraph3'] && (
                  <p>{content['about.story.paragraph3']}</p>
                )}
                {!content['about.story.paragraph1'] && !content['about.story.paragraph2'] && !content['about.story.paragraph3'] && (
                  <>
                    <p>
                      Fondée en 2019 par une passionnée de l'événementiel, Amarea est née 
                      de la volonté de créer des mariages d'exception qui reflètent 
                      parfaitement l'unicité de chaque couple.
                    </p>
                    <p>
                      Notre équipe d'experts travaille avec les meilleurs artisans et 
                      fournisseurs pour garantir une qualité irréprochable et des moments 
                      inoubliables qui marqueront les esprits.
                    </p>
                    <p>
                      Chaque mariage est une nouvelle aventure, une nouvelle histoire 
                      d'amour à célébrer avec l'élégance et le raffinement qui nous 
                      caractérisent depuis nos débuts.
                    </p>
                  </>
                )}
              </div>

              {/* Petite citation */}
              {content['about.story.quote'] && (
                <div className="border-l-2 border-[#C9A96E] pl-6 py-4">
                  <p className="font-serif text-xl text-[#2C2C2C] italic font-light leading-relaxed">
                    "{content['about.story.quote']}"
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Cadre photo élégant */}
              <div className="relative">
                {/* Bordure décorative */}
                <div className="absolute -inset-4 border border-[#C9A96E]/20"></div>
                
                {/* Placeholder image avec texture */}
                <div className="relative bg-[#F5F5F0] aspect-[4/5] flex items-center justify-center">
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                  }}></div>
                  <span className="text-[#5C5C5C] text-sm tracking-[0.2em] uppercase font-light">
                    Image de l'équipe
                  </span>
                </div>
              </div>

              {/* Petit ornement en coin */}
              <div className="absolute -bottom-6 -right-6 w-16 h-16 opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#C9A96E]">
                  <path d="M50,50 Q30,30 50,10 Q70,30 50,50 Q70,70 50,90 Q30,70 50,50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  <circle cx="50" cy="50" r="3" fill="currentColor"/>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Layout éditorial */}
      <section className="py-32 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#C9A96E]"></div>
              <span className="text-[#C9A96E] text-xs tracking-[0.3em] font-light uppercase">
                Nos valeurs
              </span>
              <div className="h-px w-12 bg-[#C9A96E]"></div>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl text-[#2C2C2C] font-light mb-6">
              {content['about.values.title'] || 'Les principes qui nous guident'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-[#E5E5E5]">
            {displayValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative border-r border-b border-[#E5E5E5] p-12 bg-[#FFFEF9] hover:bg-[#FFFEF9] transition-colors duration-500"
              >
                {/* Ligne d'accentuation */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#C9A96E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <div className="space-y-6">
                  <div className="text-[#C9A96E] flex items-start">
                    {value.icon ? iconMap[value.icon] || <Heart className="w-6 h-6" /> : <Heart className="w-6 h-6" />}
                  </div>
                  
                  <h3 className="font-serif text-2xl text-[#2C2C2C] font-normal">
                    {value.title}
                  </h3>
                  
                  <p className="text-[#5C5C5C] leading-relaxed font-light">
                    {value.description}
                  </p>

                  <div className="w-8 h-px bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Format magazine */}
      <section className="py-32 bg-[#2C2C2C] relative overflow-hidden">
        {/* Guillemets géants en fond */}
        <div className="absolute top-20 left-20 text-[180px] text-[#C9A96E] opacity-5 font-serif leading-none">"</div>
        <div className="absolute bottom-20 right-20 text-[180px] text-[#C9A96E] opacity-5 font-serif leading-none rotate-180">"</div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#C9A96E]"></div>
              <span className="text-[#C9A96E] text-xs tracking-[0.3em] font-light uppercase">
                Témoignages
              </span>
              <div className="h-px w-12 bg-[#C9A96E]"></div>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl text-[#FFFEF9] font-light">
              Ils nous ont <span className="italic">fait confiance</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Bordure décorative */}
                <div className="absolute -inset-6 border border-[#C9A96E]/10"></div>
                
                <div className="relative bg-[#1A1A1A] p-10 space-y-6">
                  <Quote className="w-8 h-8 text-[#C9A96E]" />
                  
                  <p className="font-serif text-xl text-[#D4D4D4] leading-relaxed font-light italic">
                    {testimonial.text}
                  </p>
                  
                  <div className="pt-6 border-t border-[#C9A96E]/20">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-6 bg-[#C9A96E]"></div>
                      <div>
                        <div className="text-[#FFFEF9] font-normal tracking-wide">
                          {testimonial.author}
                        </div>
                        {testimonial.role && (
                          <div className="text-[#C9A96E] text-sm font-light tracking-wider">
                            {testimonial.role}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#FFFEF9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2 className="font-serif text-5xl md:text-6xl text-[#2C2C2C] font-light">
                {content['about.cta.title'] || 'Prêt à créer votre mariage d\'exception ?'}
              </h2>
              <p className="text-[#5C5C5C] text-lg max-w-2xl mx-auto font-light leading-relaxed">
                {content['about.cta.description'] || 'Découvrez comment nous pouvons transformer vos rêves en réalité avec notre expertise et notre passion du détail'}
              </p>
            </div>
            
            <Link href="/contact">
              <button className="group relative px-12 py-5 overflow-hidden border border-[#2C2C2C] hover:border-[#C9A96E] transition-colors duration-300">
                <div className="absolute inset-0 bg-[#2C2C2C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative text-[#2C2C2C] group-hover:text-[#FFFEF9] font-light tracking-wider text-sm uppercase transition-colors">
                  {content['about.cta.button'] || 'Découvrir nos services'}
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}