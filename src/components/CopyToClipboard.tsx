import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CopyToClipboard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();

  const copyLabel = language === 'es' ? 'Copiar' : 'Copy';
  const copiedLabel = language === 'es' ? 'Copiado' : 'Copied';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/40 hover:bg-white/10 hover:text-white/60 transition-colors border border-white/5 w-fit whitespace-nowrap"
      title={copyLabel}
    >
      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}
