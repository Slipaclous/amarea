'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2C2C2C] text-[#FFFEF9] relative overflow-hidden">
      {/* Texture subtile en fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Ligne décorative supérieure */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-8"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 border border-[#C9A96E]/10"></div>
              <Image
                src="/img/amarea.png"
                alt="Amarea"
                width={160}
                height={64}
                className="relative object-contain w-36 h-14 filter grayscale contrast-125 brightness-0 invert"
              />
            </div>
            
            <p className="text-[#D4D4D4] leading-relaxed font-light max-w-md">
              Créateur de mariages d'exception, nous transformons vos rêves en réalité 
              avec une attention aux détails et un savoir-faire d'exception
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-[#C9A96E]"></div>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://instagram.com/amarea"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-[#C9A96E]/30 hover:border-[#C9A96E] transition-colors duration-300"
              >
                <Instagram size={18} className="text-[#C9A96E]" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="mailto:contact@amarea.com"
                className="w-10 h-10 flex items-center justify-center border border-[#C9A96E]/30 hover:border-[#C9A96E] transition-colors duration-300"
              >
                <Mail size={18} className="text-[#C9A96E]" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-6"
          >
            <div className="space-y-3">
              <div className="h-px w-12 bg-[#C9A96E]"></div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#C9A96E] font-light">
                Contact
              </h4>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#C9A96E]/50">
                  <Phone size={14} />
                  <span className="text-xs tracking-[0.1em] uppercase font-light">Téléphone</span>
                </div>
                <a href="tel:+33123456789" className="block text-[#D4D4D4] font-light hover:text-[#C9A96E] transition-colors duration-300">
                  +33 1 23 45 67 89
                </a>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#C9A96E]/50">
                  <Mail size={14} />
                  <span className="text-xs tracking-[0.1em] uppercase font-light">Email</span>
                </div>
                <a href="mailto:contact@amarea.com" className="block text-[#D4D4D4] font-light hover:text-[#C9A96E] transition-colors duration-300">
                  contact@amarea.com
                </a>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#C9A96E]/50">
                  <MapPin size={14} />
                  <span className="text-xs tracking-[0.1em] uppercase font-light">Adresse</span>
                </div>
                <p className="text-[#D4D4D4] font-light">
                  123 Avenue des Champs-Élysées<br />
                  75008 Paris, France
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-4 space-y-6"
          >
            <div className="space-y-3">
              <div className="h-px w-12 bg-[#C9A96E]"></div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-[#C9A96E] font-light">
                Navigation
              </h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Link href="/" className="block text-[#D4D4D4] font-light hover:text-[#C9A96E] transition-colors duration-300">
                  Accueil
                </Link>
                <Link href="/about" className="block text-[#D4D4D4] font-light hover:text-[#C9A96E] transition-colors duration-300">
                  À propos
                </Link>
                <Link href="/gallery" className="block text-[#D4D4D4] font-light hover:text-[#C9A96E] transition-colors duration-300">
                  Galerie
                </Link>
                <Link href="/contact" className="block text-[#D4D4D4] font-light hover:text-[#C9A96E] transition-colors duration-300">
                  Contact
                </Link>
              </div>
              
              <div className="space-y-3">
                <span className="block text-[#D4D4D4] font-light">
                  Organisation complète
                </span>
                <span className="block text-[#D4D4D4] font-light">
                  Décoration florale
                </span>
                <span className="block text-[#D4D4D4] font-light">
                  Coordination jour J
                </span>
                <span className="block text-[#D4D4D4] font-light">
                  Prestations premium
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-[#C9A96E]/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-[#C9A96E]"></div>
              <p className="text-[#5C5C5C] text-xs tracking-[0.1em] uppercase font-light">
                © {currentYear} Amarea
              </p>
            </div>
            
            <div className="flex items-center gap-8 text-xs">
              <Link href="#" className="text-[#5C5C5C] hover:text-[#C9A96E] transition-colors duration-300 tracking-[0.1em] uppercase font-light">
                Mentions légales
              </Link>
              <Link href="#" className="text-[#5C5C5C] hover:text-[#C9A96E] transition-colors duration-300 tracking-[0.1em] uppercase font-light">
                Confidentialité
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ornement décoratif en coin */}
      <div className="absolute bottom-8 right-8 w-20 h-20 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#C9A96E]">
          <path d="M50,50 Q30,30 50,10 Q70,30 50,50 Q70,70 50,90 Q30,70 50,50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="50" cy="50" r="3" fill="currentColor"/>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;