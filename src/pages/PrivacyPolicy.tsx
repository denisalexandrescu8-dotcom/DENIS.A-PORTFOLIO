import { motion } from 'framer-motion';
import content from '../content.json';

export default function PrivacyPolicy() {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Privacy Policy</h1>
        <div className="text-white/70 space-y-6 font-light leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you fill out a contact form, request a quote, or communicate with us via email. This may include your name, email address, company name, and project details.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to respond to your inquiries, provide the services you request, send you technical notices and support messages, and communicate with you about products, services, and events.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">3. Information Sharing</h2>
          <p>
            We do not share, sell, or rent your personal information to third parties for their marketing purposes. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">4. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: <a href={`mailto:${content.global.email}`} className="text-premium-blue hover:underline">{content.global.email}</a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
