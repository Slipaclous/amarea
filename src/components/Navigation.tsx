'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
    { name: 'Galerie', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Ligne décorative supérieure fixe */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent opacity-20 z-50"></div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#FFFEF9]/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-lg' 
            : 'bg-[#2C2C2C]/95 backdrop-blur-md border-b border-[#2C2C2C]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Bordure décorative au survol */}
                <div className="absolute -inset-4 border border-[#C9A96E] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rotate-45"></div>
                
                <Image
                  src="/img/amarea.png"
                  alt="Amarea"
                  width={160}
                  height={64}
                  className={`relative transition-all duration-500 object-contain w-28 h-11 sm:w-32 sm:h-13 md:w-36 md:h-14 ${
                    scrolled 
                      ? 'filter grayscale contrast-150 brightness-110' 
                      : 'filter grayscale contrast-150 brightness-0 invert'
                  }`}
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-6 py-2 transition-colors duration-300 font-light text-sm tracking-[0.1em] uppercase group ${
                      scrolled 
                        ? 'text-[#2C2C2C] hover:text-[#C9A96E]' 
                        : 'text-[#FFFEF9] hover:text-[#C9A96E]'
                    }`}
                  >
                    {item.name}
                    {/* Underline animé */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#C9A96E] transition-all duration-300 group-hover:w-8"></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="hidden md:block"
            >
              <Link href="/contact">
                <button className={`group relative px-6 py-2 overflow-hidden border transition-colors duration-300 ${
                  scrolled
                    ? 'border-[#2C2C2C] hover:border-[#C9A96E]'
                    : 'border-[#FFFEF9] hover:border-[#C9A96E]'
                }`}>
                  <div className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    scrolled ? 'bg-[#2C2C2C]' : 'bg-[#FFFEF9]'
                  }`}></div>
                  <span className={`relative font-light tracking-wider text-xs uppercase transition-colors ${
                    scrolled 
                      ? 'text-[#2C2C2C] group-hover:text-[#FFFEF9]' 
                      : 'text-[#FFFEF9] group-hover:text-[#2C2C2C]'
                  }`}>
                    Nous contacter
                  </span>
                </button>
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
                scrolled 
                  ? 'text-[#2C2C2C] hover:text-[#C9A96E]' 
                  : 'text-[#FFFEF9] hover:text-[#C9A96E]'
              }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#2C2C2C]/95 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            >
              {/* Texture subtile */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
            </motion.div>

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-[#FFFEF9] z-50 md:hidden overflow-y-auto"
            >
              {/* Header avec fermeture */}
              <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5]">
                <Image
                  src="/img/amarea.png"
                  alt="Amarea"
                  width={120}
                  height={48}
                  className="object-contain w-24 h-10 filter grayscale contrast-125"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#2C2C2C] hover:text-[#C9A96E] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="px-6 py-8 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group block py-4 border-b border-[#E5E5E5] transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-light text-lg text-[#2C2C2C] group-hover:text-[#C9A96E] transition-colors">
                          {item.name}
                        </span>
                        <div className="w-0 h-px bg-[#C9A96E] group-hover:w-8 transition-all duration-300"></div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA Mobile */}
              <div className="px-6 py-6 border-t border-[#E5E5E5]">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <button className="group relative w-full px-6 py-4 overflow-hidden border border-[#2C2C2C] hover:border-[#C9A96E] transition-colors duration-300">
                    <div className="absolute inset-0 bg-[#2C2C2C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <span className="relative text-[#2C2C2C] group-hover:text-[#FFFEF9] font-light tracking-wider text-sm uppercase transition-colors">
                      Nous contacter
                    </span>
                  </button>
                </Link>
              </div>

              {/* Info contact en bas */}
              <div className="px-6 py-8 space-y-4 border-t border-[#E5E5E5]">
                <div className="space-y-2">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#C9A96E] font-light">
                    Téléphone
                  </p>
                  <p className="text-[#2C2C2C] font-light">
                    +33 1 23 45 67 89
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#C9A96E] font-light">
                    Email
                  </p>
                  <p className="text-[#2C2C2C] font-light">
                    contact@amarea.com
                  </p>
                </div>
              </div>

              {/* Ornement décoratif */}
              <div className="absolute bottom-6 left-6 w-12 h-12 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#C9A96E]">
                  <path d="M50,50 Q30,30 50,10 Q70,30 50,50 Q70,70 50,90 Q30,70 50,50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  <circle cx="50" cy="50" r="3" fill="currentColor"/>
                </svg>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;