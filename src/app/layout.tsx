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
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://apachespark.tech/#organization',
        name: 'APACHE SPARK',
        url: 'https://apachespark.tech',
        logo: 'https://apachespark.tech/brand/svg/apache-spark-lockup-horizontal-ink.svg',
        description:
          'Software, full-stack platforms, and distributed systems, drafted to spec and deployed end to end.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
        founder: [
          {
            '@type': 'Person',
            name: 'Brandanlee Hugos',
            jobTitle: 'Lead Systems Developer & Co-Founder',
          },
          {
            '@type': 'Person',
            name: 'Dante Nicolas',
            jobTitle: 'Core Systems Developer & Performance Specialist',
          },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://apachespark.tech/#service',
        name: 'Apache Spark Systems & Software Engineering',
        url: 'https://apachespark.tech',
        priceRange: '$$$$',
        telephone: '+1 (555) 488-2890',
        email: 'engage@apachespark.tech',
        areaServed: 'Worldwide',
        knowsAbout: [
          'Next.js 15',
          'React 19',
          'TypeScript',
          'Rust',
          'Go',
          'Distributed Systems',
          'Supabase Postgres',
          'SCADA Industrial Ethernet',
          'Optical Networking',
          'Kubernetes',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Engineering Sprint Packages',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Architectural Draft Sprint',
                description: 'Pre-procurement discovery, risk register & complete engineering schematics.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Full Turnkey Implementation',
                description: 'End-to-end turnkey delivery from physical closet to deployment pipeline.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Retained Escalation Pod',
                description: 'Ongoing architectural advisory & Tier-4 operational backing with 15-min SLA.',
              },
            },
          ],
        },
      },
    ],
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
