"use client"

import { memo } from "react"
import { GrainGradient } from "@paper-design/shaders-react"

export const GradientBackground = memo(() => {
  return (
    <div className="fixed inset-0 -z-10 will-change-transform">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack="hsl(0, 0%, 0%)"
        softness={0.76}
        intensity={0.45}
        noise={0}
        shape="corners"
        offsetX={0}
        offsetY={0}
        scale={1}
        rotation={0}
        speed={0.5}
        colors={["hsl(220, 100%, 50%)", "hsl(180, 100%, 40%)", "hsl(280, 70%, 50%)"]}
      />
    </div>
  )
})
