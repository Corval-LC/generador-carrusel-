"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Idea = {
  id: number;
  title: string;
  description: string;
};

type Props = {
  ideas: Idea[];
  extractedText: string;
  onContinue: (selected: Idea[]) => void;
};

export function IdeasScreen({
  ideas,
  extractedText,
  onContinue,
}: Props) {
  const [selectedIds, setSelectedIds] =
    useState<number[]>([]);

  const toggleIdea = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const selectedIdeas = ideas.filter((i) =>
    selectedIds.includes(i.id)
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold mb-2">
            Ideas clave detectadas
          </h1>
          <p className="text-zinc-500 text-sm">
            Elegí qué ideas querés usar en el
            carrusel final
          </p>
        </motion.div>

        {/* TEXTO PROCESADO (DEBUG) */}
        <div className="mb-8 rounded-xl border bg-zinc-50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-zinc-700">
            Texto procesado (debug)
          </h3>

          <pre className="max-h-40 overflow-auto whitespace-pre-wrap text-xs text-zinc-600">
            {extractedText}
          </pre>
        </div>

        {/* IDEAS */}
        <div className="space-y-4 mb-10">
          {ideas.map((idea) => {
            const active =
              selectedIds.includes(idea.id);

            return (
              <motion.div
                key={idea.id}
                onClick={() =>
                  toggleIdea(idea.id)
                }
                whileHover={{ scale: 1.01 }}
                className={`cursor-pointer rounded-xl border p-5 transition ${
                  active
                    ? "border-black bg-zinc-50"
                    : "border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={active}
                    readOnly
                    className="mt-1"
                  />

                  <div>
                    <h3 className="font-semibold mb-1">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-zinc-600">
                      {idea.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <button
            disabled={selectedIds.length === 0}
            onClick={() =>
              onContinue(selectedIdeas)
            }
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              selectedIds.length === 0
                ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                : "bg-black text-white hover:scale-[1.02]"
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
