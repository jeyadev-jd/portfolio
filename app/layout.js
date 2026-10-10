import { Geist, Geist_Mono, Baloo_2, Dancing_Script } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import { SITE_URL } from '@/lib/siteConfig';
import { Analytics } from "@vercel/analytics/next";
import profile from "@/data/profile.json";
import { projects } from '@/lib/projects';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const fullName = profile.name.full;
const titleLine = `${fullName} | ${profile.roles.short}`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: titleLine,
    template: `%s | ${fullName}`,
  },
  description: profile.description,
  keywords: [
    fullName,
    profile.roles.short,
    'Software Engineer',
    ...profile.skills,
    'Portfolio',
    'India',
  ],
  authors: [{ name: fullName, url: SITE_URL }],
  creator: fullName,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: fullName,
    title: titleLine,
    description: profile.description,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: `${fullName}, ${profile.roles.short} from ${profile.location.based}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: titleLine,
    description: profile.description,
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png' },
      { url: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicons/manifest.webmanifest',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: fullName,
      description: profile.description,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: titleLine,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
      primaryImageOfPage: { '@id': `${SITE_URL}/#photo` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: fullName,
      url: SITE_URL,
      image: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#photo`,
        url: `${SITE_URL}/jeyadev-r.jpg`,
        contentUrl: `${SITE_URL}/jeyadev-r.jpg`,
        width: 800,
        height: 800,
        caption: `${fullName}, ${profile.roles.short}`,
      },
      email: profile.email,
      jobTitle: profile.roles.short,
      description: profile.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chennai',
        addressCountry: 'IN',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: profile.education.institution,
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: profile.education.degree,
      },
      knowsAbout: profile.skills,
      sameAs: [
        'https://github.com/jeyadev-jd',
        'https://www.instagram.com/jeyadev_r',
        'https://www.linkedin.com/in/r-jeyadev',
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#projects`,
      name: `Projects by ${fullName}`,
      numberOfItems: projects.length,
      itemListElement: projects.map((proj, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: proj.title,
          alternativeHeadline: proj.subtitle,
          description: proj.desc,
          url: `${SITE_URL}/projects/${proj.slug}`,
          sameAs: proj.link,
          image: `${SITE_URL}${proj.image}`,
          keywords: proj.tech.join(', '),
          author: { '@id': `${SITE_URL}/#person` },
        },
      })),
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} ${dancing.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} ${dancing.variable} h-full antialiased`}>
        <Cursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
