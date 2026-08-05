// src/components/Hero.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-12 py-20 px-6 md:px-16 overflow-hidden">
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 text-center md:text-left"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 bg-clip-text text-transparent pb-2">
          Discover the Secrets of Ancient Egypt
        </h1>
        <p className="mt-4 text-gray-300 text-lg max-w-xl mx-auto md:mx-0">
          Explore the pharaohs, timeless monuments, and sacred mysteries that shaped one of history's greatest civilizations.
        </p>
      </motion.div>

      {/* Image Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex-1 max-w-md md:max-w-lg"
      >
        <Image
          src="/hero-egypt.jpg"
          alt="Golden sarcophagus of an Egyptian Pharaoh"
          width={600}
          height={400}
          className="rounded-2xl shadow-2xl shadow-yellow-500/20 w-full"
          priority
        />
      </motion.div>
    </section>
  );
}
