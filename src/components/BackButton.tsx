import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Only show if we're not on the home page
  const isVisible = location.pathname !== '/';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: -20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full bg-white text-black shadow-lg shadow-white/10 flex items-center justify-center group border border-white/10"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
