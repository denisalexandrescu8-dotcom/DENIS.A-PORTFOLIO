import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import React, { useMemo, useState } from 'react';

const ProjectCard: React.FC<{ project: any, index: number }> = ({ project, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const moveX = useTransform(springX, [-0.5, 0.5], ["-3%", "3%"]);
  const moveY = useTransform(springY, [-0.5, 0.5], ["-3%", "3%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isVideo = (url: string) => {
    return typeof url === 'string' && (url.match(/\.(mp4|webm|ogg|mov)$/i) || (url.includes('drive.google.com/file/d/') && url.includes('/preview')));
  };

  // Function to ensure video shows a frame instead of black
  const formatVideoUrl = (url: string) => {
    if (url.includes('drive.google.com')) return url;
    return `${url}#t=0.001`; // Tells browser to jump to first frame
  };

  const renderMedia = (url: string, index?: number) => {
    if (isVideo(url)) {
      if (url.includes('drive.google.com')) {
        return (
          <iframe
            src={url.replace('/view', '/preview')}
            className="w-full h-full scale-[1.5] pointer-events-none object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            frameBorder="0"
          />
        );
      }
      return (
        <video
          src={formatVideoUrl(url)}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          muted
          playsInline
          preload="metadata"
        />
      );
    }
    return (
      <img 
        src={url} 
        alt=""
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        referrerPolicy="no-referrer"
      />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`group relative ${index === 0 ? 'lg:col-span-2' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        to={`/project/${project.id}`} 
        className="block relative aspect-[16/9] overflow-hidden rounded-3xl bg-dark-surface border border-white/5 transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(0,112,243,0.1)] group-hover:border-premium-blue/20"
      >
        {/* Zoom layer */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="w-full h-full"
        >
          {/* Parallax layer */}
          <motion.div 
            style={{ x: moveX, y: moveY, scale: 1.1 }}
            className="w-full h-full"
          >
            {project.thumbnailGallery ? (
              <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-1 p-1 bg-white/5">
                {project.thumbnailGallery.slice(0, 4).map((media: string, i: number) => (
                  <div key={i} className="w-full h-full overflow-hidden">
                    {renderMedia(media, i)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full">
                {renderMedia(project.image)}
              </div>
            )}
          </motion.div>
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/60 mb-2 block">
              {project.category} — {project.client}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold">
              {project.title}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function CaseStudies() {
  const { content } = useLanguage();

  // Randomly select 3 projects from the archive to keep the home page fresh
  const featuredProjects = useMemo(() => {
    const allProjects = [...content.archive.projects];
    
    // Simple shuffle
    for (let i = allProjects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allProjects[i], allProjects[j]] = [allProjects[j], allProjects[i]];
    }
    
    return allProjects.slice(0, 3).map(p => ({
      ...p,
      // Map 'project' from archive to 'title' used in home page components
      title: p.project,
      // Use first few images from gallery as thumbnailGallery if not present
      thumbnailGallery: p.gallery ? p.gallery.slice(0, 4) : null
    }));
  }, [content.archive.projects]);

  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              {content.caseStudies.sectionTitle} <span className="text-white/40 italic">{content.caseStudies.sectionTitleHighlight}</span>
            </h2>
            <p className="text-white/60 text-lg font-light">
              {content.caseStudies.sectionSubtitle}
            </p>
          </div>
          <Link to="/archive" className="text-sm font-mono uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all">
            {content.ui.viewArchive} ({content.archive.projects.length}+)
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
