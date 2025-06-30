import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'The Ultimate Guide to Choosing Frame Colors - Color Theory for Eyewear',
  description: 'Discover the science behind color theory and how it applies to eyewear selection. Expert guide to choosing perfect frame colors.',
  keywords: 'frame color theory, eyewear color selection, glasses color guide, frame color matching',
  openGraph: {
    title: 'The Ultimate Guide to Choosing Frame Colors - Color Theory for Eyewear',
    description: 'Discover the science behind color theory and how it applies to eyewear selection.',
    type: 'article',
    images: ['/images/og/color-theory-guide.jpg'],
  },
  alternates: {
    canonical: '/style-tips/articles/color-theory',
  },
};

export default function ColorTheoryArticle() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>→</span>
            <Link href="/style-tips" className="hover:text-foreground transition-colors">Style Tips</Link>
            <span>→</span>
            <span className="text-foreground font-medium">Color Theory Guide</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <Badge>Color Theory</Badge>
              <span className="text-sm text-muted-foreground">8 min read</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              The Ultimate Guide to Choosing Frame Colors
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground leading-relaxed">
              Discover the science behind color theory and how it applies to eyewear selection. 
              Master the art of choosing frame colors that enhance your natural beauty.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/face-analysis">
                  Find My Perfect Colors
                  <span className="ml-2">🎨</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="#article-content">
                  Read Article
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section id="article-content" className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl prose prose-lg">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Understanding Color Theory Basics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Color theory is the science and art of using color. It explains how humans perceive color, 
                  how colors mix, match or clash, and the messages colors communicate. When applied to eyewear, 
                  color theory helps you choose frames that enhance your natural coloring.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">The Color Wheel</h4>
                  <p className="text-sm text-muted-foreground">
                    The color wheel is divided into warm colors (reds, oranges, yellows) and cool colors 
                    (blues, greens, purples). Understanding where you fit on this spectrum is crucial for 
                    frame selection.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Determining Your Undertone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your skin's undertone is the key to unlocking which frame colors will look best on you. 
                  Here are the most reliable methods to determine your undertone:
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h5 className="font-semibold">The Vein Test</h5>
                    <p className="text-sm text-muted-foreground">
                      Look at the veins on your wrist in natural light. Green veins indicate warm undertones, 
                      blue veins suggest cool undertones, and if you see both, you likely have neutral undertones.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h5 className="font-semibold">The Jewelry Test</h5>
                    <p className="text-sm text-muted-foreground">
                      Compare how you look in gold versus silver jewelry. If gold flatters you more, you're warm-toned. 
                      If silver is more flattering, you're cool-toned. If both look great, you're neutral.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h5 className="font-semibold">The White Test</h5>
                    <p className="text-sm text-muted-foreground">
                      Hold up pure white and off-white fabrics to your face. If pure white is more flattering, 
                      you have cool undertones. If off-white or cream looks better, you have warm undertones.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Frame Colors for Different Undertones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-orange-600 mb-3">Warm Undertones</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-yellow-600"></span>
                        Gold and brass frames
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                        Warm browns and ambers
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-600"></span>
                        Rich tortoiseshell patterns
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-600"></span>
                        Warm reds and burgundy
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-600"></span>
                        Olive and forest greens
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-600 mb-3">Cool Undertones</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gray-600"></span>
                        Silver and platinum frames
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-black"></span>
                        True black frames
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                        Blues and navy
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                        Purples and plums
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-pink-600"></span>
                        Cool pinks and roses
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Advanced Color Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold mb-2">Complementary Colors</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      Use colors opposite on the color wheel to make your eye color pop. For example:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Brown eyes: Blue or green frames</li>
                      <li>• Blue eyes: Orange or warm brown frames</li>
                      <li>• Green eyes: Red or purple frames</li>
                      <li>• Hazel eyes: Purple or deep green frames</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Monochromatic Harmony</h5>
                    <p className="text-sm text-muted-foreground">
                      Choose frames in different shades of the same color family as your eyes or hair for 
                      a sophisticated, harmonious look that enhances your natural coloring.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Contrast Strategy</h5>
                    <p className="text-sm text-muted-foreground">
                      Light hair and eyes benefit from darker frames for definition, while dark hair and 
                      eyes can handle both light and dark frames depending on the desired effect.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Ready to Apply Color Theory?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Use our AI-powered face analysis to discover which colors will look best on you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/face-analysis">
                  Analyze My Colors
                  <span className="ml-2">🎨</span>
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
  );
}