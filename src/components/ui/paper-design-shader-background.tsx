"use client"

import { memo, useState } from "react"
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react"

export const GradientBackground = memo(() => {
  const [speed] = useState(1.0)
  const [intensity] = useState(1.5)

  return (
    <div className="fixed inset-0 -z-20 bg-black overflow-hidden pointer-events-none">
      {/* 21st.dev Style Shader Background - Pure Mesh Gradient for Organic Look */}
      <div className="w-full h-full absolute inset-0" style={{ backgroundColor: "#000000" }}>
        <MeshGradient
          className="w-full h-full"
          colors={["#000000", "#111111", "#222222", "#999999"]}
          speed={speed * 0.4}
        />
      </div>

      {/* Subtle lighting overlay to add depth without breaking the organic flow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: `${4 / speed}s` }}
        />
      </div>
      
      {/* Soft Vignette */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-40" />
    </div>
  )
})

GradientBackground.displayName = "GradientBackground"
