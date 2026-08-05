// app/components/Translator.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Loader2, AlertCircle, ScanEye } from "lucide-react";

// API URL - determined by the NEXT_PUBLIC_API_URL environment variable
// (See .env.local.example in the project root)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type PredictionResult = {
  code: string;
  name: string;
  description: string;
  category: string | null;
  confidence: number;
};

export default function Translator() {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setResult(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG or PNG).");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        throw new Error(errBody?.detail || `Request failed (${res.status})`);
      }

      const data: PredictionResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Connection error. Please ensure the API is running."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <section
      id="translator"
      className="py-24 bg-pharaoh-dark border-t border-egyptian-gold/10"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-cinzel text-egyptian-gold text-center mb-4 drop-shadow-lg tracking-wide">
          AI Hieroglyph Translator
        </h2>
        <p className="text-center text-papyrus/70 mb-12">
          Upload an image of a hieroglyphic symbol, and the AI will determine its meaning and category.
        </p>

        {/* Upload Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors ${
            dragActive
              ? "border-egyptian-gold bg-egyptian-gold/10"
              : "border-egyptian-gold/30 hover:border-egyptian-gold/60"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={onSelect}
          />
          <UploadCloud className="text-egyptian-gold" size={40} />
          <p className="text-papyrus/80 text-center">
            Drag an image here or click to select
          </p>
          <p className="text-papyrus/40 text-xs">JPG · PNG · WEBP — up to 8MB</p>
        </div>

        {/* Preview + Result */}
        <AnimatePresence mode="wait">
          {preview && (
            <motion.div
              key="result-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start"
            >
              <div className="rounded-xl overflow-hidden border border-egyptian-gold/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Uploaded image"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="bg-white/5 rounded-xl p-6 min-h-[16rem] flex flex-col justify-center">
                {loading && (
                  <div className="flex flex-col items-center gap-3 text-papyrus/70">
                    <Loader2 className="animate-spin text-egyptian-gold" size={32} />
                    <span>Analyzing...</span>
                  </div>
                )}

                {error && !loading && (
                  <div className="flex flex-col items-center gap-2 text-red-400 text-center">
                    <AlertCircle size={28} />
                    <span>{error}</span>
                  </div>
                )}

                {result && !loading && !error && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ScanEye className="text-egyptian-gold" size={22} />
                      <h3 className="font-cinzel text-2xl text-egyptian-gold">
                        {result.name}{" "}
                        <span className="text-papyrus/50 text-base">
                          ({result.code})
                        </span>
                      </h3>
                    </div>

                    {result.category && (
                      <p className="text-papyrus/50 text-sm mb-3">
                        Category: {result.category}
                      </p>
                    )}

                    <p className="text-papyrus/80 mb-4 leading-relaxed">
                      {result.description}
                    </p>

                    <div>
                      <div className="flex justify-between text-xs text-papyrus/50 mb-1">
                        <span>Confidence Score</span>
                        <span>{(result.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-egyptian-gold rounded-full transition-all"
                          style={{ width: `${result.confidence * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}