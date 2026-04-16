"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

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

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
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
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('drive.google.com/file/d/') && url.includes('/preview');
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full">
      {/* Floating Image/Video Preview */}
      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl hidden lg:block"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 40}px, ${smoothPosition.y - 120}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[320px] h-[200px] bg-white/5 rounded-xl overflow-hidden border border-white/10">
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
                      src={project.image}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>

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
                              absolute left-0 -bottom-1 h-[2px] bg-premium-blue
                              transition-all duration-300 ease-out
                              ${hoveredIndex === index ? "w-full" : "w-0"}
                            `}
                          />
                        </span>
                      </h3>

                      <ArrowUpRight
                        className={`
                          w-5 h-5 text-premium-blue
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
                    {project.client} — <span className="text-premium-blue/60">{project.category}</span>
                  </p>
                </div>

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
                         src={project.image}
                         className="w-full h-full object-cover opacity-60"
                         muted
                         playsInline
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
}
