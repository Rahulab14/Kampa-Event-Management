import { useState } from "react";
import { Copy, Check, Share2, ExternalLink } from "lucide-react";

interface ShareLinkCardProps {
  title?: string;
}

export function ShareLinkCard({ 
  title = "Kampa - Event Management" 
}: ShareLinkCardProps) {
  const [copied, setCopied] = useState(false);

  // Dynamically gets the current live URL from the browser
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Share2 size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">Copy current live page link</p>
          </div>
        </div>
        
        <a 
          href={currentUrl} 
          target="_blank" 
          rel="noreferrer"
          className="text-slate-400 hover:text-emerald-700 transition-colors"
          title="Open in new tab"
        >
          <ExternalLink size={18} />
        </a>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
        <input 
          type="text" 
          readOnly 
          value={currentUrl} 
          className="w-full bg-transparent px-2 text-sm text-slate-700 focus:outline-none truncate"
        />
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold text-white transition-all ${
            copied 
              ? "bg-green-600 hover:bg-green-700" 
              : "bg-emerald-700 hover:bg-emerald-800"
          }`}
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy URL
            </>
          )}
        </button>
      </div>
    </div>
  );
}