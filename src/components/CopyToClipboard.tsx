import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyToClipboard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-800 text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      title="Copiar al portapapeles"
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  );
}
