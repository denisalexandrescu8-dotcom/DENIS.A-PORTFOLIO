"use client"

import { memo } from "react"
import { motion } from "framer-motion"

export const GradientBackground = memo(() => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#000000] overflow-hidden">
      {/* High-Impact Organic CSS Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, -50, 0],
          y: [0, 50, 100, 0],
          rotate: [0, 45, -45, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] rounded-full bg-premium-blue/30 blur-[100px] mix-blend-screen will-change-transform"
      />
      
      <motion.div
        animate={{
          scale: [1.2, 1, 1.3, 1.2],
          x: [0, -120, 60, 0],
          y: [0, 150, -50, 0],
          rotate: [0, -90, 90, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] -right-[20%] w-[90%] h-[90%] rounded-full bg-purple-600/25 blur-[120px] mix-blend-screen animate-pulse will-change-transform"
      />

      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 200, 0],
          y: [0, -150, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-[30%] left-[10%] w-[70%] h-[70%] rounded-full bg-cyan-400/20 blur-[110px] mix-blend-plus-lighter will-change-transform"
      />

      {/* Deep Atmosphere Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 pointer-events-none" />

      {/* Animated Grain Overlay */}
      <motion.div 
        animate={{
          x: [0, -5, 5, -2, 0],
          y: [0, 5, -5, 2, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] scale-150" 
      />
    </div>
  )
})

GradientBackground.displayName = "GradientBackground"
