// app/components/Monuments.jsx

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

// DATA (no changes)
const monuments = [
  {
    name: 'The Great Pyramid of Giza',
    era: 'c. 2589–2566 BC',
    description:
      'The oldest of the Seven Wonders of the Ancient World, it was built as a tomb for the Pharaoh Khufu over a 20-year period.',
    details:
      'As the largest pyramid in Giza, its construction is a marvel of ancient engineering. Originally clad in polished limestone, it would have shone brilliantly under the sun. It held its title as the tallest man-made structure for over 3,800 years.',
    image: '/pyramid-giza.jpg',
  },
  {
    name: 'The Great Sphinx',
    era: 'c. 2558–2532 BC',
    description:
      "A mythical creature with a lion's body and a human head, believed to represent Pharaoh Khafre, guarding the Giza plateau.",
    details:
      'Carved from a single massive limestone bedrock, the Sphinx is a symbol of ancient Egyptian strength and intelligence. Its purpose and the mysteries surrounding its eroded nose and ceremonial beard continue to fascinate historians and archaeologists.',
    image: '/sphinx.jpg',
  },
  {
    name: 'Temples of Karnak',
    era: 'c. 2055 BC – 100 AD',
    description:
      'A vast complex of temples and chapels. The Great Hypostyle Hall, with its 134 massive columns, is one of the most breathtaking ancient sites.',
    details:
      'Karnak was the most important place of worship in ancient Egypt, dedicated to the Theban triad of Amun, Mut, and Khonsu. Successive pharaohs added their own constructions, making it a dynamic record of Egyptian history written in stone.',
    image: '/karnak.jpg',
  },
  {
    name: 'Valley of the Kings',
    era: 'c. 1539 BC – 1075 BC',
    description:
      'A royal necropolis where tombs were constructed for the Pharaohs and powerful nobles of the New Kingdom.',
    details:
      "For nearly 500 years, this valley on the west bank of the Nile was the final resting place for rulers like Tutankhamun and Ramesses II. The tombs were decorated with elaborate murals depicting the soul's journey to the afterlife.",
    image: '/valley-of-kings.jpg',
  },
  {
    name: 'Abu Simbel Temples',
    era: 'c. 1264 BC',
    description:
      'Two massive rock-cut temples built by Ramesses II, famous for their colossal seated statues of the pharaoh.',
    details:
      "The temples were a feat of both art and astronomy. The Great Temple is precisely aligned so that twice a year, the sun's rays penetrate the sanctuary to illuminate the statues of the gods and Ramesses II. The entire complex was relocated in the 1960s to save it from the rising waters of Lake Nasser.",
    image: '/abu-simbel.jpg',
  },
];

// MODAL COMPONENT
const MonumentModal = ({ monument, onClose }) => {
  if (!monument) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] bg-pharaoh-dark border-2 border-egyptian-gold/50 rounded-lg shadow-2xl shadow-egyptian-gold/20 p-8 m-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-egyptian-gold hover:text-papyrus transition-colors"
        >
          <X size={32} />
        </button>
        <h2 className="text-3xl md:text-4xl font-cinzel text-egyptian-gold mb-4 drop-shadow-lg">
          {monument.name}
        </h2>
        <div className="relative w-full h-96 mb-6">
          <Image
            src={monument.image}
            alt={monument.name}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover rounded-md"
          />
        </div>
        <p className="text-lg text-papyrus/90 font-inter leading-relaxed">
          {monument.details}
        </p>
      </div>
    </div>
  )
}

// MAIN COMPONENT
export default function Monuments() {
  const [selectedMonument, setSelectedMonument] = useState(null)

  return (
    <>
      <motion.div
        id="monuments"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          className="relative bg-pharaoh-dark bg-fixed bg-center bg-cover py-24"
          style={{
            backgroundImage: "url('/tomb-wall-texture.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-pharaoh-dark/90"></div>
          <div className="relative z-10 container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-cinzel text-egyptian-gold text-center mb-20 drop-shadow-lg tracking-wide">
              Monuments of Eternity
            </h2>
            <div className="space-y-24">
              {monuments.map((monument, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center gap-12`}
                >
                  <div className="w-full md:w-1/2 p-2 border-2 border-egyptian-gold/30 rounded-lg bg-black/30">
                    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
                      <Image
                        src={monument.image}
                        alt={monument.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover shadow-2xl shadow-egyptian-gold/10"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 text-center md:text-left">
                    <p className="font-cinzel text-lg text-egyptian-gold drop-shadow-md mb-2">
                      {monument.era}
                    </p>
                    <h3 className="text-3xl lg:text-4xl font-cinzel font-bold mb-4 text-papyrus">
                      {monument.name}
                    </h3>
                    <p className="text-lg text-papyrus/80 font-inter leading-relaxed mb-6">
                      {monument.description}
                    </p>
                    <button
                      onClick={() => setSelectedMonument(monument)}
                      className="font-cinzel text-egyptian-gold border border-egyptian-gold px-6 py-2 rounded-md hover:bg-egyptian-gold hover:text-pharaoh-dark transition-all duration-300 shadow-lg"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <MonumentModal
        monument={selectedMonument}
        onClose={() => setSelectedMonument(null)}
      />
    </>
  )
}