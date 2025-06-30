import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy - FrameFinder',
  description: 'FrameFinder Privacy Policy - How we handle your data and protect your privacy when using our face shape analysis tool.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 1, 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Data Collection</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  FrameFinder is a client-side application that performs face shape analysis directly in your browser. 
                  We are committed to protecting your privacy and being transparent about our data practices.
                </p>
                <h4>What we collect:</h4>
                <ul>
                  <li>Basic analytics data (page views, device type, general location)</li>
                  <li>Error logs to improve our service</li>
                  <li>User feedback when voluntarily provided</li>
                </ul>
                <h4>What we DON'T collect:</h4>
                <ul>
                  <li>Your photos or facial images</li>
                  <li>Personal identifying information</li>
                  <li>Face analysis results</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How Your Photos Are Handled</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Your privacy is our top priority. All face analysis happens locally in your browser:
                </p>
                <ul>
                  <li>Photos are processed entirely on your device</li>
                  <li>No images are uploaded to our servers</li>
                  <li>No facial data is stored or transmitted</li>
                  <li>You can use the service completely offline after the initial page load</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics and Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We use PostHog for privacy-focused analytics to understand how users interact with our service:
                </p>
                <ul>
                  <li>No personal information is collected</li>
                  <li>Data is anonymized and aggregated</li>
                  <li>Used only to improve user experience</li>
                  <li>You can opt out by disabling JavaScript</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>Our website uses:</p>
                <ul>
                  <li><strong>Vercel:</strong> Hosting and content delivery</li>
                  <li><strong>PostHog:</strong> Privacy-focused analytics</li>
                  <li><strong>Google AdSense:</strong> Advertisement serving</li>
                </ul>
                <p>These services have their own privacy policies which govern their data collection practices.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>Since we don't collect personal data, there's minimal data to manage. However:</p>
                <ul>
                  <li>You can clear your browser data at any time</li>
                  <li>You can disable analytics by blocking JavaScript</li>
                  <li>You can contact us with any privacy concerns</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  If you have questions about this privacy policy, please contact us through our website's contact form.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}