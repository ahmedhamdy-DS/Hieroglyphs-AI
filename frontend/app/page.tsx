"use client";
// src/app/page.jsx

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import Pharaohs from "./components/Pharaohs";
import Monuments from "./components/Monuments";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import Translator from "./components/Translator";


const Artifact3D = dynamic(() => import("./components/Artifact3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[550px] flex items-center justify-center bg-pharaoh-dark">
      <p className="text-egyptian-gold font-cinzel">Loading 3D artifact...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Pharaohs />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Monuments />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Timeline />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Artifact3D />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Translator />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Gallery />
      </motion.div>
    </>
  );
}


