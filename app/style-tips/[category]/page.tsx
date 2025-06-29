import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{ category: string }>;
};

const styleGuides = {
  'color-matching': {
    title: 'Color Matching Guide',
    description: 'Learn how to choose frame colors that complement your skin tone, hair color, and personal style.',
    icon: '🎨',
    content: {
      introduction: 'Choosing the right frame color is crucial for creating a harmonious look that enhances your natural features. This comprehensive guide will help you understand color theory and how to apply it to eyewear selection.',
      sections: [
        {
          title: 'Understanding Skin Tones',
          content: 'Your skin tone is the key factor in determining which frame colors will look best on you. There are three main categories of skin tones, each with specific color palettes that complement them beautifully.',
          tips: [
            'Warm skin tones have yellow, peachy, or golden undertones',
            'Cool skin tones have pink, red, or blue undertones', 
            'Neutral skin tones have a mix of warm and cool undertones',
            'Look at your wrist veins: green = warm, blue = cool, both = neutral',
            'Consider how you look in gold vs silver jewelry for additional clues'
          ]
        },
        {
          title: 'Colors for Warm Skin Tones',
          content: 'Warm skin tones are enhanced by colors that echo the golden undertones naturally present in the skin.',
          tips: [
            'Gold and brass frames create beautiful harmony',
            'Warm browns like chocolate and amber are excellent choices',
            'Rich tortoiseshell patterns complement warm undertones',
            'Orange-based reds and warm burgundy work wonderfully',
            'Avoid stark blacks and cool-toned silvers'
          ]
        },
        {
          title: 'Colors for Cool Skin Tones',
          content: 'Cool skin tones shine when paired with colors that complement their natural pink or blue undertones.',
          tips: [
            'Silver and platinum frames enhance cool undertones',
            'Black frames create striking contrast and definition',
            'Blue-based colors like navy and royal blue are perfect',
            'Cool grays and charcoal provide sophisticated options',
            'Pink and purple hues can add feminine appeal'
          ]
        },
        {
          title: 'Hair Color Considerations',
          content: 'Your hair color plays a significant role in frame selection, offering opportunities for both contrast and complement.',
          tips: [
            'Blonde hair pairs beautifully with warm golds and light browns',
            'Dark hair can handle bold contrasts like bright colors or metallics',
            'Red hair looks stunning with warm browns, greens, and golds',
            'Gray or silver hair is enhanced by cool metallics and jewel tones',
            'Consider your eyebrow color as frames will frame this area'
          ]
        }
      ]
    }
  },
  'materials-guide': {
    title: 'Frame Materials Guide',
    description: 'Understand different frame materials and their benefits for comfort, durability, and style.',
    icon: '🔧',
    content: {
      introduction: 'The material of your eyeglass frames affects not only their appearance but also their comfort, durability, and suitability for your lifestyle. Understanding different materials helps you make informed decisions.',
      sections: [
        {
          title: 'Acetate Frames',
          content: 'Acetate is a premium plastic material made from plant-based cellulose, offering exceptional versatility in colors and patterns.',
          tips: [
            'Provides rich, vibrant colors and unique patterns',
            'Hypoallergenic and comfortable for sensitive skin',
            'Can be easily adjusted by opticians for perfect fit',
            'Durable and maintains its shape well over time',
            'Available in both transparent and opaque finishes'
          ]
        },
        {
          title: 'Metal Frames',
          content: 'Metal frames offer sleek, professional aesthetics with excellent durability and adjustability.',
          tips: [
            'Lightweight yet strong construction',
            'Easily adjustable for precise fit',
            'Professional appearance suitable for business environments',
            'Available in various finishes: brushed, polished, matte',
            'Nose pads can be adjusted for comfort'
          ]
        },
        {
          title: 'Titanium Excellence',
          content: 'Titanium represents the premium end of eyewear materials, offering unmatched strength-to-weight ratio.',
          tips: [
            'Incredibly lightweight for all-day comfort',
            'Hypoallergenic and corrosion-resistant',
            'Extremely durable and long-lasting',
            'Maintains precise adjustments over time',
            'Premium choice for discerning wearers'
          ]
        },
        {
          title: 'Modern Alternatives',
          content: 'New materials like TR90 and bio-based plastics offer innovative benefits for active lifestyles.',
          tips: [
            'TR90 provides exceptional flexibility and impact resistance',
            'Memory properties return frames to original shape',
            'Ideal for sports and active lifestyles',
            'Lightweight alternatives to traditional materials',
            'Eco-friendly options becoming increasingly available'
          ]
        }
      ]
    }
  },
  'workplace-style': {
    title: 'Professional Workplace Style',
    description: 'Choose eyewear that enhances your professional image and workplace confidence.',
    icon: '💼',
    content: {
      introduction: 'Your eyewear in professional settings should enhance your credibility while reflecting your personal style. The right frames can boost confidence and make a positive impression.',
      sections: [
        {
          title: 'Executive Presence',
          content: 'For leadership roles and executive positions, your eyewear should convey authority and sophistication.',
          tips: [
            'Classic rectangular frames convey competence and authority',
            'Subtle colors like black, navy, or dark brown work universally',
            'Avoid overly trendy styles that might date your look',
            'Quality materials like titanium or premium acetate show attention to detail',
            'Ensure frames are always in perfect condition and properly adjusted'
          ]
        },
        {
          title: 'Creative Industries',
          content: 'Creative fields often allow for more expressive eyewear choices while maintaining professionalism.',
          tips: [
            'Bold colors and unique shapes can showcase creativity',
            'Vintage-inspired styles add character and personality',
            'Consider frames that reflect your industry aesthetic',
            'Balance creativity with client expectations',
            'Statement frames can become part of your professional brand'
          ]
        },
        {
          title: 'Client-Facing Roles',
          content: 'When working directly with clients, your eyewear should inspire trust and confidence.',
          tips: [
            'Choose frames that don\'t distract from your message',
            'Neutral colors work well across diverse client bases',
            'Ensure frames fit properly and don\'t slip during presentations',
            'Consider having prescription sunglasses for outdoor meetings',
            'Keep lens cleaning supplies handy for professional appearance'
          ]
        },
        {
          title: 'Industry Considerations',
          content: 'Different industries have varying expectations for professional appearance.',
          tips: [
            'Conservative fields benefit from traditional frame styles',
            'Tech industries often embrace modern, innovative designs',
            'Healthcare professionals need comfortable, hygienic options',
            'Education settings call for approachable, friendly styles',
            'Consider safety requirements in industrial environments'
          ]
        }
      ]
    }
  },
  'seasonal-trends': {
    title: 'Seasonal Trends & Fashion',
    description: 'Stay current with the latest eyewear trends and seasonal color palettes.',
    icon: '🌟',
    content: {
      introduction: 'Eyewear fashion evolves with the seasons, offering opportunities to refresh your look and stay current with style trends while maintaining timeless appeal.',
      sections: [
        {
          title: 'Spring Awakening',
          content: 'Spring fashion calls for fresh, light colors that reflect the season\'s renewal and optimism.',
          tips: [
            'Pastel colors like soft pink, mint green, and lavender',
            'Clear and translucent acetate frames for lightness',
            'Floral patterns and nature-inspired designs',
            'Light metals like rose gold and brushed silver',
            'Feminine cat-eye shapes gain popularity'
          ]
        },
        {
          title: 'Summer Vibrancy',
          content: 'Summer trends embrace bold colors, patterns, and styles that reflect the season\'s energy.',
          tips: [
            'Bright, vibrant colors like turquoise, coral, and yellow',
            'Gradient lenses and tinted options for sun protection',
            'Oversized styles for glamorous summer appeal',
            'Nautical themes with navy and white combinations',
            'Lightweight materials for comfort in heat'
          ]
        },
        {
          title: 'Autumn Richness',
          content: 'Fall fashion incorporates rich, warm tones that echo the changing leaves and cozy atmosphere.',
          tips: [
            'Warm colors like amber, burgundy, and deep orange',
            'Rich tortoiseshell patterns in brown and gold',
            'Matte finishes for sophisticated autumn appeal',
            'Heavier, more substantial frame styles',
            'Earth tone color palettes dominate'
          ]
        },
        {
          title: 'Winter Elegance',
          content: 'Winter eyewear trends focus on bold contrasts and luxurious materials.',
          tips: [
            'High contrast combinations like black and gold',
            'Deep jewel tones: emerald, sapphire, and ruby',
            'Metallic finishes and premium materials',
            'Geometric shapes and angular designs',
            'Statement frames that stand out against winter clothing'
          ]
        }
      ]
    }
  }
};

export async function generateStaticParams() {
  return Object.keys(styleGuides).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const guide = styleGuides[category as keyof typeof styleGuides];
  
  if (!guide) {
    return {
      title: 'Style Guide Not Found | FrameFinder',
    };
  }

  return {
    title: `${guide.title} - Expert Eyewear Styling Tips | FrameFinder`,
    description: guide.description,
    keywords: `eyewear ${category.replace('-', ' ')}, glasses styling, eyewear fashion, frame selection tips`,
    openGraph: {
      title: `${guide.title} - Expert Eyewear Styling Tips`,
      description: guide.description,
      type: 'article',
      images: [`/images/og/style-${category}.jpg`],
    },
    alternates: {
      canonical: `/style-tips/${category}`,
    },
  };
}

export default async function StyleGuideDetailPage({ params }: Props) {
  const { category } = await params;
  const guide = styleGuides[category as keyof typeof styleGuides];

  if (!guide) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: {
      '@type': 'Organization',
      name: 'FrameFinder',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FrameFinder',
      logo: {
        '@type': 'ImageObject',
        url: '/images/logo.png',
      },
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(),
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
              <Link href="/style-tips" className="hover:text-foreground transition-colors">Style Tips</Link>
              <span>→</span>
              <span className="text-foreground font-medium">{guide.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
                {guide.icon} Expert Guide
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {guide.title}
              </h1>
              
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {guide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/face-analysis">
                    Apply These Tips
                    <span className="ml-2">🚀</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild>
                  <Link href="#guide-content">
                    Read Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {guide.content.introduction}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Guide Content */}
        <section id="guide-content" className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl">
              <div className="space-y-8">
                {guide.content.sections.map((section, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        {section.title}
                      </CardTitle>
                      <CardDescription>
                        {section.content}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-3 text-muted-foreground">Key Points:</h4>
                      <ul className="space-y-2">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-3">
                            <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                            <span className="text-sm text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Related Style Guides
              </h2>
              <p className="mt-4 text-muted-foreground">
                Explore more expert styling advice
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(styleGuides)
                .filter(([key]) => key !== category)
                .slice(0, 3)
                .map(([key, relatedGuide]) => (
                  <Card key={key} className="group hover:shadow-md transition-all duration-300 cursor-pointer">
                    <Link href={`/style-tips/${key}`}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                          <span className="text-xl">{relatedGuide.icon}</span>
                          {relatedGuide.title}
                        </CardTitle>
                        <CardDescription>
                          {relatedGuide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full group-hover:bg-primary/90 transition-colors" size="sm">
                          Read Guide
                          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-16">
          <div className="container mx-auto text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Ready to Apply These Tips?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Use our AI-powered face analysis to get personalized recommendations based on these styling principles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/face-analysis">
                    Analyze My Face Now
                    <span className="ml-2">📸</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild>
                  <Link href="/style-tips">
                    More Style Tips
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