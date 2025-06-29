import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { faceShapes, getFaceShapeById } from '@/data/face-shapes';

type Props = {
  params: Promise<{ shape: string }>;
};

export async function generateStaticParams() {
  return faceShapes.map((shape) => ({
    shape: shape.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shape: shapeId } = await params;
  const shape = getFaceShapeById(shapeId);
  
  if (!shape) {
    return {
      title: 'Face Shape Not Found | FrameFinder',
    };
  }

  const shapeKeywords = [
    `${shape.displayName.toLowerCase()} face shape`,
    `glasses for ${shape.displayName.toLowerCase()} face`,
    `${shape.displayName.toLowerCase()} face eyewear`,
    `best frames for ${shape.displayName.toLowerCase()} face`,
    `${shape.displayName.toLowerCase()} face sunglasses`,
    `${shape.displayName.toLowerCase()} face frame recommendations`,
    `perfect glasses ${shape.displayName.toLowerCase()} face`,
    `${shape.displayName.toLowerCase()} face styling tips`,
    `eyewear guide ${shape.displayName.toLowerCase()} face`,
    `${shape.displayName.toLowerCase()} face shape analysis`
  ];

  return {
    title: `${shape.displayName} Face Shape Guide - Perfect Eyewear & Styling Tips`,
    description: `Complete ${shape.displayName.toLowerCase()} face shape guide with expert eyewear recommendations. Discover the best glasses, frames, and styling tips for ${shape.displayName.toLowerCase()} faces. ${shape.description.slice(0, 100)}`,
    keywords: shapeKeywords,
    openGraph: {
      title: `${shape.displayName} Face Shape Guide - Perfect Eyewear & Styling Tips`,
      description: `Expert guide for ${shape.displayName.toLowerCase()} faces with personalized eyewear recommendations and professional styling advice.`,
      type: 'article',
      url: `https://framefinder.com/guide/${shape.id}`,
      images: [
        {
          url: shape.imageUrl || `/images/og/${shape.id}-face-guide.jpg`,
          width: 1200,
          height: 630,
          alt: `${shape.displayName} Face Shape Guide - FrameFinder`,
        },
      ],
      siteName: 'FrameFinder',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${shape.displayName} Face Shape Guide - Perfect Eyewear`,
      description: `Expert eyewear recommendations and styling tips for ${shape.displayName.toLowerCase()} faces.`,
      images: [shape.imageUrl || `/images/og/${shape.id}-face-guide.jpg`],
    },
    alternates: {
      canonical: `/guide/${shape.id}`,
    },
  };
}

export default async function FaceShapeDetailPage({ params }: Props) {
  const { shape: shapeId } = await params;
  const shape = getFaceShapeById(shapeId);

  if (!shape) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://framefinder.com/guide/${shape.id}#article`,
        headline: `${shape.displayName} Face Shape Guide - Perfect Eyewear & Styling Tips`,
        description: `Complete ${shape.displayName.toLowerCase()} face shape guide with expert eyewear recommendations and professional styling advice`,
        image: {
          '@type': 'ImageObject',
          url: shape.imageUrl || `/images/og/${shape.id}-face-guide.jpg`,
          width: 1200,
          height: 630,
          caption: `${shape.displayName} Face Shape Guide`
        },
        author: {
          '@type': 'Organization',
          '@id': 'https://framefinder.com/#organization',
          name: 'FrameFinder'
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://framefinder.com/#organization',
          name: 'FrameFinder',
          logo: {
            '@type': 'ImageObject',
            url: 'https://framefinder.com/images/logo.png',
            width: 512,
            height: 512
          }
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString(),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://framefinder.com/guide/${shape.id}`
        },
        articleSection: 'Face Shape Guides',
        keywords: [
          `${shape.displayName.toLowerCase()} face shape`,
          `glasses for ${shape.displayName.toLowerCase()} face`,
          `${shape.displayName.toLowerCase()} face eyewear`,
          'eyewear styling tips',
          'face shape analysis'
        ],
        about: {
          '@type': 'Thing',
          name: `${shape.displayName} Face Shape`,
          description: shape.description,
          sameAs: `https://framefinder.com/guide/${shape.id}`
        },
        mentions: shape.characteristics.map(char => ({
          '@type': 'Thing',
          name: char,
          description: `Characteristic of ${shape.displayName.toLowerCase()} face shape`
        }))
      },
      {
        '@type': 'HowTo',
        '@id': `https://framefinder.com/guide/${shape.id}#howto`,
        name: `How to Choose Perfect Glasses for ${shape.displayName} Face Shape`,
        description: `Step-by-step guide to selecting the ideal eyewear for ${shape.displayName.toLowerCase()} face shapes`,
        image: shape.imageUrl || `/images/og/${shape.id}-face-guide.jpg`,
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0'
        },
        supply: [
          {
            '@type': 'HowToSupply',
            name: 'Clear front-facing photo'
          },
          {
            '@type': 'HowToSupply', 
            name: 'FrameFinder AI analysis tool'
          }
        ],
        tool: [
          {
            '@type': 'HowToTool',
            name: 'FrameFinder AI Face Analysis',
            url: 'https://framefinder.com/face-analysis'
          }
        ],
        step: [
          {
            '@type': 'HowToStep',
            name: 'Identify Your Face Shape',
            text: `Confirm you have a ${shape.displayName.toLowerCase()} face shape using our AI analysis tool`,
            url: 'https://framefinder.com/face-analysis'
          },
          {
            '@type': 'HowToStep',
            name: 'Choose Frame Styles',
            text: `Select frame styles that complement ${shape.displayName.toLowerCase()} faces: ${shape.recommendedFrames.slice(0, 3).map(frame => frame.name).join(', ')}`
          },
          {
            '@type': 'HowToStep',
            name: 'Consider Proportions',
            text: `Choose frames that balance your facial proportions and enhance your best features`
          },
          {
            '@type': 'HowToStep',
            name: 'Test and Adjust',
            text: 'Try on frames virtually or in-store and make adjustments for perfect fit'
          }
        ]
      },
      {
        '@type': 'ItemList',
        '@id': `https://framefinder.com/guide/${shape.id}#recommendations`,
        name: `Best Eyewear Styles for ${shape.displayName} Face`,
        description: `Curated list of ideal frame styles for ${shape.displayName.toLowerCase()} face shapes`,
        numberOfItems: shape.recommendedFrames.length,
        itemListElement: shape.recommendedFrames.map((frame, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: frame.name,
            description: `${frame.name} frames ideal for ${shape.displayName.toLowerCase()} face shapes`,
            category: 'Eyewear',
            brand: {
              '@type': 'Brand',
              name: 'Various Eyewear Brands'
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
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>→</span>
              <Link href="/guide" className="hover:text-foreground transition-colors">Face Shape Guide</Link>
              <span>→</span>
              <span className="text-foreground font-medium">{shape.displayName} Face</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
                  📋 {shape.displayName} Face Guide
                </div>
                
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {shape.displayName} Face Shape
                </h1>
                
                <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                  {shape.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link href="/face-analysis">
                      Analyze My Face
                      <span className="ml-2">📷</span>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#recommendations">
                      View Frame Recommendations
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:text-center">
                <div className="bg-card border rounded-xl p-8 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Face Shape Measurements</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Width to Height Ratio:</span>
                      <span className="font-medium">{shape.measurements.widthToHeight[0]} - {shape.measurements.widthToHeight[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Jaw to Forehead Ratio:</span>
                      <span className="font-medium">{shape.measurements.jawToForehead[0]} - {shape.measurements.jawToForehead[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cheekbone Width:</span>
                      <span className="font-medium">{shape.measurements.cheekboneWidth[0]} - {shape.measurements.cheekboneWidth[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Characteristics Section */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Key Characteristics
                  </CardTitle>
                  <CardDescription>
                    Distinctive features that define the {shape.displayName.toLowerCase()} face shape
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {shape.characteristics.map((characteristic, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-sm text-muted-foreground">{characteristic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    Celebrity Examples
                  </CardTitle>
                  <CardDescription>
                    Famous faces that showcase the {shape.displayName.toLowerCase()} face shape beautifully
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {shape.celebrities.map((celebrity, index) => (
                      <div key={index} className="bg-accent/50 rounded-lg p-3 text-center">
                        <div className="text-sm font-medium text-accent-foreground">{celebrity}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Frame Recommendations */}
        <section id="recommendations" className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Best Frames for {shape.displayName} Faces
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Expert-curated frame recommendations that complement your face shape perfectly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {shape.recommendedFrames.map((frame) => (
                <Card key={frame.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {frame.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge>{frame.category}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {frame.popularity}% match
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {frame.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* Features */}
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-muted-foreground">Key Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {frame.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Price Range:</span>
                        <Badge variant="outline" className="capitalize">
                          {frame.priceRange}
                        </Badge>
                      </div>

                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        Find Similar Styles
                        <span className="ml-2">🔍</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Styling Tips and What to Avoid */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <span className="text-2xl">✅</span>
                    Styling Tips
                  </CardTitle>
                  <CardDescription>
                    Expert advice for {shape.displayName.toLowerCase()} faces
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {shape.stylingTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">💡</span>
                        <span className="text-sm text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <span className="text-2xl">❌</span>
                    Frames to Avoid
                  </CardTitle>
                  <CardDescription>
                    Frame styles that may not complement {shape.displayName.toLowerCase()} faces
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {shape.avoidFrames.map((avoid, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">⚠️</span>
                        <span className="text-sm text-muted-foreground">{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-16">
          <div className="container mx-auto text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Ready to Find Your Perfect Frames?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Use our AI-powered face analysis tool to confirm your face shape and get personalized recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/face-analysis">
                    Analyze My Face Now
                    <span className="ml-2">🚀</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild>
                  <Link href="/guide">
                    View All Face Shapes
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Face Shapes */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Explore Other Face Shapes
              </h2>
              <p className="mt-4 text-muted-foreground">
                Compare with other face shapes to better understand your features
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {faceShapes
                .filter((s) => s.id !== shape.id)
                .map((otherShape) => (
                  <Card key={otherShape.id} className="group hover:shadow-md transition-all duration-300 cursor-pointer">
                    <Link href={`/guide/${otherShape.id}`}>
                      <CardContent className="p-4 text-center">
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                          {otherShape.displayName}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {otherShape.recommendedFrames.length} styles
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}