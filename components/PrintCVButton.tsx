'use client';

import { Printer } from 'lucide-react';

export function PrintCVButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs font-semibold uppercase tracking-wider hover:bg-accent hover:text-accent-foreground transition-all focus:outline-none"
      title="Print or save clean PDF version"
    >
      <Printer className="w-3.5 h-3.5" />
      <span>Print / Save Clean PDF</span>
    </button>
  );
}
