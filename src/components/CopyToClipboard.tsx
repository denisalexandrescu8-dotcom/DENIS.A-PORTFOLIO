import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CopyToClipboard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { content } = useLanguage();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-800 text-xs hover:bg-gray-700 transition-colors"
      title={content.ui.copy}
    >
      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
      {copied ? content.ui.copied : content.ui.copy}
    </button>
  );
}
