// src/components/Pharaohs.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const pharaohs = [
  {
    id: "tut",
    name: "Tutankhamun",
    reign: "c. 1332–1323 BC",
    img: "/tut.jpg", // Use a consistent path
    bio: "Famously known as the 'boy king', Tutankhamun's brief reign saw the restoration of traditional Egyptian religion. His nearly intact tomb, discovered in 1922 by Howard Carter, remains one of the most significant archaeological finds in history.",
    achievements: ["Restored the Amun priesthood", "Moved capital back to Thebes", "Tomb provided immense insight into the era"]
  },
  {
    id: "ramesses",
    name: "Ramesses II",
    reign: "c. 1279–1213 BC",
    img: "/ramesses.jpg",
    bio: "Often regarded as the greatest and most powerful pharaoh, Ramesses the Great led several military campaigns and expanded the Egyptian empire. His reign was marked by a massive building program, including the temples at Abu Simbel.",
    achievements: ["Signed the first known peace treaty", "Constructed the Ramesseum & Abu Simbel temples", "Long and prosperous 66-year reign"]
  },
  {
    id: "cleopatra",
    name: "Cleopatra VII",
    reign: "51–30 BC",
    img: "/c1.jpg",
    bio: "The last active ruler of the Ptolemaic Kingdom of Egypt, Cleopatra was a brilliant diplomat and strategist. She forged crucial political alliances with Roman leaders Julius Caesar and Mark Antony to protect her empire.",
    achievements: ["Maintained Egyptian independence from Rome for two decades", "Spoke multiple languages, including Egyptian", "Reformed the economy and centralized power"]
  },
];

type Pharaoh = typeof pharaohs[0];

export default function Pharaohs() {
  const [selected, setSelected] = useState<Pharaoh | null>(null);

  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="pharaohs" className="py-16 px-6 md:px-16 text-center bg-black/20">
      <h2 className="text-4xl font-bold mb-12 text-white"> Famous Pharaohs of Ancient Egypt</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pharaohs.map((p) => (
          <motion.div
            key={p.id}
            onClick={() => setSelected(p)}
            className="bg-[#1a1a1a] p-4 rounded-2xl shadow-lg hover:shadow-yellow-500/40 transition-shadow duration-300 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="overflow-hidden rounded-xl mb-4">
              <Image 
                src={p.img} 
                alt={p.name} 
                width={400} 
                height={400} 
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            <h3 className="text-2xl font-semibold text-white">{p.name}</h3>
            <p className="text-sm text-gray-400">{p.reign}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-[#222] to-[#1a1a1a] border border-gray-700 rounded-2xl p-6 md:p-8 max-w-lg w-full text-left relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close details"
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
              <Image src={selected.img} alt={selected.name} width={500} height={500} className="rounded-xl mb-4 w-full h-auto" />
              <h3 className="text-3xl font-bold text-white mb-2">{selected.name}</h3>
              <p className="text-gray-400 mb-4">{selected.reign}</p>
              <p className="text-gray-300 mb-6">{selected.bio}</p>
              <h4 className="font-semibold text-lg text-white mb-2">Key Achievements:</h4>
              <ul className="list-disc list-inside pl-2 space-y-1 text-gray-300">
                {selected.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );

}
