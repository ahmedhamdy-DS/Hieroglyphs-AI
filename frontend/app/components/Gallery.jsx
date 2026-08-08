// app/components/Gallery.jsx

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryItems = [
  {
    src: '/artifact-1.jpg',
    title: 'Golden Sarcophagus',
    alt: 'The intricate golden sarcophagus of a pharaoh.',
  },
  {
    src: '/artifact-2.jpg',
    title: 'Anubis Shrine',
    alt: 'A detailed wooden shrine depicting the jackal god Anubis.',
  },
  {
    src: '/artifact-3.jpg',
    title: 'Canopic Jars',
    alt: 'Alabaster canopic jars used to store organs for the afterlife.',
  },
  {
    src: '/artifact-4.jpg',
    title: 'Hieroglyphic Tablet',
    alt: 'A stone tablet covered in finely carved ancient Egyptian hieroglyphs.',
  },
  {
    src: '/artifact-6.jpg',
    title: 'Scarab Amulet',
    alt: 'A Lapis Lazuli scarab beetle amulet, a symbol of rebirth.',
  },
  {
    src: '/artifact-7.jpg',
    title: 'Pharaoh\'s Throne',
    alt: 'An ornate golden throne discovered in a royal tomb.',
  },
]

// Lightbox component with next/next navigation
const Lightbox = ({ item, onClose, onNext, onPrev }) => {
  if (!item) return null

  const handleNavigation = (e, action) => {
    e.stopPropagation()
    action()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Previous Button */}
      <button
        onClick={(e) => handleNavigation(e, onPrev)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-papyrus hover:bg-black/60 hover:text-egyptian-gold transition-all"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Image Content */}
      <motion.div
        key={item.src}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-4xl max-h-[90vh] w-full p-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[70vh]">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-contain rounded-lg"
          />
        </div>
        <p className="text-center text-papyrus/80 mt-4 font-cinzel tracking-wider text-lg">
          {item.title}
        </p>
      </motion.div>

      {/* Next Button */}
      <button
        onClick={(e) => handleNavigation(e, onNext)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 text-papyrus hover:bg-black/60 hover:text-egyptian-gold transition-all"
      >
        <ChevronRight size={32} />
      </button>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-papyrus hover:text-egyptian-gold transition-colors"
      >
        <X size={32} />
      </button>
    </motion.div>
  )
}

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleNext = () => {
    if (selectedItem) {
      const currentIndex = galleryItems.findIndex(
        (item) => item.src === selectedItem.src,
      )
      const nextIndex = (currentIndex + 1) % galleryItems.length
      setSelectedItem(galleryItems[nextIndex])
    }
  }

  const handlePrev = () => {
    if (selectedItem) {
      const currentIndex = galleryItems.findIndex(
        (item) => item.src === selectedItem.src,
      )
      const prevIndex =
        (currentIndex - 1 + galleryItems.length) % galleryItems.length
      setSelectedItem(galleryItems[prevIndex])
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedItem) return
      if (event.key === 'ArrowRight') {
        handleNext()
      } else if (event.key === 'ArrowLeft') {
        handlePrev()
      } else if (event.key === 'Escape') {
        setSelectedItem(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedItem])

  return (
    <>
      <motion.section
        id="gallery"
        className="py-24 bg-pharaoh-dark"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-cinzel text-egyptian-gold text-center mb-16 drop-shadow-lg tracking-wide">
            Artifact Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryItems.map((item) => (
              <motion.div
                key={item.src}
                layoutId={`card-${item.src}`}
                onClick={() => setSelectedItem(item)}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer border-2 border-transparent hover:border-egyptian-gold/50 transition-all"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 font-cinzel text-lg text-papyrus drop-shadow-md">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedItem && (
          <Lightbox
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </>
  )
}