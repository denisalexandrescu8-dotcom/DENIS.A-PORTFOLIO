import { 
  Palette, 
  Video, 
  Share2, 
  Layout, 
  Youtube, 
  Zap, 
  Target, 
  MessageSquare 
} from 'lucide-react';

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  impact: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  deliverables: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Brand Evolution for Tech Startup',
    client: 'Nexus AI',
    category: 'Branding & Identity',
    image: 'https://picsum.photos/seed/nexus/1200/800',
    impact: '+45% User Engagement',
    description: 'A complete visual overhaul for a cutting-edge AI platform, focusing on trust and innovation.'
  },
  {
    id: '2',
    title: 'High-Conversion YouTube Assets',
    client: 'Creator Pro',
    category: 'Social Content',
    image: 'https://picsum.photos/seed/youtube/1200/800',
    impact: '+22% CTR Increase',
    description: 'Strategic thumbnail design and motion graphics for a top-tier educational channel.'
  },
  {
    id: '3',
    title: 'Cinematic Product Launch',
    client: 'Luxe Wear',
    category: 'Video Editing',
    image: 'https://picsum.photos/seed/luxe/1200/800',
    impact: '2M+ Organic Views',
    description: 'Dynamic video editing and motion visuals for a premium ecommerce brand launch.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'brand',
    title: 'Brand Design',
    description: 'Strategic visual identities that position your brand as a leader.',
    icon: Palette,
    deliverables: ['Logo Systems', 'Brand Guidelines', 'Visual Language']
  },
  {
    id: 'video',
    title: 'Video Editing',
    description: 'Cinematic storytelling that keeps viewers hooked from start to finish.',
    icon: Video,
    deliverables: ['Short-form Content', 'Commercials', 'Motion Graphics']
  },
  {
    id: 'social',
    title: 'Social Content',
    description: 'Platform-native visuals designed for maximum attention and growth.',
    icon: Share2,
    deliverables: ['YouTube Thumbnails', 'Ad Creatives', 'Social Systems']
  },
  {
    id: 'strategy',
    title: 'Creative Strategy',
    description: 'Consulting that aligns your visual output with business goals.',
    icon: Target,
    deliverables: ['Campaign Direction', 'Content Audits', 'Growth Planning']
  }
];

export const TRUST_BRANDS = [
  'TechFlow', 'Vanguard', 'Lumina', 'Peak Performance', 'Global Creative', 'Nexus AI', 'Luxe Wear'
];
