import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { PerformanceMonitor } from '@/components/performance-monitor'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: {
    default: 'FrameFinder - AI-Powered Face Shape Analysis & Perfect Eyeglass Recommendations',
    template: '%s | FrameFinder - Perfect Eyewear for Every Face Shape'
  },
  description: 'Discover your perfect eyeglass frames with our free AI face shape analysis. Get personalized recommendations for all face shapes from certified opticians. Trusted by 50,000+ users worldwide.',
  keywords: [
    'face shape analysis',
    'AI eyeglass finder', 
    'perfect glasses for face shape',
    'frame recommendations',
    'eyewear styling advice',
    'free face analysis tool',
    'professional optician consultation',
    'AI-powered frame selection',
    'oval round square heart diamond triangle face shapes',
    'personalized eyewear recommendations',
    'glasses fitting guide',
    'frame shape calculator'
  ],
  authors: [{ name: 'FrameFinder Expert Team', url: 'https://framefinder.com/about' }],
  creator: 'FrameFinder',
  publisher: 'FrameFinder',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://framefinder.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://framefinder.com',
    title: 'FrameFinder - AI-Powered Face Shape Analysis & Perfect Eyeglass Recommendations',
    description: 'Free AI-powered face shape analysis with personalized eyeglass recommendations. Professional styling advice from certified opticians.',
    siteName: 'FrameFinder',
    images: [
      {
        url: '/images/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'FrameFinder - AI Face Shape Analysis for Perfect Eyewear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@framefinder',
    creator: '@framefinder',
    title: 'FrameFinder - AI-Powered Face Shape Analysis',
    description: 'Free AI face shape analysis with personalized eyeglass recommendations from certified opticians.',
    images: ['/images/og/default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'framefinder-google-site-verification-placeholder',
    yandex: 'framefinder-yandex-verification-placeholder',
    yahoo: 'framefinder-yahoo-verification-placeholder',
  },
  category: 'technology',
  classification: 'AI face analysis and eyewear recommendation platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://framefinder.com/#website",
        "url": "https://framefinder.com/",
        "name": "FrameFinder",
        "description": "AI-powered face shape analysis and personalized eyeglass recommendations",
        "publisher": {
          "@id": "https://framefinder.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://framefinder.com/guide?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://framefinder.com/#organization",
        "name": "FrameFinder",
        "url": "https://framefinder.com/",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "url": "https://framefinder.com/images/logo.png",
          "contentUrl": "https://framefinder.com/images/logo.png",
          "width": 512,
          "height": 512,
          "caption": "FrameFinder"
        },
        "image": {
          "@id": "https://framefinder.com/images/logo.png"
        },
        "description": "AI-powered face shape analysis and personalized eyeglass recommendations platform",
        "foundingDate": "2024",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "email": "hello@framefinder.com",
            "contactType": "customer service",
            "areaServed": "Worldwide",
            "availableLanguage": "en"
          }
        ],
        "sameAs": [
          "https://twitter.com/framefinder",
          "https://instagram.com/framefinder"
        ]
      },
      {
        "@type": "WebApplication",
        "name": "FrameFinder AI Face Analysis",
        "url": "https://framefinder.com/face-analysis",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "description": "Free AI-powered face shape analysis tool for personalized eyeglass recommendations",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "AI face shape detection",
          "Personalized frame recommendations", 
          "Expert styling advice",
          "6 face shape categories",
          "Instant results"
        ]
      }
    ]
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="sitemap" href="/sitemap.xml" />
        <link rel="canonical" href="https://framefinder.com" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://plus.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.tailwindcss.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Critical CSS preload */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        
        {/* Meta tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={cn(
        outfit.className,
        "min-h-full bg-background text-foreground font-sans antialiased"
      )}>
          <div className="relative flex min-h-screen flex-col">
            {/* Debugging indicator - will be visible when new styles load */}
            <div className="hidden bg-primary text-primary-foreground p-1 text-xs text-center" style={{display: 'block'}}>
              ✅ New Styling Loaded (Build: 46ceec3) - Debug Mode
            </div>
            <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="container flex h-16 items-center">
              <div className="mr-4 flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <div className="h-6 w-6 bg-primary rounded" />
                  <span className="font-bold text-foreground">FrameFinder</span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <a href="/guide" className="text-foreground/60 hover:text-foreground transition-colors">
                    Face Shape Guide
                  </a>
                  <a href="/style-tips" className="text-foreground/60 hover:text-foreground transition-colors">
                    Style Tips
                  </a>
                  <a href="/about" className="text-foreground/60 hover:text-foreground transition-colors">
                    About
                  </a>
                </nav>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <div className="w-full flex-1 md:w-auto md:flex-none">
                  {/* Search will be added here if needed */}
                </div>
                <nav className="flex items-center space-x-2">
                  <a 
                    href="/face-analysis" 
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Analyze My Face
                  </a>
                </nav>
              </div>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <div className="h-6 w-6 bg-primary rounded" />
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built with ❤️ for better eyewear choices. © 2024 FrameFinder.
                </p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <a href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </a>
                <a href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </div>

        {/* Performance Monitoring */}
        <PerformanceMonitor />

        {/* Browser Compatibility Check */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Browser compatibility check - inline for immediate execution
              (function() {
                // Check for critical features immediately
                const hasWebGL = (function() {
                  try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGLRenderingContext && 
                             (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
                  } catch (e) {
                    return false;
                  }
                })();

                const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
                const hasAsyncAwait = (function() {
                  try {
                    eval('(async () => {})');
                    return true;
                  } catch (e) {
                    return false;
                  }
                })();

                // Show critical warning if essential features missing
                if (!hasWebGL || !hasAsyncAwait) {
                  const missing = [];
                  if (!hasWebGL) missing.push('WebGL (required for AI face detection)');
                  if (!hasAsyncAwait) missing.push('Modern JavaScript support');
                  
                  const warning = document.createElement('div');
                  warning.innerHTML = '<div style="position:fixed;top:0;left:0;right:0;background:#ef4444;color:white;padding:12px;text-align:center;z-index:9999;font-family:system-ui;font-size:14px;"><strong>⚠️ Browser Compatibility Issue:</strong> Missing ' + missing.join(', ') + '. Please use a modern browser for the best experience.</div>';
                  document.body.insertBefore(warning, document.body.firstChild);
                }
              })();
            `
          }}
        />

        {/* Analytics Scripts - Load asynchronously for better Core Web Vitals */}
        <script 
          async
          defer
          dangerouslySetInnerHTML={{
            __html: `
              // PostHog Analytics - Non-blocking initialization with error handling
              (function() {
                try {
                  const posthogKey = '${process.env.NEXT_PUBLIC_POSTHOG_KEY || ''}';
                  if (!posthogKey || posthogKey === 'ph-key-placeholder') {
                    console.log('FrameFinder - Analytics disabled (no key provided)');
                    return;
                  }

                  const script = document.createElement('script');
                  script.src = 'https://app.posthog.com/static/array.js';
                  script.async = true;
                  script.onload = function() {
                    try {
                      if (typeof posthog !== 'undefined') {
                        posthog.init(posthogKey, {
                          api_host: '${process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'}',
                          person_profiles: 'identified_only',
                          capture_pageview: false,
                          capture_pageleave: true,
                          disable_session_recording: false,
                          cross_subdomain_cookie: false,
                          secure_cookie: true,
                          loaded: function(posthog) {
                            try {
                              posthog.capture('$pageview');
                            } catch (e) {
                              console.log('FrameFinder - Analytics pageview capture failed:', e);
                            }
                          }
                        });
                      }
                    } catch (e) {
                      console.log('FrameFinder - Analytics initialization failed:', e);
                    }
                  };
                  script.onerror = function() {
                    console.log('FrameFinder - Analytics script failed to load');
                  };
                  document.head.appendChild(script);
                } catch (e) {
                  console.log('FrameFinder - Analytics setup failed:', e);
                }
              })();
              
              // Performance observer for Core Web Vitals
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                      console.log('CLS:', entry.value);
                    }
                  }
                });
                observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
              }
              
              // Responsive design monitoring in development
              if (${process.env.NODE_ENV === 'development' ? 'true' : 'false'}) {
                setTimeout(() => {
                  // Basic responsive validation
                  const checkHorizontalScroll = () => {
                    const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;
                    if (hasHorizontalScroll) {
                      console.warn('⚠️ Horizontal scrolling detected at', window.innerWidth + 'px viewport');
                    }
                  };
                  
                  const checkTouchTargets = () => {
                    const buttons = document.querySelectorAll('button, a[href], input, [role="button"]');
                    let smallTargets = 0;
                    buttons.forEach(button => {
                      const rect = button.getBoundingClientRect();
                      if (rect.width < 44 || rect.height < 44) {
                        smallTargets++;
                      }
                    });
                    if (smallTargets > 0) {
                      console.warn('⚠️ Found', smallTargets, 'touch targets smaller than 44px');
                    }
                  };
                  
                  checkHorizontalScroll();
                  checkTouchTargets();
                  
                  window.addEventListener('resize', checkHorizontalScroll);
                }, 2000);
              }
            `
          }}
        />
      </body>
    </html>
  )
}