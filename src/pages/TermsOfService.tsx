import { motion } from 'framer-motion';
import content from '../content.json';

export default function TermsOfService() {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Terms of Service</h1>
        <div className="text-white/70 space-y-6 font-light leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">2. Services Provided</h2>
          <p>
            {content.global.name} provides creative services including but not limited to brand design, video editing, social content creation, and creative strategy. Specific deliverables and timelines will be outlined in individual project proposals or contracts.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">3. Intellectual Property</h2>
          <p>
            Unless otherwise agreed upon in writing, all materials produced, including but not limited to designs, videos, and strategies, remain the intellectual property of {content.global.name} until full payment is received. Upon full payment, usage rights are transferred as specified in the project agreement.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">4. User Responsibilities</h2>
          <p>
            Clients are responsible for providing necessary materials, feedback, and approvals in a timely manner to ensure project deadlines are met. Delays in client communication may result in adjusted project timelines.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">5. Limitation of Liability</h2>
          <p>
            In no event shall {content.global.name} be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
          </p>

          <h2 className="text-2xl font-display font-bold text-white mt-12 mb-4">6. Contact</h2>
          <p>
            For any questions regarding these terms, please contact: <a href={`mailto:${content.global.email}`} className="text-premium-blue hover:underline">{content.global.email}</a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
