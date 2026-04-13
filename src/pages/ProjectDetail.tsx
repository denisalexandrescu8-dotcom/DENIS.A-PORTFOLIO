import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import content from '../content.json';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = content.archive.projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/archive" replace />;
  }

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <Link to="/archive" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest mb-12">
          <ArrowLeft size={16} />
          Back to Archive
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-premium-blue mb-6">
              <span>{project.year}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{project.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              {project.project}
            </h1>
            <p className="text-xl text-white/60 font-light max-w-2xl">
              {project.description}
            </p>
          </div>

          <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 mb-16 bg-dark-surface">
            <img 
              src={project.image} 
              alt={project.project}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {project.gallery.map((imgSrc, index) => (
                <div key={index} className="w-full rounded-3xl overflow-hidden border border-white/10 bg-dark-surface">
                  <img 
                    src={imgSrc} 
                    alt={`${project.project} gallery image ${index + 1}`}
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Client</div>
              <div className="text-lg font-medium">{project.client}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Role</div>
              <div className="text-lg font-medium">{project.role}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Deliverables</div>
              <ul className="space-y-1">
                {project.deliverables.map((item, i) => (
                  <li key={i} className="text-lg font-medium text-white/80">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
