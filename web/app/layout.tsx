import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import Script from 'next/script'

import './globals.css'
import { Header } from './sections/header'
import { Footer } from './sections/footer'

export const metadata: Metadata = {
  title: {
    default: 'The Simpsons API - Free API for Simpsons Data',
    template: '%s | The Simpsons API'
  },
  description:
    'Free API providing comprehensive data about The Simpsons characters, episodes, locations, and quotes. Perfect for developers building Simpsons-themed applications.',
  keywords: [
    'The Simpsons API',
    'Simpsons API',
    'Simpsons characters API',
    'Simpsons episodes API',
    'free API',
    'RESTful API',
    'JSON API',
    'Simpsons data',
    'Homer Simpson',
    'Bart Simpson',
    'developer tools',
    'web development'
  ],
  authors: [{ name: 'The Simpsons API Team' }],
  creator: 'The Simpsons API',
  publisher: 'The Simpsons API',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://thesimpsonsapi.com'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'The Simpsons API - Free API for Simpsons Data',
    description:
      'Free API providing comprehensive data about The Simpsons characters, episodes, locations, and quotes. Perfect for developers building Simpsons-themed applications.',
    url: 'https://thesimpsonsapi.com',
    siteName: 'The Simpsons API',
    images: [
      {
        url: '/hero.webp',
        width: 1200,
        height: 630,
        alt: 'The Simpsons API - Free API for Simpsons Data'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Simpsons API - Free API for Simpsons Data',
    description:
      'Free API providing comprehensive data about The Simpsons characters, episodes, locations, and quotes.',
    images: ['/hero.webp'],
    creator: '@thesimpsonsapi',
    site: '@thesimpsonsapi'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: '/icon/icon.webp',
    apple: '/icon/apple-icon.webp'
  },
  // manifest: '/manifest.json',
  category: 'technology',
  classification: 'API Documentation'
}

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${ubuntu.className} divide-y`}>
        <Header />
        {children}
        <Footer />
      </body>
      <Script src='https://cloud.umami.is/script.js' data-website-id='a8de3e62-e698-4ac0-84ab-fad69aaeb376' defer />
    </html>
  )
}
