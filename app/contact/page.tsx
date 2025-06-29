import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact FrameFinder - Expert Eyewear Consultation & Support',
  description: 'Get in touch with FrameFinder for personalized eyewear consultations, technical support, or partnership inquiries. Expert guidance for all your face shape and styling questions.',
  keywords: 'contact FrameFinder, eyewear consultation, face shape expert, technical support, partnership inquiries, styling consultation',
  openGraph: {
    title: 'Contact FrameFinder - Expert Eyewear Consultation & Support',
    description: 'Get in touch with FrameFinder for personalized eyewear consultations and expert guidance.',
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
    description: 'Questions about our service, features, or general support',
    email: 'hello@framefinder.com',
    response: 'Within 24 hours',
    cta: 'Send Message'
  },
  {
    title: 'Expert Consultation',
    icon: '👨‍💼',
    description: 'Personalized styling advice from our expert opticians and stylists',
    email: 'consultation@framefinder.com',
    response: 'Within 2 business days',
    cta: 'Book Consultation',
    featured: true
  },
  {
    title: 'Technical Support',
    icon: '🛠️',
    description: 'Help with AI analysis, photo uploads, or technical issues',
    email: 'support@framefinder.com',
    response: 'Within 12 hours',
    cta: 'Get Help'
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

const consultationServices = [
  {
    service: 'Personal Style Analysis',
    description: 'Comprehensive face shape analysis with personalized frame recommendations',
    duration: '30 minutes',
    includes: ['Detailed face shape assessment', 'Color matching guidance', 'Frame style recommendations', 'Shopping guidance'],
    ideal: 'First-time glasses wearers or major style changes'
  },
  {
    service: 'Professional Wardrobe Consultation',
    description: 'Eyewear selection for professional environments and career advancement',
    duration: '45 minutes',
    includes: ['Industry-specific recommendations', 'Multiple style options', 'Brand suggestions', 'Budget planning'],
    ideal: 'Career professionals and executives'
  },
  {
    service: 'Lifestyle Matching Service',
    description: 'Frame selection based on your daily activities and lifestyle needs',
    duration: '30 minutes',
    includes: ['Activity-based recommendations', 'Durability considerations', 'Multi-pair strategies', 'Care instructions'],
    ideal: 'Active individuals and families'
  }
];

const faqHighlights = [
  {
    question: 'How does the expert consultation work?',
    answer: 'Our consultations are conducted via video call with certified opticians and style experts. We review your AI analysis results, discuss your preferences and lifestyle, and provide personalized recommendations.'
  },
  {
    question: 'Is there a cost for consultations?',
    answer: 'Initial consultations are complimentary for users who have completed our AI face shape analysis. Extended styling sessions and follow-up consultations may have associated fees.'
  },
  {
    question: 'Can you help me shop for frames online?',
    answer: 'Absolutely! Our experts can guide you through online shopping, recommend specific retailers, and even provide virtual try-on sessions to help you make confident decisions.'
  }
];

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact FrameFinder',
    description: 'Get in touch with FrameFinder for expert eyewear consultations and support',
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
                📞 Get Expert Guidance
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Contact Our Experts
              </h1>
              
              <p className="mb-8 text-xl text-muted-foreground sm:text-2xl lg:text-xl lg:leading-8">
                Get personalized eyewear consultations from certified opticians and style experts. 
                Whether you need technical support or professional styling advice, we're here to help.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="#consultation">
                    Book Free Consultation
                    <span className="ml-2">👨‍💼</span>
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

        {/* Featured Consultation CTA */}
        <section id="consultation" className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl">
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">👨‍💼</span>
                  </div>
                  <CardTitle className="text-3xl">Free Expert Consultation</CardTitle>
                  <CardDescription className="text-lg">
                    Get personalized advice from certified opticians and style experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">What You Get:</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-sm">Detailed review of your AI analysis results</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-sm">Personalized frame recommendations based on lifestyle</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-sm">Color matching and material guidance</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-sm">Shopping guidance and brand recommendations</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          <span className="text-sm">Follow-up support for final decisions</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-accent/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary">30 Minutes</div>
                        <div className="text-sm text-muted-foreground">Video consultation</div>
                      </div>
                      <div className="bg-accent/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary">100% Free</div>
                        <div className="text-sm text-muted-foreground">No hidden costs</div>
                      </div>
                      <div className="bg-accent/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary">Expert Led</div>
                        <div className="text-sm text-muted-foreground">Certified professionals</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button size="lg" className="text-lg px-8 py-4">
                      <a href="mailto:consultation@framefinder.com?subject=Free Expert Consultation Request&body=I would like to schedule a free consultation to discuss my eyewear needs. I have completed the AI face shape analysis and would like personalized recommendations.">
                        Schedule Free Consultation
                        <span className="ml-2">📅</span>
                      </a>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      We recommend completing your face analysis first for personalized guidance
                    </p>
                  </div>
                </CardContent>
              </Card>
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

        {/* Consultation Services */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Expert Consultation Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Professional guidance tailored to your specific needs and lifestyle
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {consultationServices.map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{service.service}</CardTitle>
                    <CardDescription>
                      {service.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-sm mt-3">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                        {service.duration}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Includes:</h4>
                        <ul className="space-y-1">
                          {service.includes.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start text-xs text-muted-foreground">
                              <span className="text-primary mr-2 mt-0.5">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1 text-sm">Ideal For:</h4>
                        <p className="text-xs text-muted-foreground">{service.ideal}</p>
                      </div>

                      <Button className="w-full" variant="outline">
                        <a href={`mailto:consultation@framefinder.com?subject=${service.service} Consultation Request`}>
                          Book This Service
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
                Consultation FAQ
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Common questions about our expert consultation services
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
                Complete your AI face shape analysis first, then book a consultation for personalized recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/face-analysis">
                    Start Face Analysis
                    <span className="ml-2">📸</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg">
                  <a href="mailto:consultation@framefinder.com?subject=Expert Consultation Request">
                    Book Consultation
                    <span className="ml-2">👨‍💼</span>
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