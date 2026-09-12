import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: Record<string, any>;
}

export default function SEO({
  title = "Denis Alexandrescu | Identidad visual y edición de vídeo",
  description = "Denis Alexandrescu. Diseño gráfico y edición de vídeo.",
  image = "https://lh3.googleusercontent.com/d/1zi-oBDk1WAng22OjJt89mlLCt3odwkEC",
  url = "https://denisalexandrescu.com",
  type = "website",
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to update link canonical
    const updateCanonical = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // 2. Standard Meta
    updateMeta('description', description);
    updateCanonical(url);

    // 3. Open Graph Meta
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', url, true);
    updateMeta('og:type', type, true);
    updateMeta('og:image', image, true);
    updateMeta('og:site_name', 'Denis Alexandrescu', true);
    updateMeta('og:locale', 'es_ES', true);

    // 4. Twitter Card Meta
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // 5. Dynamic JSON-LD Structured Data
    let scriptTag = document.getElementById('dynamic-page-jsonld') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-page-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, image, url, type, jsonLd]);

  return null;
}
