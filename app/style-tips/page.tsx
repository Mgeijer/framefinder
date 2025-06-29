import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Eyewear Style Tips & Fashion Guides - Expert Styling Advice',
  description: 'Comprehensive eyewear styling guide with expert tips on color matching, frame materials, trends, and care. Professional advice for choosing perfect glasses that enhance your style and suit your lifestyle.',
  keywords: [
    'eyewear style tips',
    'glasses fashion guide',
    'frame color matching',
    'eyewear trends 2024',
    'glasses care tips',
    'frame materials guide',
    'professional eyewear styling',
    'glasses fashion advice',
    'eyewear color theory',
    'frame maintenance',
    'glasses styling tips',
    'eyewear care instructions',
    'professional frame selection',
    'glasses trend guide'
  ],
  openGraph: {
    title: 'Eyewear Style Tips & Fashion Guides - Expert Styling Advice',
    description: 'Comprehensive eyewear styling guide with expert tips on color matching, frame materials, trends, and care from certified opticians.',
    type: 'article',
    url: 'https://framefinder.com/style-tips',
    images: [
      {
        url: '/images/og/style-tips.jpg',
        width: 1200,
        height: 630,
        alt: 'FrameFinder Eyewear Style Tips and Fashion Guide',
      },
    ],
    siteName: 'FrameFinder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Eyewear Style Tips & Fashion Guide',
    description: 'Professional styling advice for choosing perfect glasses. Color matching, materials, trends, and care tips.',
    images: ['/images/og/style-tips.jpg'],
  },
  alternates: {
    canonical: '/style-tips',
  },
};

const styleCategories = [
  {
    id: 'color-matching',
    title: 'Color Matching Guide',
    description: 'Learn how to choose frame colors that complement your skin tone, hair color, and personal style.',
    icon: '🎨',
    tips: [
      'Warm skin tones pair beautifully with gold, amber, and brown frames',
      'Cool skin tones look stunning with silver, black, and blue-based colors',
      'Neutral skin tones can wear almost any color with confidence',
      'Consider your hair color - contrast or complement for different effects',
      'Your eye color can guide accent color choices in frames'
    ],
    featured: true
  },
  {
    id: 'materials-guide',
    title: 'Frame Materials Guide',
    description: 'Understand different frame materials and their benefits for comfort, durability, and style.',
    icon: '🔧',
    tips: [
      'Acetate frames offer rich colors and patterns with excellent durability',
      'Metal frames provide lightweight comfort and sleek, professional looks',
      'Titanium offers premium strength while being incredibly lightweight',
      'TR90 material provides flexibility and impact resistance for active lifestyles',
      'Wood frames offer unique, eco-friendly styling with natural variations'
    ]
  },
  {
    id: 'workplace-style',
    title: 'Professional Workplace Style',
    description: 'Choose eyewear that enhances your professional image and workplace confidence.',
    icon: '💼',
    tips: [
      'Classic rectangular frames convey authority and professionalism',
      'Subtle colors like black, navy, or tortoiseshell work in most environments',
      'Avoid overly trendy styles that might distract from your expertise',
      'Consider having a backup pair for important meetings',
      'Ensure frames fit properly - poorly fitting glasses can be distracting'
    ]
  },
  {
    id: 'seasonal-trends',
    title: 'Seasonal Trends & Fashion',
    description: 'Stay current with the latest eyewear trends and seasonal color palettes.',
    icon: '🌟',
    tips: [
      'Spring calls for lighter colors like pastels and clear acetates',
      'Summer trends include colorful patterns and gradient lenses',
      'Fall embraces warm tones like amber, burgundy, and rich browns',
      'Winter favors bold contrasts with black, deep blues, and metallics',
      'Timeless styles transcend seasonal trends for lasting appeal'
    ]
  },
  {
    id: 'lifestyle-matching',
    title: 'Lifestyle & Activity Matching',
    description: 'Choose frames that match your daily activities and lifestyle needs.',
    icon: '🏃‍♂️',
    tips: [
      'Active lifestyles benefit from flexible, lightweight materials',
      'Frequent travelers should consider durable, compact frame styles',
      'Digital workers may want blue light filtering lenses',
      'Outdoor enthusiasts should consider frames compatible with sunglasses',
      'Parents might prefer more durable, child-safe frame options'
    ]
  },
  {
    id: 'face-features',
    title: 'Highlighting Best Features',
    description: 'Learn how to use eyewear to enhance your most attractive facial features.',
    icon: '✨',
    tips: [
      'Cat-eye frames can lift and enhance your eye area',
      'Browline frames draw attention to beautiful eyebrows',
      'Bold frames can make small eyes appear larger',
      'Subtle frames let natural beauty shine through',
      'Color accents can highlight your eye color beautifully'
    ]
  },
  {
    id: 'care-maintenance',
    title: 'Care & Maintenance',
    description: 'Keep your eyewear looking great with proper care and maintenance techniques.',
    icon: '🧽',
    tips: [
      'Clean lenses daily with microfiber cloth and proper lens cleaner',
      'Store glasses in a protective case when not wearing them',
      'Regular professional adjustments keep frames fitting properly',
      'Avoid leaving glasses in hot cars or direct sunlight',
      'Replace nose pads and temple tips when they show wear'
    ]
  },
  {
    id: 'multiple-pairs',
    title: 'Building an Eyewear Wardrobe',
    description: 'Strategic advice for building a versatile collection of eyewear for different occasions.',
    icon: '👓',
    tips: [
      'Start with one versatile pair that works for most situations',
      'Add a bold statement pair for special occasions and personal expression',
      'Consider a professional pair specifically for work environments',
      'Include prescription sunglasses for outdoor activities',
      'Have a backup pair in case of damage or loss'
    ]
  }
];

const featuredArticles = [
  {
    title: 'The Ultimate Guide to Choosing Frame Colors',
    description: 'Discover the science behind color theory and how it applies to eyewear selection.',
    category: 'Color Theory',
    readTime: '8 min read',
    featured: true
  },
  {
    title: 'Professional vs. Personal: Building Your Eyewear Wardrobe',
    description: 'Learn how to balance professional requirements with personal style expression.',
    category: 'Style Strategy',
    readTime: '6 min read',
    featured: true
  },
  {
    title: 'Sustainable Eyewear: Eco-Friendly Materials and Brands',
    description: 'Explore environmentally conscious options in modern eyewear design.',
    category: 'Sustainability',
    readTime: '5 min read',
    featured: false
  }
];

export default function StyleTipsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://framefinder.com/style-tips#article',
        headline: 'Eyewear Style Tips & Fashion Guides - Expert Styling Advice',
        description: 'Comprehensive eyewear styling guide with expert tips on color matching, frame materials, trends, and care from certified opticians',
        image: {
          '@type': 'ImageObject',
          url: '/images/og/style-tips.jpg',
          width: 1200,
          height: 630,
          caption: 'Eyewear Style Tips and Fashion Guide'
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
          '@id': 'https://framefinder.com/style-tips'
        },
        articleSection: 'Eyewear Style Tips'
      },
      {
        '@type': 'ItemList',
        '@id': 'https://framefinder.com/style-tips#categories',
        name: 'Eyewear Style Categories',
        description: 'Complete guide to eyewear styling with expert tips across multiple categories',
        numberOfItems: styleCategories.length,
        itemListElement: styleCategories.map((category, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'HowTo',
            name: category.title,
            description: category.description,
            image: '/images/og/style-tips.jpg',
            step: category.tips.map((tip, tipIndex) => ({
              '@type': 'HowToStep',
              position: tipIndex + 1,
              name: `Style Tip ${tipIndex + 1}`,
              text: tip
            }))
          }
        }))
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://framefinder.com/style-tips#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I choose the right frame color for my skin tone?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Warm skin tones pair beautifully with gold, amber, and brown frames, while cool skin tones look stunning with silver, black, and blue-based colors. Neutral skin tones can wear almost any color with confidence.'
            }
          },
          {
            '@type': 'Question', 
            name: 'What frame materials are best for active lifestyles?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TR90 material provides flexibility and impact resistance for active lifestyles. Titanium offers premium strength while being incredibly lightweight, making it ideal for sports and outdoor activities.'
            }
          },
          {
            '@type': 'Question',
            name: 'How should I care for my eyewear?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Clean lenses daily with microfiber cloth and proper lens cleaner, store glasses in a protective case when not wearing them, and get regular professional adjustments to keep frames fitting properly.'
            }
          }
        ]
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
              💡 Expert Style Advice
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Eyewear Style Tips
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground sm:text-2xl lg:text-xl lg:leading-8">
              Master the art of eyewear styling with expert tips, professional advice, and insider secrets 
              for choosing frames that enhance your natural beauty and personal style.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-green-500">✓</span>
                Color Matching
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-green-500">✓</span>
                Professional Styling
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-green-500">✓</span>
                Trend Insights
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-green-500">✓</span>
                Care Tips
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/face-analysis">
                  Find My Perfect Style
                  <span className="ml-2">→</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="#style-guides">
                  Browse Style Guides
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured Articles
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              In-depth guides and expert insights on eyewear styling
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {featuredArticles.filter(article => article.featured).map((article, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{article.category}</Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    Read Full Article
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Style Guide Categories */}
      <section id="style-guides" className="px-4 py-16 bg-muted/30">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Complete Style Guides
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive guides covering every aspect of eyewear styling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {styleCategories.map((category) => (
              <Card key={category.id} className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${category.featured ? 'ring-2 ring-primary/20' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                  </div>
                  {category.featured && (
                    <Badge className="w-fit mb-2">Featured</Badge>
                  )}
                  <CardDescription className="text-sm leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-sm text-muted-foreground">Quick Tips:</h4>
                    <ul className="space-y-1">
                      {category.tips.slice(0, 3).map((tip, index) => (
                        <li key={index} className="flex items-start text-xs text-muted-foreground">
                          <span className="text-primary mr-2 mt-0.5 flex-shrink-0">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                    {category.tips.length > 3 && (
                      <p className="text-xs text-muted-foreground">+{category.tips.length - 3} more tips</p>
                    )}
                  </div>

                  <Button className="w-full group-hover:bg-primary/90 transition-colors" size="sm">
                    View Full Guide
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
              Daily Styling Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    🌅 Morning Routine
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-left">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Clean your lenses before starting the day
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Check for loose screws or misalignment
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Choose frames that match your day's activities
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    👔 Professional Look
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-left">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Stick to classic colors for business settings
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Ensure frames don't overshadow your expertise
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Keep a backup pair at the office
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    🌙 Evening Care
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-left">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Store glasses in a protective case
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Remove smudges and fingerprints
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      Check for any damage or wear
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Ready to Perfect Your Style?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Put these tips into practice by discovering your face shape and getting personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/face-analysis">
                  Analyze My Face Shape
                  <span className="ml-2">📷</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="/guide">
                  View Face Shape Guide
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