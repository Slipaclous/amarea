'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    guestCount: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        weddingDate: '',
        guestCount: '',
        budget: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Téléphone",
      details: "+33 1 23 45 67 89",
      description: "Disponible du lundi au vendredi"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      details: "contact@amarea.com",
      description: "Réponse sous 24h"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Adresse",
      details: "123 Avenue des Champs-Élysées",
      description: "75008 Paris, France"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Horaires",
      details: "9h - 18h",
      description: "Du lundi au vendredi"
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
                  Contact
                </span>
                <div className="h-px w-12 bg-[#C9A96E]"></div>
              </div>

              <h1 className="font-serif text-6xl md:text-7xl text-[#FFFEF9] tracking-tight leading-tight">
                <span className="block font-light">Parlons de</span>
                <span className="block font-normal italic">votre projet</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[#D4D4D4] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light"
            >
              Prêt à créer le mariage de vos rêves ? Contactez-nous pour une consultation 
              personnalisée et découvrez comment nous transformons votre vision en réalité
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards - Layout élégant */}
      <section className="py-20 bg-[#FFFEF9] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-[#E5E5E5]">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative border-r border-b border-[#E5E5E5] p-8 bg-[#FFFEF9] hover:bg-[#FAF9F5] transition-colors duration-500"
              >
                {/* Ligne d'accentuation */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#C9A96E] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <div className="space-y-4">
                  <div className="text-[#C9A96E]">
                    {info.icon}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-[#2C2C2C] text-xs tracking-[0.2em] uppercase font-light">
                      {info.title}
                    </h3>
                    <p className="text-[#2C2C2C] font-normal">
                      {info.details}
                    </p>
                    <p className="text-[#5C5C5C] text-sm font-light">
                      {info.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-32 bg-[#FFFEF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Information Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8 lg:sticky lg:top-32 h-fit"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-[#C9A96E]"></div>
                  <span className="text-[#C9A96E] text-xs tracking-[0.3em] font-light uppercase">
                    Commençons
                  </span>
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl text-[#2C2C2C] font-light leading-tight">
                  Une première
                  <span className="block italic mt-2">conversation</span>
                </h2>

                <p className="text-[#5C5C5C] text-base leading-relaxed font-light">
                  Chaque mariage est unique, c'est pourquoi nous prenons le temps de vous écouter 
                  et de comprendre vos souhaits pour créer l'événement qui vous ressemble.
                </p>
              </div>

              {/* Citation élégante */}
              <div className="border-l-2 border-[#C9A96E] pl-6 py-4 space-y-3">
                <p className="font-serif text-xl text-[#2C2C2C] italic font-light leading-relaxed">
                  "Votre histoire mérite d'être célébrée avec élégance et authenticité"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px w-6 bg-[#C9A96E]"></div>
                  <span className="text-[#5C5C5C] text-sm font-light">Amarea</span>
                </div>
              </div>

              {/* Petit ornement */}
              <div className="pt-8">
                <div className="w-16 h-16 opacity-15">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#C9A96E]">
                    <path d="M50,50 Q30,30 50,10 Q70,30 50,50 Q70,70 50,90 Q30,70 50,50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    <circle cx="50" cy="50" r="3" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="relative">
                {/* Bordure décorative */}
                <div className="absolute -inset-4 border border-[#E5E5E5]"></div>
                
                <div className="relative bg-[#FAF9F5] p-12">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16 space-y-6"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-[#C9A96E] rounded-full">
                        <CheckCircle className="w-10 h-10 text-[#C9A96E]" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-serif text-3xl text-[#2C2C2C] font-normal">
                          Message envoyé
                        </h3>
                        <p className="text-[#5C5C5C] font-light">
                          Nous vous contacterons dans les plus brefs délais
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Nom & Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-[#2C2C2C] text-xs tracking-[0.2em] uppercase font-light">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-0 py-3 bg-transparent border-b border-[#E5E5E5] focus:border-[#C9A96E] outline-none transition-colors duration-300 text-[#2C2C2C] font-light placeholder:text-[#5C5C5C]/30"
                            placeholder="Votre nom"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[#2C2C2C] text-xs tracking-[0.2em] uppercase font-light">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-0 py-3 bg-transparent border-b border-[#E5E5E5] focus:border-[#C9A96E] outline-none transition-colors duration-300 text-[#2C2C2C] font-light placeholder:text-[#5C5C5C]/30"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      {/* Téléphone & Date */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-[#2C2C2C] text-xs tracking-[0.2em] uppercase font-light">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-0 py-3 bg-transparent border-b border-[#E5E5E5] focus:border-[#C9A96E] outline-none transition-colors duration-300 text-[#2C2C2C] font-light placeholder:text-[#5C5C5C]/30"
                            placeholder="+33 1 23 45 67 89"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[#2C2C2C] text-xs tracking-[0.2em] uppercase font-light">
                            Date du mariage
                          </label>
                          <input
                            type="date"
                            name="weddingDate"
                            value={formData.weddingDate}
                            onChange={handleChange}
                            className="w-full px-0 py-3 bg-transparent border-b border-[#E5E5E5] focus:border-[#C9A96E] outline-none transition-colors duration-300 text-[#2C2C2C] font-light"
                          />
                        </div>
                      </div>

                      {/* Invités & Budget */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-[#2C2C2C] text-xs tracking-[0.2em] uppercase font-light">
                            Nombre d'invités
                          </label>
                          <select
                            name="guestCount"
                            value={formData.guestCount}
                            onChange={handleChange}
                            className="w-full px-0 py-3 bg-transparent border-b border-[#E5E5E5] focus:border-[#C9A96E] outline-none transition-colors duration-300 text-[#2C2C2C] font-light"
                          >
                            <option value="">Sélectionnez</option>
                            <option value="1-50">1-50 invités</option>
                            <option value="51-100">51-100 invités</option>
                            <option value="101-200">101-200 invités</option>
                            <option value="200+">200+ invités</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[#2C2C2C] text-xs tracking-[0.2em] uppercase font-light">
                            Budget approximatif
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-0 py-3 bg-transparent border-b border-[#E5E5E5] focus:border-[#C9A96E] outline-none transition-colors duration-300 text-[#2C2C2C] font-light"
                          >
                            <option value="">Sélectionnez</option>
                            <option value="10k-25k">10 000€ - 25 000€</option>
                            <option value="25k-50k">25 000€ - 50 000€</option>
                            <option value="50k-100k">50 000€ - 100 000€</option>
                            <option value="100k+">100 000€+</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="block text-[#2C2C2C] text-xs tracking-[0.2em] uppercase font-light">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-0 py-3 bg-transparent border-b border-[#E5E5E5] focus:border-[#C9A96E] outline-none transition-colors duration-300 resize-none text-[#2C2C2C] font-light placeholder:text-[#5C5C5C]/30"
                          placeholder="Parlez-nous de votre vision du mariage parfait..."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="group relative w-full px-12 py-5 overflow-hidden border border-[#2C2C2C] hover:border-[#C9A96E] transition-colors duration-300"
                        >
                          <div className="absolute inset-0 bg-[#2C2C2C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                          <span className="relative flex items-center justify-center gap-3 text-[#2C2C2C] group-hover:text-[#FFFEF9] font-light tracking-wider text-sm uppercase transition-colors">
                            Envoyer le message
                            <Send className="w-4 h-4" />
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-32 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#C9A96E]"></div>
              <span className="text-[#C9A96E] text-xs tracking-[0.3em] font-light uppercase">
                Notre bureau
              </span>
              <div className="h-px w-12 bg-[#C9A96E]"></div>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl text-[#2C2C2C] font-light mb-6">
              Venez nous <span className="italic">rencontrer</span>
            </h2>
            <p className="text-[#5C5C5C] text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Au cœur de Paris, notre bureau vous accueille pour discuter 
              de votre projet dans un cadre élégant et chaleureux
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Bordure décorative */}
            <div className="absolute -inset-4 border border-[#E5E5E5]"></div>
            
            <div className="relative bg-[#F5F5F0] h-[500px] flex items-center justify-center">
              {/* Texture */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
              }}></div>
              
              <div className="relative text-center space-y-4">
                <MapPin className="w-12 h-12 mx-auto text-[#C9A96E]" />
                <div>
                  <p className="text-[#2C2C2C] text-lg font-normal mb-2">Carte interactive</p>
                  <p className="text-[#5C5C5C] text-sm font-light">123 Avenue des Champs-Élysées</p>
                  <p className="text-[#5C5C5C] text-sm font-light">75008 Paris, France</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}