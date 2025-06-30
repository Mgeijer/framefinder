import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaceShapeIcon } from '@/components/ui/face-shape-icon';
import { faceShapes } from '@/data/face-shapes';

export const metadata: Metadata = {
  title: 'Complete Face Shape Guide - Perfect Eyewear for Every Face',
  description: 'Comprehensive guide to all 6 face shapes with expert eyewear recommendations. Discover perfect glasses for oval, round, square, heart, diamond, and triangle faces. Professional styling tips from certified opticians.',
  keywords: [
    'face shape guide',
    'glasses for face shape',
    'eyewear style guide',
    'oval face glasses',
    'round face frames',
    'square face eyewear',
    'heart face glasses',
    'diamond face frames',
    'triangle face eyewear',
    'face shape identification',
    'perfect glasses guide',
    'eyewear recommendations',
    'professional frame advice',
    'glasses fitting guide'
  ],
  openGraph: {
    title: 'Complete Face Shape Guide - Perfect Eyewear for Every Face',
    description: 'Comprehensive guide to all 6 face shapes with expert eyewear recommendations from certified opticians.',
    type: 'article',
    url: 'https://framefinder.com/guide',
    images: [
      {
        url: '/images/og/face-shape-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'FrameFinder Complete Face Shape Guide for Perfect Eyewear',
      },
    ],
    siteName: 'FrameFinder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Face Shape Guide - Perfect Eyewear for Every Face',
    description: 'Expert guide to all 6 face shapes with professional eyewear recommendations.',
    images: ['/images/og/face-shape-guide.jpg'],
  },
  alternates: {
    canonical: '/guide',
  },
};

export default function FaceShapeGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://framefinder.com/guide#article',
        headline: 'Complete Face Shape Guide - Perfect Eyewear for Every Face',
        description: 'Comprehensive guide to all 6 face shapes with expert eyewear recommendations from certified opticians',
        image: {
          '@type': 'ImageObject',
          url: '/images/og/face-shape-guide.jpg',
          width: 1200,
          height: 630,
          caption: 'Complete Face Shape Guide'
        },
        author: {
          '@type': 'Organization',
          '@id': 'https://framefinder.com/#organization',
          name: 'FrameFinder'
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://framefinder.com/#organization',
          name: 'FrameFinder'
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString(),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://framefinder.com/guide'
        },
        articleSection: 'Face Shape Guides'
      },
      {
        '@type': 'ItemList',
        '@id': 'https://framefinder.com/guide#faceshapes',
        name: 'Face Shape Types Guide',
        description: 'Complete list of all face shape categories with detailed guides',
        numberOfItems: faceShapes.length,
        itemListElement: faceShapes.map((shape, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Article',
            '@id': `https://framefinder.com/guide/${shape.id}`,
            name: `${shape.displayName} Face Shape Guide`,
            description: shape.description,
            url: `https://framefinder.com/guide/${shape.id}`,
            image: shape.imageUrl,
            author: {
              '@type': 'Organization',
              name: 'FrameFinder'
            }
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
              📚 Complete Style Guide
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Face Shape Guide
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground sm:text-2xl lg:text-xl lg:leading-8">
              Discover your face shape and find the perfect eyewear styles that enhance your natural features. 
              Our comprehensive guide covers all six main face shapes with expert recommendations.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-green-500">✓</span>
                6 Face Shape Types
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-green-500">✓</span>
                Expert Styling Tips
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-green-500">✓</span>
                Celebrity Examples
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-green-500">✓</span>
                Frame Recommendations
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/face-analysis">
                  Analyze My Face Shape
                  <span className="ml-2">→</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="#face-shapes">
                  Browse All Shapes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Face Shapes Grid */}
      <section id="face-shapes" className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              All Face Shape Types
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Click on any face shape to explore detailed guides, frame recommendations, and styling tips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faceShapes.map((shape) => (
              <Card key={shape.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <Link href={`/guide/${shape.id}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center mb-4">
                      <FaceShapeIcon shape={shape.id as any} size={80} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {shape.displayName} Face
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {shape.recommendedFrames.length} styles
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {shape.description.slice(0, 120)}...
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Key Characteristics */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-sm text-muted-foreground">Key Features:</h4>
                      <div className="space-y-1">
                        {shape.characteristics.slice(0, 3).map((char, index) => (
                          <div key={index} className="flex items-center text-xs text-muted-foreground">
                            <span className="text-primary mr-2">•</span>
                            {char}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Celebrity Examples */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-sm text-muted-foreground">Celebrity Examples:</h4>
                      <div className="flex flex-wrap gap-1">
                        {shape.celebrities.slice(0, 2).map((celebrity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {celebrity}
                          </Badge>
                        ))}
                        {shape.celebrities.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{shape.celebrities.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Best Frame Types */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-sm text-muted-foreground">Best Frame Types:</h4>
                      <div className="flex flex-wrap gap-1">
                        {shape.recommendedFrames.slice(0, 3).map((frame, index) => (
                          <Badge key={index} className="text-xs">
                            {frame.category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full mt-4 group-hover:bg-primary/90 transition-colors">
                      View {shape.displayName} Guide
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Universal Frame Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">✅ Do's</CardTitle>
                </CardHeader>
                <CardContent className="text-left">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      Choose frames that complement your natural features
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      Consider your lifestyle and personal style
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      Try different materials and colors
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      Ensure proper fit and comfort
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">❌ Don'ts</CardTitle>
                </CardHeader>
                <CardContent className="text-left">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      Don't choose frames that overwhelm your features
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      Avoid frames that are too small or too large
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      Don't ignore comfort for style
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      Avoid following trends that don't suit you
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/face-analysis">
                  Find Your Perfect Frames Now
                  <span className="ml-2">🔍</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}