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
  },
  'lifestyle-matching': {
    title: 'Lifestyle & Activity Matching',
    description: 'Choose frames that match your daily activities and lifestyle needs.',
    icon: '🏃‍♂️',
    content: {
      introduction: 'Your lifestyle should be a major factor in frame selection. Different activities, work environments, and personal habits require different considerations to ensure your eyewear enhances rather than hinders your daily life.',
      sections: [
        {
          title: 'Active Lifestyle Considerations',
          content: 'For those who lead active lives, frame selection goes beyond style to include functionality, durability, and comfort during physical activities.',
          tips: [
            'Choose flexible materials like TR90 that can withstand impact',
            'Look for wraparound styles that stay secure during movement',
            'Consider sports-specific features like rubberized nose pads',
            'Ensure frames don\'t fog up during physical exertion',
            'Select scratch-resistant lens coatings for durability'
          ]
        },
        {
          title: 'Professional Environment Needs',
          content: 'Your work environment significantly influences the best frame choices for both functionality and professional appearance.',
          tips: [
            'Office workers benefit from blue light filtering for screen time',
            'Healthcare professionals need easily cleanable, hygienic materials',
            'Teachers require durable frames that handle daily wear',
            'Outdoor workers should consider impact-resistant lenses',
            'Creative professionals can often express more personal style'
          ]
        },
        {
          title: 'Travel and Mobility',
          content: 'Frequent travelers and mobile professionals have unique requirements for their eyewear choices.',
          tips: [
            'Lightweight frames reduce fatigue during long wear',
            'Durable cases protect frames during transport',
            'Consider prescription sunglasses for varied lighting',
            'Choose adjustable frames that maintain fit across climates',
            'Pack backup frames or contacts for emergencies'
          ]
        },
        {
          title: 'Digital Life Integration',
          content: 'Modern lifestyles often involve significant screen time, requiring specific considerations for eye health and comfort.',
          tips: [
            'Blue light filtering reduces digital eye strain',
            'Anti-reflective coatings improve screen visibility',
            'Consider computer-specific prescriptions for desk work',
            'Adjustable frames help maintain proper viewing angles',
            'Regular breaks remain important regardless of lens technology'
          ]
        }
      ]
    }
  },
  'face-features': {
    title: 'Highlighting Best Features',
    description: 'Learn how to use eyewear to enhance your most attractive facial features.',
    icon: '✨',
    content: {
      introduction: 'Strategic frame selection can enhance your best facial features while minimizing areas you\'re less confident about. Understanding how different frame styles interact with facial features empowers you to make choices that boost your confidence.',
      sections: [
        {
          title: 'Eye Enhancement Techniques',
          content: 'Your eyes are often the focal point of your face, and the right frames can make them appear larger, brighter, and more prominent.',
          tips: [
            'Light-colored frames can make eyes appear larger and brighter',
            'Cat-eye shapes naturally lift and elongate the eye area',
            'Frames with decorative details draw attention to the eyes',
            'Avoid frames that cast shadows across the eye area',
            'Consider frame colors that complement your eye color'
          ]
        },
        {
          title: 'Eyebrow Considerations',
          content: 'The relationship between your frames and eyebrows significantly impacts your overall look and facial balance.',
          tips: [
            'Frame tops should follow your natural eyebrow line',
            'Browline frames can enhance naturally beautiful brows',
            'Avoid frames that completely hide your eyebrows',
            'Consider your eyebrow thickness when choosing frame width',
            'Some people prefer frames that extend slightly above the brow'
          ]
        },
        {
          title: 'Nose Bridge Harmony',
          content: 'The right bridge style can enhance nose proportions and improve overall facial harmony.',
          tips: [
            'Low bridges work well for flatter nose profiles',
            'High bridges suit prominent nose bridges',
            'Adjustable nose pads provide the best fit for most people',
            'Bridge width should complement your nose width',
            'Avoid bridges that create pinching or sliding'
          ]
        },
        {
          title: 'Cheekbone and Jawline Balance',
          content: 'Frame selection can help balance prominent cheekbones or strong jawlines for overall facial harmony.',
          tips: [
            'Wider frames can balance narrow jawlines',
            'Angular frames complement soft facial features',
            'Round frames soften angular jawlines',
            'Frame width should relate proportionally to cheekbone width',
            'Consider how frames interact with your hairstyle'
          ]
        }
      ]
    }
  },
  'care-maintenance': {
    title: 'Care & Maintenance',
    description: 'Keep your eyewear looking great with proper care and maintenance techniques.',
    icon: '🧽',
    content: {
      introduction: 'Proper care and maintenance extend the life of your eyewear while ensuring optimal vision and appearance. Developing good habits for cleaning, storage, and handling will keep your frames looking new and functioning properly for years.',
      sections: [
        {
          title: 'Daily Cleaning Routine',
          content: 'Establishing a consistent daily cleaning routine prevents buildup of oils, dust, and debris that can affect both vision and frame appearance.',
          tips: [
            'Use lukewarm water to rinse away loose debris before wiping',
            'Apply eyeglass cleaner to both sides of each lens',
            'Use only microfiber cloths to avoid scratching',
            'Clean nose pads and temples where oils accumulate',
            'Never use paper towels, tissues, or your shirt to clean lenses'
          ]
        },
        {
          title: 'Proper Storage Practices',
          content: 'How you store your glasses when not wearing them significantly impacts their longevity and condition.',
          tips: [
            'Always use a protective case when storing glasses',
            'Place glasses lens-side up if setting them down temporarily',
            'Keep cases clean and free of debris that could scratch lenses',
            'Store in moderate temperature environments',
            'Consider multiple cases for different locations (car, office, home)'
          ]
        },
        {
          title: 'Professional Maintenance',
          content: 'Regular professional maintenance ensures optimal fit, function, and appearance of your eyewear.',
          tips: [
            'Schedule professional cleanings and adjustments every 6 months',
            'Have loose screws tightened before they fall out completely',
            'Replace worn nose pads and temple tips as needed',
            'Professional realignment prevents uneven wear patterns',
            'Ask about protective coatings during routine maintenance'
          ]
        },
        {
          title: 'Extending Frame Life',
          content: 'Simple habits and awareness can significantly extend the useful life of your eyewear investment.',
          tips: [
            'Remove glasses with both hands to prevent frame warping',
            'Avoid leaving glasses in hot cars or direct sunlight',
            'Keep backup glasses to reduce wear on your primary pair',
            'Address minor issues promptly before they become major problems',
            'Invest in quality cleaning supplies and protective accessories'
          ]
        }
      ]
    }
  },
  'multiple-pairs': {
    title: 'Building an Eyewear Wardrobe',
    description: 'Strategic advice for building a versatile collection of eyewear for different occasions.',
    icon: '👓',
    content: {
      introduction: 'Building a strategic eyewear wardrobe is like curating any other aspect of your personal style. The right collection of frames can serve different needs, occasions, and style preferences while providing practical benefits like backup options and specialized functionality.',
      sections: [
        {
          title: 'The Foundation Pair',
          content: 'Your first and most important investment should be a versatile foundation pair that works across most situations in your life.',
          tips: [
            'Choose a classic shape that transcends trends',
            'Select neutral colors that work with most outfits',
            'Invest in high-quality materials for durability',
            'Ensure professional appearance for work environments',
            'Prioritize comfort for all-day wear'
          ]
        },
        {
          title: 'Adding Personality',
          content: 'Once you have a reliable foundation, you can explore frames that express your personal style and creativity.',
          tips: [
            'Consider bold colors or unique patterns for weekend wear',
            'Experiment with different shapes to discover preferences',
            'Think about frames that complement your casual wardrobe',
            'Try vintage or retro styles for personal expression',
            'Choose frames that make you feel confident and unique'
          ]
        },
        {
          title: 'Specialized Functionality',
          content: 'Different activities and environments may benefit from specialized eyewear designed for specific purposes.',
          tips: [
            'Computer glasses with blue light filtering for screen work',
            'Prescription sunglasses for outdoor activities',
            'Safety glasses for workshop or industrial environments',
            'Sports-specific frames for athletic activities',
            'Reading glasses for close-up work if needed'
          ]
        },
        {
          title: 'Budget and Planning',
          content: 'Building an eyewear wardrobe requires strategic planning and budget allocation to maximize value and utility.',
          tips: [
            'Start with quality over quantity - one good pair beats several poor ones',
            'Consider insurance coverage and replacement costs',
            'Take advantage of promotions for second pairs',
            'Plan purchases around prescription changes',
            'Maintain all pairs properly to extend their useful life'
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