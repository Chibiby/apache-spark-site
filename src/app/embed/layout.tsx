// path: src/app/embed/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apache Spark — Embedded Interactive System Harness',
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-white font-sans antialiased text-slate-900">
      {children}
    </div>
  );
}
