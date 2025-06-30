import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FAQItem } from '@/components/ui/collapsible-faq'
import { Camera, Sparkles, Users, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FrameFinder - AI-Powered Face Shape Analysis & Perfect Eyeglass Recommendations',
  description: 'Discover your perfect eyeglass frames with our free AI face shape analysis. Get personalized recommendations for oval, round, square, heart, diamond, and triangle face shapes. Professional styling advice from certified opticians.',
  keywords: [
    'face shape analysis',
    'AI eyeglass finder',
    'perfect glasses for face shape',
    'frame recommendations',
    'eyewear styling',
    'free face analysis',
    'oval face glasses',
    'round face frames',
    'square face eyewear',
    'heart face glasses',
    'diamond face frames',
    'triangle face eyewear',
    'professional eyewear consultation',
    'AI-powered frame selection'
  ],
  openGraph: {
    title: 'Find Your Perfect Eyeglass Style with AI Face Shape Analysis',
    description: 'Free AI-powered face shape analysis with personalized eyeglass recommendations. Trusted by 50,000+ users to find their perfect frames.',
    type: 'website',
    url: 'https://framefinder.com',
    images: [
      {
        url: '/images/og/homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'FrameFinder AI Face Shape Analysis - Find Perfect Glasses',
      },
    ],
    siteName: 'FrameFinder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Your Perfect Eyeglass Style with AI',
    description: 'Free AI face shape analysis with personalized eyeglass recommendations. Get expert styling advice in seconds.',
    images: ['/images/og/homepage.jpg'],
    creator: '@framefinder',
  },
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="home" className="px-4 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
              ✨ AI-Powered Face Analysis
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Find Your Perfect{' '}
              <span className="text-primary">
                Eyeglass Style
              </span>{' '}
              in Seconds
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground sm:text-2xl lg:text-xl lg:leading-8">
              Discover which frame shapes complement your unique face shape with our 
              AI-powered face analysis tool. Get personalized recommendations from eyewear experts.
            </p>

            {/* Key Benefits */}
            <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">✓</span>
                Instant face shape detection using advanced AI
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">✓</span>
                Personalized frame style recommendations
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">✓</span>
                Expert styling tips for your unique features
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">✓</span>
                Completely free - no glasses purchase required
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
                <Link href="/face-analysis">
                  📷 Analyze My Face Shape
                  <span className="ml-2">→</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
                <Link href="/guide">
                  Browse Style Guide
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 text-sm text-muted-foreground">
              <p className="mb-2">Trusted by 50,000+ people to find their perfect frames</p>
              <div className="flex justify-center gap-4">
                <span>🔒 Secure & Private</span>
                <span>⚡ Instant Results</span>
                <span>🎯 Expert Recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 bg-muted/50">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our AI-powered system analyzes your facial features and provides personalized recommendations in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center bg-card border-border">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent border border-border mb-4">
                  <span className="text-2xl">📷</span>
                </div>
                <CardTitle>1. Upload or Capture</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Take a photo with your camera or upload an existing image. Our system works with any clear front-facing photo.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent border border-border mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle>2. AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Our advanced AI analyzes your facial landmarks and determines your face shape with reliable accuracy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent border border-border mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <CardTitle>3. Get Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Receive personalized frame recommendations, styling tips, and expert advice tailored to your unique features.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Face Shapes Preview */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Discover Your Face Shape
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our system recognizes six main face shapes and provides specific recommendations for each.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {/* Oval Face Shape */}
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="mb-2">
                  <svg width="60" height="60" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <defs>
                      <radialGradient id="oval-shading" cx="0.3" cy="0.3">
                        <stop offset="0%" stopColor="#f8f8f8"/>
                        <stop offset="70%" stopColor="#e8e8e8"/>
                        <stop offset="100%" stopColor="#d0d0d0"/>
                      </radialGradient>
                    </defs>
                    <path d="M100 20 C130 20, 150 50, 150 100 C150 150, 130 200, 100 220 C70 200, 50 150, 50 100 C50 50, 70 20, 100 20 Z" 
                          fill="url(#oval-shading)" stroke="#333" strokeWidth="1.2"/>
                    <ellipse cx="80" cy="85" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <ellipse cx="120" cy="85" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <circle cx="80" cy="85" r="3" fill="#4a4a4a"/>
                    <circle cx="120" cy="85" r="3" fill="#4a4a4a"/>
                    <path d="M90 150 Q100 160, 110 150" fill="none" stroke="#333" strokeWidth="1.2"/>
                    <path d="M70 75 Q80 70, 90 75" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <path d="M110 75 Q120 70, 130 75" fill="none" stroke="#333" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Oval</h3>
                <p className="text-sm text-muted-foreground mt-1">Balanced proportions</p>
              </CardContent>
            </Card>

            {/* Round Face Shape */}
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="mb-2">
                  <svg width="60" height="60" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <defs>
                      <radialGradient id="round-shading" cx="0.3" cy="0.3">
                        <stop offset="0%" stopColor="#f8f8f8"/>
                        <stop offset="70%" stopColor="#e8e8e8"/>
                        <stop offset="100%" stopColor="#d0d0d0"/>
                      </radialGradient>
                    </defs>
                    <circle cx="100" cy="120" r="60" fill="url(#round-shading)" stroke="#333" strokeWidth="1.2"/>
                    <ellipse cx="55" cy="125" rx="10" ry="15" fill="#e0e0e0" opacity="0.4"/>
                    <ellipse cx="145" cy="125" rx="10" ry="15" fill="#e0e0e0" opacity="0.4"/>
                    <ellipse cx="80" cy="105" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <ellipse cx="120" cy="105" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <circle cx="80" cy="105" r="3" fill="#4a4a4a"/>
                    <circle cx="120" cy="105" r="3" fill="#4a4a4a"/>
                    <path d="M90 165 Q100 175, 110 165" fill="none" stroke="#333" strokeWidth="1.2"/>
                    <path d="M70 95 Q80 90, 90 95" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <path d="M110 95 Q120 90, 130 95" fill="none" stroke="#333" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Round</h3>
                <p className="text-sm text-muted-foreground mt-1">Soft curves</p>
              </CardContent>
            </Card>

            {/* Square Face Shape */}
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="mb-2">
                  <svg width="60" height="60" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <defs>
                      <radialGradient id="square-shading" cx="0.3" cy="0.3">
                        <stop offset="0%" stopColor="#f8f8f8"/>
                        <stop offset="70%" stopColor="#e8e8e8"/>
                        <stop offset="100%" stopColor="#d0d0d0"/>
                      </radialGradient>
                    </defs>
                    <path d="M55 40 L145 40 L150 50 L155 100 L155 170 L150 190 L100 205 L50 190 L45 170 L45 100 L50 50 Z" 
                          fill="url(#square-shading)" stroke="#333" strokeWidth="1.2"/>
                    <path d="M50 170 Q100 190, 150 170" fill="#d8d8d8" stroke="#bbb" strokeWidth="0.8"/>
                    <ellipse cx="80" cy="90" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <ellipse cx="120" cy="90" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <circle cx="80" cy="90" r="3" fill="#4a4a4a"/>
                    <circle cx="120" cy="90" r="3" fill="#4a4a4a"/>
                    <path d="M90 155 Q100 165, 110 155" fill="none" stroke="#333" strokeWidth="1.2"/>
                    <path d="M70 80 Q80 75, 90 80" fill="none" stroke="#333" strokeWidth="1.8"/>
                    <path d="M110 80 Q120 75, 130 80" fill="none" stroke="#333" strokeWidth="1.8"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Square</h3>
                <p className="text-sm text-muted-foreground mt-1">Strong jawline</p>
              </CardContent>
            </Card>

            {/* Heart Face Shape */}
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="mb-2">
                  <svg width="60" height="60" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <defs>
                      <radialGradient id="heart-shading" cx="0.3" cy="0.3">
                        <stop offset="0%" stopColor="#f8f8f8"/>
                        <stop offset="70%" stopColor="#e8e8e8"/>
                        <stop offset="100%" stopColor="#d0d0d0"/>
                      </radialGradient>
                    </defs>
                    <path d="M100 20 C135 20, 160 40, 160 75 C160 95, 155 115, 145 135 C135 155, 125 175, 100 205 C75 175, 65 155, 55 135 C45 115, 40 95, 40 75 C40 40, 65 20, 100 20 Z" 
                          fill="url(#heart-shading)" stroke="#333" strokeWidth="1.2"/>
                    <path d="M45 60 Q100 50, 155 60" fill="none" stroke="#ddd" strokeWidth="0.8" opacity="0.6"/>
                    <ellipse cx="80" cy="75" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <ellipse cx="120" cy="75" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <circle cx="80" cy="75" r="3" fill="#4a4a4a"/>
                    <circle cx="120" cy="75" r="3" fill="#4a4a4a"/>
                    <path d="M92 140 Q100 150, 108 140" fill="none" stroke="#333" strokeWidth="1.2"/>
                    <path d="M70 65 Q80 60, 90 65" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <path d="M110 65 Q120 60, 130 65" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <path d="M85 180 Q100 200, 115 180" fill="none" stroke="#aaa" strokeWidth="1" opacity="0.8"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Heart</h3>
                <p className="text-sm text-muted-foreground mt-1">Wide forehead</p>
              </CardContent>
            </Card>

            {/* Diamond Face Shape */}
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="mb-2">
                  <svg width="60" height="60" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <defs>
                      <radialGradient id="diamond-shading" cx="0.3" cy="0.3">
                        <stop offset="0%" stopColor="#f8f8f8"/>
                        <stop offset="70%" stopColor="#e8e8e8"/>
                        <stop offset="100%" stopColor="#d0d0d0"/>
                      </radialGradient>
                    </defs>
                    <path d="M100 25 C118 25, 130 35, 135 50 C145 70, 155 90, 155 110 C155 130, 145 150, 135 170 C130 185, 118 195, 100 205 C82 195, 70 185, 65 170 C55 150, 45 130, 45 110 C45 90, 55 70, 65 50 C70 35, 82 25, 100 25 Z" 
                          fill="url(#diamond-shading)" stroke="#333" strokeWidth="1.2"/>
                    <ellipse cx="40" cy="110" rx="6" ry="12" fill="#d8d8d8" opacity="0.6"/>
                    <ellipse cx="160" cy="110" rx="6" ry="12" fill="#d8d8d8" opacity="0.6"/>
                    <ellipse cx="80" cy="85" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <ellipse cx="120" cy="85" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <circle cx="80" cy="85" r="3" fill="#4a4a4a"/>
                    <circle cx="120" cy="85" r="3" fill="#4a4a4a"/>
                    <path d="M92 150 Q100 160, 108 150" fill="none" stroke="#333" strokeWidth="1.2"/>
                    <path d="M72 75 Q80 70, 88 75" fill="none" stroke="#333" strokeWidth="1.5"/>
                    <path d="M112 75 Q120 70, 128 75" fill="none" stroke="#333" strokeWidth="1.5"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Diamond</h3>
                <p className="text-sm text-muted-foreground mt-1">High cheekbones</p>
              </CardContent>
            </Card>

            {/* Triangle Face Shape */}
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="mb-2">
                  <svg width="60" height="60" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <defs>
                      <radialGradient id="triangle-shading" cx="0.3" cy="0.3">
                        <stop offset="0%" stopColor="#f8f8f8"/>
                        <stop offset="70%" stopColor="#e8e8e8"/>
                        <stop offset="100%" stopColor="#d0d0d0"/>
                      </radialGradient>
                    </defs>
                    <path d="M100 30 C112 30, 122 35, 127 45 C132 55, 137 70, 142 90 C147 110, 152 130, 157 150 C162 170, 155 185, 140 195 C125 205, 100 215, 100 215 C100 215, 75 205, 60 195 C45 185, 38 170, 43 150 C48 130, 53 110, 58 90 C63 70, 68 55, 73 45 C78 35, 88 30, 100 30 Z" 
                          fill="url(#triangle-shading)" stroke="#333" strokeWidth="1.2"/>
                    <path d="M40 175 Q100 195, 160 175" fill="#d0d0d0" stroke="#aaa" strokeWidth="1"/>
                    <ellipse cx="85" cy="75" rx="7" ry="4" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <ellipse cx="115" cy="75" rx="7" ry="4" fill="white" stroke="#333" strokeWidth="0.8"/>
                    <circle cx="85" cy="75" r="2.5" fill="#4a4a4a"/>
                    <circle cx="115" cy="75" r="2.5" fill="#4a4a4a"/>
                    <path d="M88 140 Q100 150, 112 140" fill="none" stroke="#333" strokeWidth="1.2"/>
                    <path d="M78 65 Q85 62, 92 65" fill="none" stroke="#333" strokeWidth="1.3"/>
                    <path d="M108 65 Q115 62, 122 65" fill="none" stroke="#333" strokeWidth="1.3"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground">Triangle</h3>
                <p className="text-sm text-muted-foreground mt-1">Wide jaw</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/guide">
                Learn More About Face Shapes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Expert Style Tips Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Expert Style Tips
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional advice for choosing frames that enhance your natural features and personal style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-3">Color Matching</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Learn how to choose frame colors that complement your skin tone, hair color, and personal style.
                </p>
                <ul className="text-xs text-muted-foreground text-left space-y-1">
                  <li>• Warm skin tones: gold, brown, amber frames</li>
                  <li>• Cool skin tones: silver, black, blue frames</li>
                  <li>• Consider hair and eye color coordination</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-3">Professional Style</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Choose eyewear that enhances your professional image and workplace confidence.
                </p>
                <ul className="text-xs text-muted-foreground text-left space-y-1">
                  <li>• Classic rectangular frames for authority</li>
                  <li>• Neutral colors for versatility</li>
                  <li>• Quality materials show attention to detail</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold mb-3">Frame Materials</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Understand different frame materials and their benefits for comfort and durability.
                </p>
                <ul className="text-xs text-muted-foreground text-left space-y-1">
                  <li>• Acetate: rich colors and patterns</li>
                  <li>• Metal: lightweight and adjustable</li>
                  <li>• Titanium: premium strength and comfort</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-3">Feature Enhancement</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Learn how to use eyewear to highlight your best facial features and create visual balance.
                </p>
                <ul className="text-xs text-muted-foreground text-left space-y-1">
                  <li>• Cat-eye frames lift the eye area</li>
                  <li>• Bold frames make eyes appear larger</li>
                  <li>• Color accents highlight eye color</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-semibold mb-3">Seasonal Trends</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stay current with the latest eyewear trends while maintaining styles that suit your face shape.
                </p>
                <ul className="text-xs text-muted-foreground text-left space-y-1">
                  <li>• Spring: light colors and clear acetates</li>
                  <li>• Summer: vibrant colors and gradients</li>
                  <li>• Fall/Winter: rich tones and metallics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🧽</div>
                <h3 className="text-xl font-semibold mb-3">Care & Maintenance</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Keep your eyewear looking great with proper care techniques and maintenance tips.
                </p>
                <ul className="text-xs text-muted-foreground text-left space-y-1">
                  <li>• Clean lenses with microfiber cloth daily</li>
                  <li>• Store in protective case when not worn</li>
                  <li>• Professional adjustments when needed</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
              <Link href="/face-analysis">
                📷 Apply These Tips to My Face
                <span className="ml-2">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 bg-muted/50">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get answers to common questions about face shape analysis and eyewear selection.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              <FAQItem
                question="How accurate is the AI face shape analysis?"
                answer="Our AI face shape analysis uses advanced machine learning algorithms trained on diverse facial data to provide reliable face shape classification. The system analyzes key facial landmarks and proportions to determine your face shape. We recommend using the results as a professional starting point and considering your personal preferences."
              />

              <FAQItem
                question="What type of photos work best for analysis?"
                answer="For the most accurate results, use a clear, front-facing photo with good lighting where your entire face is visible. Avoid photos with shadows, tilted angles, or obstructions like hats or hair covering your face. The ideal photo shows your face straight-on, with your hair pulled back, in natural lighting."
              />

              <FAQItem
                question="Do I need expensive frames to look good?"
                answer="Absolutely not! Great style is about choosing the right shape and fit for your face, not the price tag. A well-fitting, properly sized frame in the right shape for your face will always look better than an expensive frame that doesn't suit your features. Focus on shape, fit, and personal style rather than price."
              />

              <FAQItem
                question="How do I choose the right frame color?"
                answer="Frame color should complement your skin tone, hair color, and personal style. Warm skin tones (yellow/golden undertones) look great in browns, golds, and warm colors. Cool skin tones (pink/blue undertones) are enhanced by blacks, silvers, and cool colors. Neutral skin tones can wear most colors."
              />

              <FAQItem
                question="Is my photo data secure and private?"
                answer="Absolutely. We take privacy seriously. Photos are processed securely and are not stored permanently on our servers. The AI analysis happens in real-time, and images are automatically deleted after processing. We do not share, sell, or use your photos for any purpose other than providing your face shape analysis."
              />

              <FAQItem
                question="Should I have different frames for work and personal use?"
                answer="Many people benefit from having multiple pairs of glasses for different occasions. Consider a more conservative pair for professional settings (classic shapes, neutral colors) and a more expressive pair for personal time. This allows you to maintain appropriate professional appearance while expressing personality in casual settings."
              />
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                <Link href="/face-analysis">
                  Get My Personal Recommendations
                  <span className="ml-2">📸</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About FrameFinder Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              About FrameFinder
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  At FrameFinder, we believe that the perfect pair of glasses can transform not just how you see, 
                  but how you feel about yourself. Our mission is to democratize access to professional eyewear 
                  consulting through innovative AI technology.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We combine cutting-edge AI with expert styling knowledge to help everyone find frames that 
                  enhance their natural beauty and personal style, regardless of location or budget.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-primary mb-2">🎯</div>
                    <div className="text-muted-foreground text-sm">Precision Analysis</div>
                  </CardContent>
                </Card>
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-primary mb-2">🤖</div>
                    <div className="text-muted-foreground text-sm">Advanced AI</div>
                  </CardContent>
                </Card>
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-primary mb-2">👓</div>
                    <div className="text-muted-foreground text-sm">Curated Styles</div>
                  </CardContent>
                </Card>
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-primary mb-2">⚡</div>
                    <div className="text-muted-foreground text-sm">Instant Results</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold mb-3">Advanced AI</h3>
                <p className="text-muted-foreground text-sm">
                  Our machine learning algorithms analyze multiple facial landmarks to determine face shape with reliable accuracy.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">👁️</div>
                <h3 className="text-xl font-semibold mb-3">Computer Vision</h3>
                <p className="text-muted-foreground text-sm">
                  Cutting-edge image processing technology that works with any clear photo, providing consistent results across devices.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-3">Style Intelligence</h3>
                <p className="text-muted-foreground text-sm">
                  Expert-curated recommendations based on proven styling principles and current fashion trends.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                <Link href="/face-analysis">
                  Experience Our Technology
                  <span className="ml-2">🚀</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}