"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";


const Artifact3DInner = dynamic(() => import("./Artifact3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[550px] flex items-center justify-center bg-pharaoh-dark">
      <p className="text-egyptian-gold font-cinzel">Loading 3D artifact...</p>
    </div>
  ),
});

export default function Artifact3DLazy() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } 
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[550px]">
      {shouldLoad ? (
        <Artifact3DInner />
      ) : (
        <div className="w-full h-[550px] flex items-center justify-center bg-pharaoh-dark">
          <p className="text-egyptian-gold/50 font-cinzel">Scroll to load 3D artifact</p>
        </div>
      )}
    </div>
  );
}
