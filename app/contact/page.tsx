import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact FrameFinder - Support & Feedback',
  description: 'Get in touch with FrameFinder for technical support, feedback, or partnership inquiries. We\'re here to help with your face shape analysis experience.',
  keywords: 'contact FrameFinder, technical support, feedback, partnership inquiries, face shape analysis help',
  openGraph: {
    title: 'Contact FrameFinder - Support & Feedback',
    description: 'Get in touch with FrameFinder for technical support and feedback.',
    type: 'website',
    images: ['/images/og/contact.jpg'],
  },
  alternates: {
    canonical: '/contact',
  },
};

const contactMethods = [
  {
    title: 'General Inquiries',
    icon: '💬',
    description: 'Questions about our service, features, or general feedback',
    email: 'hello@framefinder.com',
    response: 'Within 24 hours',
    cta: 'Send Message'
  },
  {
    title: 'Technical Support',
    icon: '🛠️',
    description: 'Help with AI analysis, photo uploads, or technical issues',
    email: 'support@framefinder.com',
    response: 'Within 12 hours',
    cta: 'Get Help',
    featured: true
  },
  {
    title: 'Business Partnerships',
    icon: '🤝',
    description: 'Collaboration opportunities, affiliate programs, and brand partnerships',
    email: 'partnerships@framefinder.com',
    response: 'Within 3 business days',
    cta: 'Discuss Partnership'
  }
];

const faqHighlights = [
  {
    question: 'How do I get help with the face analysis?',
    answer: 'If you\'re having trouble with photo uploads or AI analysis, our technical support team can help guide you through the process and troubleshoot any issues.'
  },
  {
    question: 'Can I suggest new features or improvements?',
    answer: 'Absolutely! We love hearing from users about how we can improve FrameFinder. Send us your feedback and feature suggestions through our general inquiries contact.'
  },
  {
    question: 'What if the AI analysis seems incorrect?',
    answer: 'Our AI is continuously improving, but if you feel the results don\'t match your face shape, you can try retaking the photo with better lighting or contact support for guidance on getting better results.'
  }
];

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact FrameFinder',
    description: 'Get in touch with FrameFinder for technical support and feedback',
    url: 'https://framefinder.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'FrameFinder',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: 'hello@framefinder.com'
        },
        {
          '@type': 'ContactPoint',
          contactType: 'Technical Support',
          email: 'support@framefinder.com'
        }
      ]
    }
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
                💬 Get Support
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Contact FrameFinder
              </h1>
              
              <p className="mb-8 text-xl text-muted-foreground sm:text-2xl lg:text-xl lg:leading-8">
                Need help with our face analysis tool or have feedback to share? 
                Our support team is here to help you get the most out of FrameFinder.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="#contact-methods">
                    Get Support
                    <span className="ml-2">🛠️</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild>
                  <Link href="#contact-methods">
                    View Contact Options
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Contact Methods */}
        <section id="contact-methods" className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the best way to reach our team based on your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className={`${method.featured ? 'border-2 border-primary/20 shadow-lg' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{method.icon}</span>
                      <CardTitle className="text-xl">
                        {method.title}
                        {method.featured && <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Recommended</span>}
                      </CardTitle>
                    </div>
                    <CardDescription>
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{method.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Response Time:</span>
                        <span className="font-medium">{method.response}</span>
                      </div>
                      <Button className="w-full mt-4" variant={method.featured ? 'default' : 'outline'}>
                        <a href={`mailto:${method.email}`}>
                          {method.cta}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* FAQ Highlights */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Support FAQ
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Common questions about getting help with FrameFinder
              </p>
            </div>

            <div className="mx-auto max-w-4xl space-y-6">
              {faqHighlights.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/faq">
                  View All FAQs
                  <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Emergency Support */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl">
              <Card>
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
                  <p className="text-muted-foreground mb-6">
                    For urgent technical issues or time-sensitive questions, we offer expedited support options.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2">⚡</div>
                      <h3 className="font-semibold mb-2">Priority Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Technical issues preventing AI analysis
                      </p>
                      <Button variant="outline">
                        <a href="mailto:support@framefinder.com?subject=URGENT: Technical Issue">
                          Contact Support
                        </a>
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl mb-2">📱</div>
                      <h3 className="font-semibold mb-2">Live Chat</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Real-time assistance during business hours
                      </p>
                      <Button variant="outline">
                        <span>Coming Soon</span>
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
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Try our AI face shape analysis to discover your perfect eyewear style. Need help? Our support team is ready to assist.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/face-analysis">
                    Start Face Analysis
                    <span className="ml-2">📸</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg">
                  <a href="mailto:support@framefinder.com?subject=FrameFinder Support Request">
                    Get Support
                    <span className="ml-2">🛠️</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}