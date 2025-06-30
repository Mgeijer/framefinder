import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Professional vs. Personal: Building Your Eyewear Wardrobe - FrameFinder',
  description: 'Learn how to balance professional requirements with personal style expression. Strategic guide to building a versatile eyewear collection.',
  keywords: 'eyewear wardrobe, professional glasses, personal style eyewear, multiple pairs glasses',
  openGraph: {
    title: 'Professional vs. Personal: Building Your Eyewear Wardrobe',
    description: 'Learn how to balance professional requirements with personal style expression.',
    type: 'article',
    images: ['/images/og/eyewear-wardrobe.jpg'],
  },
  alternates: {
    canonical: '/style-tips/articles/eyewear-wardrobe',
  },
};

export default function EyewearWardrobeArticle() {
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
            <span className="text-foreground font-medium">Building Your Eyewear Wardrobe</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <Badge>Style Strategy</Badge>
              <span className="text-sm text-muted-foreground">6 min read</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Professional vs. Personal: Building Your Eyewear Wardrobe
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground leading-relaxed">
              Learn how to balance professional requirements with personal style expression. 
              Strategic advice for building a versatile eyewear collection that works for every occasion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/face-analysis">
                  Start Building My Wardrobe
                  <span className="ml-2">👓</span>
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="#article-content">
                  Read Strategy Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section id="article-content" className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>The Strategic Approach to Eyewear</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Building an eyewear wardrobe isn't just about having multiple pairs—it's about having the 
                  right pairs for the right occasions. Like any well-planned wardrobe, your eyewear collection 
                  should serve both functional and aesthetic purposes across different areas of your life.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-primary">The 3-Tier System</h4>
                  <p className="text-sm text-muted-foreground">
                    Most people benefit from a three-tier approach: one professional pair, one personal/casual pair, 
                    and one statement or special occasion pair. This foundation covers 90% of situations while 
                    allowing for personal expression.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Tier 1: Your Professional Foundation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your professional pair should be your most versatile investment. This is the pair that works 
                  for business meetings, presentations, and any situation where you need to project competence and reliability.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h5 className="font-semibold">Key Characteristics</h5>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Classic frame shapes (rectangular, oval, or subtle cat-eye)</li>
                      <li>• Neutral colors (black, dark brown, navy, or gunmetal)</li>
                      <li>• High-quality materials that maintain their appearance</li>
                      <li>• Comfortable for all-day wear</li>
                      <li>• Appropriate for your industry's dress code</li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Industry Considerations</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-foreground">Conservative Fields:</strong>
                        <p className="text-muted-foreground">Law, finance, consulting - stick to traditional rectangular frames in black or dark brown</p>
                      </div>
                      <div>
                        <strong className="text-foreground">Creative Industries:</strong>
                        <p className="text-muted-foreground">Design, marketing, media - more flexibility for unique shapes and interesting colors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Tier 2: Personal Expression Pair</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your personal pair is where you can let your personality shine. This is for weekends, casual outings, 
                  and times when you want to express your individual style.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-3">Style Options</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Bold colors that reflect your personality
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Unique patterns like florals or geometric designs
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Vintage-inspired or retro shapes
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Oversized or dramatic proportions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Fun materials like wood or colorful acetates
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-3">Lifestyle Factors</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Consider your hobbies and activities
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Think about your casual wardrobe colors
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Factor in comfort for extended wear
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Choose durability for active lifestyles
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        Match your personal aesthetic
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Tier 3: Statement & Special Occasion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your statement pair is for special occasions, dates, parties, or times when you want to make 
                  a memorable impression. This is where you can be most adventurous with your choices.
                </p>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-purple/10 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Statement Strategies</h5>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong className="text-foreground">Bold Colors</strong>
                        <p className="text-muted-foreground">Bright reds, electric blues, or metallics that catch attention</p>
                      </div>
                      <div>
                        <strong className="text-foreground">Unique Shapes</strong>
                        <p className="text-muted-foreground">Dramatic cat-eyes, geometric designs, or artistic forms</p>
                      </div>
                      <div>
                        <strong className="text-foreground">Luxury Materials</strong>
                        <p className="text-muted-foreground">Premium acetates, genuine horn, or designer metals</p>
                      </div>
                    </div>
                  </div>
                  <div className="border border-muted rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Special Considerations</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Choose something that makes you feel confident and special</li>
                      <li>• Consider seasonal events and your social calendar</li>
                      <li>• Think about photography - how will they look in pictures?</li>
                      <li>• Balance boldness with your comfort level</li>
                      <li>• Ensure they still complement your face shape</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Practical Implementation Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold mb-3">Building Your Collection Over Time</h5>
                    <div className="space-y-3">
                      <div className="flex gap-4">
                        <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                        <div>
                          <strong className="text-foreground">Start with Professional</strong>
                          <p className="text-sm text-muted-foreground">Invest in one high-quality professional pair that works for all business situations</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                        <div>
                          <strong className="text-foreground">Add Personal Style</strong>
                          <p className="text-sm text-muted-foreground">Once comfortable, add a casual pair that reflects your personality</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                        <div>
                          <strong className="text-foreground">Complete with Statement</strong>
                          <p className="text-sm text-muted-foreground">Finally, add a bold pair for special occasions and personal expression</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Budget Considerations</h5>
                    <p className="text-sm text-muted-foreground mb-2">
                      Allocate your budget strategically: spend the most on your professional pair since it gets the most wear, 
                      moderate amounts on your personal pair, and have fun with affordable options for statement pieces.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Professional: 50% of total eyewear budget</li>
                      <li>• Personal: 30% of total eyewear budget</li>
                      <li>• Statement: 20% of total eyewear budget</li>
                    </ul>
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
              Ready to Build Your Perfect Wardrobe?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start with our AI-powered face analysis to discover which frame styles work best for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/face-analysis">
                  Find My Perfect Frames
                  <span className="ml-2">👓</span>
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