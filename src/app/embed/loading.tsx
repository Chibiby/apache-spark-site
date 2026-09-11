// path: src/app/embed/loading.tsx
import React from 'react';

export default function EmbedLoading() {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-slate-800 animate-spin" />
        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          Initializing Engine...
        </span>
      </div>
    </div>
  );
}
