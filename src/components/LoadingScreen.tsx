"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 15)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      <div className="relative flex flex-col items-center z-10">
        {/* Minimalist Logo with Organic Reveal */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-4xl font-display font-bold mb-12 tracking-tighter"
        >
          DENIS<span className="text-white/20">.</span>
        </motion.div>

        {/* Minimalist Progress Line - Paper Design Style */}
        <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Percentage - Mono & Dimmed */}
        <div className="mt-6 font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] flex items-center justify-between w-64">
          <motion.span
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
          >
            Initializing
          </motion.span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* Atmospheric Mesh-like shadows (Matching the new background theme) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" 
        />
      </div>
    </motion.div>
  )
}
