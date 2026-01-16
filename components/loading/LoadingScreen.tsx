"use client"

import { motion } from "framer-motion"

export function LoadingScreen({
  text = "Analizando el video y extrayendo ideas clave…",
}: {
  text?: string
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-zinc-200 border-t-black"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />

        {/* Texto */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium text-zinc-600 text-center max-w-xs"
        >
          {text}
        </motion.p>
      </div>
    </div>
  )
}
