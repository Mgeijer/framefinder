import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
            {[
              { name: 'Oval', description: 'Balanced proportions', emoji: '😊' },
              { name: 'Round', description: 'Soft curves', emoji: '😄' },
              { name: 'Square', description: 'Strong jawline', emoji: '😎' },
              { name: 'Heart', description: 'Wide forehead', emoji: '💕' },
              { name: 'Diamond', description: 'High cheekbones', emoji: '💎' },
              { name: 'Triangle', description: 'Wide jaw', emoji: '📐' },
            ].map((shape) => (
              <Card key={shape.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">{shape.emoji}</div>
                  <h3 className="font-semibold text-foreground">{shape.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{shape.description}</p>
                </CardContent>
              </Card>
            ))}
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
    </div>
  )
}