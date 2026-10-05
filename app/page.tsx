'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Mail, X, ArrowRight, Menu } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioConfig';

type ImageItem = typeof PORTFOLIO_DATA.images[0];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Handle escape key for modals
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredImages = activeCategory === "All" 
    ? PORTFOLIO_DATA.images 
    : PORTFOLIO_DATA.images.filter(img => img.category === activeCategory);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] flex flex-col relative overflow-hidden">
      
      {/* HEADER */}
      <header className="px-6 md:px-12 py-8 flex items-center justify-between z-40 fixed top-0 w-full bg-gradient-to-b from-[#fafafa] to-transparent">
        <h1 className="font-playfair text-2xl font-light tracking-[0.3em] uppercase">{PORTFOLIO_DATA.name}</h1>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12 text-[10px] tracking-[0.2em] uppercase opacity-60 font-semibold">
          <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#fafafa] flex flex-col p-12"
          >
            <button onClick={() => setIsMenuOpen(false)} className="self-end mb-16">
              <X size={32} strokeWidth={1} />
            </button>
            <div className="flex flex-col gap-8 text-2xl font-playfair tracking-wider">
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-left w-fit hover:opacity-60 transition-opacity">Contact</a>
            </div>
            <div className="mt-auto opacity-50 text-sm font-light uppercase tracking-widest">
              {PORTFOLIO_DATA.title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-32 pb-24 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
        
        {/* CATEGORY FILTER */}
        <div className="mb-12 flex flex-wrap gap-4 md:gap-8 border-b border-[#111111]/10 pb-6">
          {PORTFOLIO_DATA.categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] tracking-[0.2em] uppercase font-semibold pb-1 transition-all duration-300 ${activeCategory === cat ? 'text-[#111111] border-b border-[#111111]' : 'text-[#111111]/60 hover:text-[#111111]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MASONRY GALLERY */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={img.id} 
                className="break-inside-avoid cursor-pointer overflow-hidden group relative"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative w-full overflow-hidden">
                  <Image 
                    src={img.url} 
                    alt={img.title} 
                    width={800} 
                    height={1200}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 filter grayscale hover:grayscale-0"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="px-6 md:px-12 py-16 border-t border-[#111111]/10 flex flex-col md:flex-row justify-between items-center gap-8 text-xs uppercase tracking-widest text-[#111111]/50">
        <p className="font-playfair text-lg tracking-[0.2em] text-[#111111] uppercase">{PORTFOLIO_DATA.name}</p>
        
        <div className="flex flex-col items-center md:items-end gap-6">
          <span className="text-[10px] tracking-[0.2em]">Get In Touch</span>
          <div className="flex gap-8">
            <a href={`mailto:${PORTFOLIO_DATA.email}`} className="hover:text-[#111111] transition-colors">
              <Mail size={20} strokeWidth={1.5} />
            </a>
            <a href={PORTFOLIO_DATA.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-[#111111] transition-colors">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#fafafa]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-6 md:top-10 right-6 md:right-12 z-50 text-[#111111]/60 hover:text-[#111111] transition-colors"
              aria-label="Close"
            >
              <X size={32} strokeWidth={1} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedImage.url} 
                alt={selectedImage.category} 
                fill
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT MODAL (Removed) */}

    </div>
  );
}
