import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Face Shape Analysis - Free Face Shape Detection Tool',
  description: 'Upload your photo for instant AI-powered face shape analysis. Get your face shape (oval, round, square, heart, diamond, triangle) with personalized eyeglass frame recommendations. Free and secure.',
  keywords: [
    'face shape analysis tool',
    'AI face detection',
    'face shape calculator',
    'upload photo face analysis',
    'free face shape test',
    'instant face shape results',
    'AI-powered face analysis',
    'facial feature analysis',
    'face shape detection AI',
    'personalized frame finder',
    'eyeglass recommendation tool',
    'face shape upload'
  ],
  openGraph: {
    title: 'AI Face Shape Analysis - Upload Photo for Instant Results',
    description: 'Free AI-powered face shape analysis. Upload your photo and get instant results with personalized eyeglass recommendations.',
    type: 'website',
    url: 'https://framefinder.com/face-analysis',
    images: [
      {
        url: '/images/og/face-analysis.jpg',
        width: 1200,
        height: 630,
        alt: 'FrameFinder AI Face Shape Analysis Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Face Shape Analysis - Upload Photo for Instant Results',
    description: 'Free AI-powered face shape analysis with personalized eyeglass recommendations.',
    images: ['/images/og/face-analysis.jpg'],
  },
  alternates: {
    canonical: '/face-analysis',
  },
}

export default function FaceAnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FrameFinder AI Face Shape Analysis",
    "url": "https://framefinder.com/face-analysis",
    "description": "Free AI-powered face shape analysis tool that determines your face shape and provides personalized eyeglass recommendations",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "AI face shape detection",
      "Instant photo analysis",
      "6 face shape categories",
      "Personalized frame recommendations",
      "Privacy-focused processing",
      "No photo storage"
    ],
    "creator": {
      "@type": "Organization",
      "name": "FrameFinder",
      "url": "https://framefinder.com"
    },
    "dateCreated": "2024-01-01",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "potentialAction": {
      "@type": "UseAction",
      "target": "https://framefinder.com/face-analysis",
      "name": "Analyze Face Shape"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  )
}