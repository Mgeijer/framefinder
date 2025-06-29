import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQSection } from '@/components/ui/faq';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Face Shape Analysis & Eyewear | FrameFinder',
  description: 'Get answers to common questions about face shape analysis, eyewear selection, AI technology, and our recommendations. Expert guidance for choosing perfect glasses.',
  keywords: 'face shape FAQ, eyewear questions, glasses selection help, AI face analysis, frame fitting questions',
  openGraph: {
    title: 'Frequently Asked Questions - Face Shape Analysis & Eyewear',
    description: 'Get answers to common questions about face shape analysis and eyewear selection.',
    type: 'website',
    images: ['/images/og/faq.jpg'],
  },
  alternates: {
    canonical: '/faq',
  },
};

const faqItems = [
  // Face Shape Analysis
  {
    id: 'how-accurate-ai',
    question: 'How accurate is the AI face shape analysis?',
    answer: 'Our AI face shape analysis uses advanced machine learning algorithms trained on diverse facial data to provide reliable face shape classification. The system analyzes key facial landmarks and proportions to determine your face shape. We recommend using the results as a professional starting point and considering your personal preferences and professional optician advice for the final decision.',
    category: 'AI Technology'
  },
  {
    id: 'what-photos-work-best',
    question: 'What type of photos work best for analysis?',
    answer: 'For the most accurate results, use a clear, front-facing photo with good lighting where your entire face is visible. Avoid photos with shadows, tilted angles, or obstructions like hats or hair covering your face. The ideal photo shows your face straight-on, with your hair pulled back, in natural lighting. Our system works with both camera captures and uploaded images.',
    category: 'Using the Tool'
  },
  {
    id: 'six-face-shapes',
    question: 'What are the six main face shapes?',
    answer: 'The six main face shapes are: Oval (balanced proportions, slightly longer than wide), Round (equal width and length with soft curves), Square (strong jawline with equal width at forehead and jaw), Heart (wide forehead tapering to narrow chin), Diamond (wide cheekbones with narrow forehead and jaw), and Triangle (narrow forehead with wider jawline). Each shape has specific eyewear recommendations that enhance natural features.',
    category: 'Face Shapes'
  },
  {
    id: 'multiple-face-shapes',
    question: 'What if I have features of multiple face shapes?',
    answer: 'Many people have characteristics of multiple face shapes, which is completely normal. Our AI provides a primary face shape recommendation along with a confidence score. If you\'re between shapes, consider recommendations for both shapes and choose frames that feel most flattering to you. The key is finding frames that balance your features and make you feel confident.',
    category: 'Face Shapes'
  },

  // Eyewear Selection
  {
    id: 'frame-recommendations-personalized',
    question: 'How are the frame recommendations personalized?',
    answer: 'Our recommendations are based on your specific face shape analysis, considering proportions, angles, and features unique to your face. We factor in what frame styles will best complement your bone structure, create visual balance, and enhance your natural features. Recommendations include frame shapes, materials, colors, and specific styles that work best for your face shape.',
    category: 'Recommendations'
  },
  {
    id: 'expensive-frames-required',
    question: 'Do I need expensive frames to look good?',
    answer: 'Absolutely not! Great style is about choosing the right shape and fit for your face, not the price tag. Our recommendations include options across all price ranges. A well-fitting, properly sized frame in the right shape for your face will always look better than an expensive frame that doesn\'t suit your features. Focus on shape, fit, and personal style rather than price.',
    category: 'Frame Selection'
  },
  {
    id: 'prescription-vs-fashion',
    question: 'Do these recommendations work for both prescription and fashion glasses?',
    answer: 'Yes! Face shape principles apply to all types of eyewear - prescription glasses, reading glasses, sunglasses, and fashion frames. The key factors (face shape, proportions, style) remain the same regardless of whether you need vision correction. However, if you have a strong prescription, consult with an optician about lens thickness and how it might affect frame choice.',
    category: 'Frame Selection'
  },
  {
    id: 'frame-color-selection',
    question: 'How do I choose the right frame color?',
    answer: 'Frame color should complement your skin tone, hair color, and personal style. Warm skin tones (yellow/golden undertones) look great in browns, golds, and warm colors. Cool skin tones (pink/blue undertones) are enhanced by blacks, silvers, and cool colors. Neutral skin tones can wear most colors. Consider your hair color and eye color as well - they can guide accent choices and overall harmony.',
    category: 'Styling'
  },

  // Technical Questions
  {
    id: 'privacy-data-security',
    question: 'Is my photo data secure and private?',
    answer: 'Absolutely. We take privacy seriously. Photos are processed securely and are not stored permanently on our servers. The AI analysis happens in real-time, and images are automatically deleted after processing. We do not share, sell, or use your photos for any purpose other than providing your face shape analysis. Your privacy and data security are our top priorities.',
    category: 'Privacy & Security'
  },
  {
    id: 'mobile-device-compatibility',
    question: 'Does the analysis work on mobile devices?',
    answer: 'Yes! Our face shape analysis is fully optimized for mobile devices including smartphones and tablets. You can capture photos directly with your device\'s camera or upload existing photos. The mobile experience is designed to be just as accurate and user-friendly as the desktop version, making it convenient to get your analysis anywhere.',
    category: 'Technical'
  },
  {
    id: 'browser-requirements',
    question: 'What browser and device requirements are needed?',
    answer: 'Our tool works on all modern browsers including Chrome, Safari, Firefox, and Edge. For the best experience, ensure your browser is up to date. Camera access requires permission for photo capture. The tool works on desktop computers, laptops, tablets, and smartphones. No special software or apps need to be downloaded.',
    category: 'Technical'
  },

  // Styling and Fashion
  {
    id: 'professional-vs-casual',
    question: 'Should I have different frames for work and personal use?',
    answer: 'Many people benefit from having multiple pairs of glasses for different occasions. Consider a more conservative pair for professional settings (classic shapes, neutral colors) and a more expressive pair for personal time. This allows you to maintain appropriate professional appearance while expressing personality in casual settings. Even within the same face shape, you can vary styles for different purposes.',
    category: 'Styling'
  },
  {
    id: 'trends-vs-classics',
    question: 'Should I follow eyewear trends or stick to classics?',
    answer: 'The best approach combines timeless principles with personal style preferences. Classic frame shapes that suit your face shape will always look good, while trendy elements can be incorporated through colors, materials, or subtle design details. If you love a trend, make sure it still follows the basic shape principles for your face. Consider trendy details on classic shapes for the best of both worlds.',
    category: 'Fashion'
  },
  {
    id: 'aging-frame-choices',
    question: 'How should frame choices change as I age?',
    answer: 'Face shape fundamentals remain the same, but you might want to consider practical aspects like larger lenses for presbyopia, anti-reflective coatings for comfort, and frames that complement changing hair color. Many people gravitate toward classic, quality frames as they age. The key is maintaining the same shape principles while adapting for lifestyle changes and personal evolution.',
    category: 'Lifestyle'
  },

  // Shopping and Practical
  {
    id: 'online-vs-instore',
    question: 'Can I shop for frames online, or should I visit a store?',
    answer: 'Both online and in-store shopping have advantages. Online shopping offers convenience and often better prices, while in-store allows you to try frames and get professional fitting. Many people use our analysis to narrow down frame styles online, then visit a store to try similar shapes. Some online retailers offer virtual try-on tools and generous return policies to bridge this gap.',
    category: 'Shopping'
  },
  {
    id: 'frame-adjustment-importance',
    question: 'How important is professional frame adjustment?',
    answer: 'Professional adjustment is crucial for comfort, appearance, and optimal vision. Even the perfect frame shape won\'t look or feel right if it doesn\'t fit properly. A skilled optician can adjust temple length, nose bridge fit, and overall alignment. Most optical shops provide complimentary adjustments, and it\'s worth investing in proper fitting for the best results.',
    category: 'Frame Care'
  },
  {
    id: 'frame-replacement-frequency',
    question: 'How often should I replace my frames?',
    answer: 'Frame replacement depends on wear, style preferences, and prescription changes. Generally, frames can last 2-3 years with proper care, but you might want to update sooner for style reasons or if your prescription changes significantly. Signs it\'s time to replace include loose screws that can\'t be tightened, visible wear, or if they no longer feel comfortable or look current.',
    category: 'Frame Care'
  }
];

const quickTips = [
  {
    icon: '📏',
    title: 'Measure Twice',
    description: 'Take multiple photos in different lighting to ensure consistent results'
  },
  {
    icon: '👥',
    title: 'Get Opinions',
    description: 'Ask friends and family for feedback on your frame choices'
  },
  {
    icon: '💡',
    title: 'Consider Lifestyle',
    description: 'Choose frames that match your daily activities and professional needs'
  },
  {
    icon: '🔄',
    title: 'Try Different Styles',
    description: 'Don\'t be afraid to experiment within your recommended face shape category'
  }
];

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
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
                ❓ Questions & Answers
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Frequently Asked Questions
              </h1>
              
              <p className="mb-8 text-xl text-muted-foreground sm:text-2xl lg:text-xl lg:leading-8">
                Get expert answers to common questions about face shape analysis, eyewear selection, 
                and our AI technology. Everything you need to know for finding your perfect frames.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/face-analysis">
                    Try Face Analysis
                    <span className="ml-2">📸</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild>
                  <Link href="#faq-content">
                    Browse Questions
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Quick Tips
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Essential advice for getting the best results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickTips.map((tip, index) => (
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <div className="text-3xl mb-2">{tip.icon}</div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{tip.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div id="faq-content">
          <FAQSection
            title="Complete FAQ Guide"
            description="Browse questions by category or view all at once"
            items={faqItems}
            showCategories={true}
            className="bg-muted/30"
          />
        </div>

        {/* Still Have Questions */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Still Have Questions?</CardTitle>
                  <CardDescription className="text-center text-lg">
                    We're here to help you find the perfect eyewear solution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📧</div>
                      <h3 className="font-semibold mb-2">Email Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get detailed answers to specific questions
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/contact">Contact Us</Link>
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl mb-2">📖</div>
                      <h3 className="font-semibold mb-2">Style Guides</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Explore comprehensive styling tips
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/style-tips">View Guides</Link>
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl mb-2">🔍</div>
                      <h3 className="font-semibold mb-2">Face Shape Guide</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Learn about all face shapes in detail
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/guide">Face Shapes</Link>
                      </Button>
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
                Ready to Find Your Perfect Frames?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Use our AI-powered analysis to discover your face shape and get personalized eyewear recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/face-analysis">
                    Start Face Analysis
                    <span className="ml-2">🚀</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild>
                  <Link href="/guide">
                    Browse Face Shapes
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