// path: src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { SiteShell } from '@/components/layout/SiteShell';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-archivo',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  title: 'Apache Spark — Systems, Software, Networks & Infrastructure',
  description:
    'Software, networks and infrastructure, drafted to spec and deployed end to end. One team from the wiring closet to the deployment pipeline.',
  metadataBase: new URL('https://apachespark.tech'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/brand/apache-spark-favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/brand/favicon-192.png', sizes: '192x192' }],
  },
  openGraph: {
    title: 'Apache Spark — Systems, Software, Networks & Infrastructure',
    description:
      'Software, networks and infrastructure, drafted to spec and deployed end to end.',
    url: 'https://apachespark.tech',
    siteName: 'APACHE SPARK',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#F2EFE8',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'APACHE SPARK',
    url: 'https://apachespark.tech',
    logo: 'https://apachespark.tech/brand/svg/apache-spark-lockup-horizontal-ink.svg',
    description:
      'We build the systems your business runs on. Software, networks and infrastructure, drafted to spec and deployed end to end.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  };

  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="bg-[#F2EFE8] text-[#14181C] font-mono antialiased overflow-x-hidden min-h-screen flex flex-col selection:bg-[#14181C] selection:text-[#F2EFE8]">
        <SiteShell modal={modal}>{children}</SiteShell>
      </body>
    </html>
  );
}
