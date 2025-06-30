import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About FrameFinder - AI-Powered Face Shape Analysis & Eyewear Expertise',
  description: 'Learn about FrameFinder\'s mission to help everyone find perfect eyewear using advanced AI technology. Meet our team of style experts and discover our innovative approach.',
  keywords: 'about FrameFinder, AI face analysis, eyewear experts, face shape technology, optical innovation, style consultants',
  openGraph: {
    title: 'About FrameFinder - AI-Powered Face Shape Analysis & Eyewear Expertise',
    description: 'Learn about FrameFinder\'s mission to help everyone find perfect eyewear using advanced AI technology.',
    type: 'website',
    images: ['/images/og/about.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
};


const coreValues = [
  {
    icon: '🎯',
    label: 'Precision Focus',
    description: 'Continuous refinement of our analysis algorithms for accurate results'
  },
  {
    icon: '🚀',
    label: 'Innovation Driven',
    description: 'Leveraging cutting-edge AI technology for personalized recommendations'
  },
  {
    icon: '🤝',
    label: 'User Centered',
    description: 'Designing every feature with user experience and satisfaction in mind'
  },
  {
    icon: '🌍',
    label: 'Globally Accessible',
    description: 'Making professional eyewear guidance available to everyone, everywhere'
  }
];

const values = [
  {
    icon: '🎯',
    title: 'Accuracy First',
    description: 'We\'re committed to providing the most accurate face shape analysis using cutting-edge AI technology and continuous improvement.',
  },
  {
    icon: '🤝',
    title: 'Accessibility',
    description: 'Everyone deserves to look and feel their best. Our tools are designed to be accessible, intuitive, and helpful for all users.',
  },
  {
    icon: '🔒',
    title: 'Privacy Protection',
    description: 'Your photos and personal data are secure. We never store images permanently or share your information with third parties.',
  },
  {
    icon: '📚',
    title: 'Education',
    description: 'We believe in empowering users with knowledge. Our guides and tips help you make informed decisions about eyewear.',
  },
  {
    icon: '🚀',
    title: 'Innovation',
    description: 'We continuously invest in research and development to improve our technology and expand our capabilities.',
  },
  {
    icon: '🌍',
    title: 'Sustainability',
    description: 'We promote sustainable eyewear choices and partner with eco-conscious brands to protect our planet.',
  }
];


export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FrameFinder',
    description: 'AI-powered face shape analysis and eyewear recommendation platform',
    url: 'https://framefinder.com',
    applicationCategory: 'AI Technology',
    serviceType: 'Face Shape Analysis'
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
                🏢 About FrameFinder
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Revolutionizing Eyewear Selection
              </h1>
              
              <p className="mb-8 text-xl text-muted-foreground sm:text-2xl lg:text-xl lg:leading-8">
                We combine cutting-edge AI technology with expert styling knowledge to help everyone 
                find the perfect eyewear that enhances their natural beauty and personal style.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/face-analysis">
                    Try Our Technology
                    <span className="ml-2">🚀</span>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" asChild>
                  <Link href="#our-story">
                    Learn Our Story
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
                Our Mission
              </h2>
              <Card>
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    At FrameFinder, we believe that the perfect pair of glasses can transform not just how you see, 
                    but how you feel about yourself. Our mission is to democratize access to professional eyewear 
                    consulting through innovative AI technology, making expert-level face shape analysis and style 
                    recommendations available to everyone, anywhere, at any time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Approach
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The principles that drive our technology and service development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="text-4xl mb-4">
                      {value.icon}
                    </div>
                    <CardTitle className="text-lg">
                      {value.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Technology */}
        <section id="our-story" className="px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
                Our Technology
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <div className="text-3xl mb-2">🧠</div>
                    <CardTitle>Advanced AI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Our machine learning algorithms analyze thousands of facial landmarks 
                      to determine face shape with industry-leading accuracy.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="text-3xl mb-2">👁️</div>
                    <CardTitle>Computer Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Cutting-edge image processing technology that works with any clear 
                      photo, providing consistent results across devices.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="text-3xl mb-2">🎨</div>
                    <CardTitle>Style Intelligence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Expert-curated recommendations based on proven styling principles 
                      and current fashion trends.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Values
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="text-4xl mb-2">{value.icon}</div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
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
                Join Our Community
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience the difference that expert-level face shape analysis can make in finding your perfect eyewear.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/face-analysis">
                    Analyze My Face
                    <span className="ml-2">📸</span>
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