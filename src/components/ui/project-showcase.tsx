"use client"

import type React from "react"
import { useState, useRef, memo } from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"

interface Project {
  id: string
  project: string
  client: string
  year: string
  category: string
  image: string
}

interface ProjectShowcaseProps {
  projects: Project[]
}

export const ProjectShowcase = memo(({ projects }: ProjectShowcaseProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for the floating preview
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Internal parallax shift for the images inside the preview
  // We map the relative movement to a subtle shift
  const internalX = useTransform(x, [0, 1200], ["-4%", "4%"])
  const internalY = useTransform(y, [0, 800], ["-4%", "4%"])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || (url.includes('drive.google.com/file/d/') && url.includes('/preview'));
  };

  // Function to ensure video shows a frame instead of black
  const formatVideoUrl = (url: string) => {
    if (url.includes('drive.google.com')) return url;
    return `${url}#t=0.001`; // Tells browser to jump to first frame
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full">
      {/* Floating Image/Video Preview */}
      <motion.div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl hidden lg:block will-change-transform"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          x: x,
          y: y,
          translateX: 40,
          translateY: -120,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0.3 }
        }}
      >
        <div className="relative w-[320px] h-[200px] bg-white/5 rounded-xl overflow-hidden border border-white/10">
          <motion.div 
            style={{ x: internalX, y: internalY, scale: 1.1 }}
            className="absolute inset-0 w-full h-full"
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="absolute inset-0 w-full h-full transition-all duration-500 ease-out"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 1.1,
                  filter: hoveredIndex === index ? "none" : "blur(10px)",
                }}
              >
                {isVideo(project.image) ? (
                  <div className="w-full h-full relative">
                    {project.image.includes('drive.google.com') ? (
                      <iframe
                        src={project.image.replace('/view', '/preview')}
                        className="w-full h-full scale-[1.5] pointer-events-none"
                        frameBorder="0"
                        allow="autoplay"
                      />
                    ) : (
                      <video
                        src={formatVideoUrl(project.image)}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        autoPlay
                        loop
                      />
                    )}
                  </div>
                ) : (
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.project}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </motion.div>

      <div className="space-y-0 border-t border-white/10">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative py-8 border-b border-white/10 transition-all duration-300 ease-out">
              {/* Background highlight on hover */}
              <div
                className={`
                  absolute inset-0 -mx-4 px-4 bg-white/5 rounded-lg
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}
              />

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-white/30 tabular-nums">
                      {project.year}
                    </span>
                    <div className="inline-flex items-center gap-2">
                      <h3 className="text-white font-display font-bold text-xl md:text-2xl tracking-tight">
                        <span className="relative">
                          {project.project}
                          <span
                            className={`
                              absolute left-0 -bottom-1 h-[2px] bg-premium-gold
                              transition-all duration-300 ease-out
                              ${hoveredIndex === index ? "w-full" : "w-0"}
                            `}
                          />
                        </span>
                      </h3>

                      <ArrowUpRight
                        className={`
                          w-5 h-5 text-premium-gold
                          transition-all duration-300 ease-out
                          ${
                            hoveredIndex === index
                              ? "opacity-100 translate-x-0 translate-y-0"
                              : "opacity-0 -translate-x-2 translate-y-2"
                          }
                        `}
                      />
                    </div>
                  </div>

                  <p className="text-white/40 text-sm mt-2 font-light">
                    {project.client} — <span className="text-premium-gold/60">{project.category}</span>
                  </p>
                </div>

                {/* Mobile Preview (Static) */}
                <div className="lg:hidden w-20 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 relative">
                   {isVideo(project.image) ? (
                     project.image.includes('drive.google.com') ? (
                       <iframe
                         src={project.image.replace('/view', '/preview')}
                         className="w-full h-full scale-[2] pointer-events-none opacity-60"
                         frameBorder="0"
                       />
                     ) : (
                       <video
                         src={formatVideoUrl(project.image)}
                         className="w-full h-full object-cover opacity-60"
                         muted
                         playsInline
                         preload="metadata"
                       />
                     )
                   ) : (
                     <img src={project.image} alt="" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                   )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
})

ProjectShowcase.displayName = "ProjectShowcase"
