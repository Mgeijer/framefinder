import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms of Service - FrameFinder',
  description: 'FrameFinder Terms of Service - Rules and guidelines for using our face shape analysis tool.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 1, 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  By using FrameFinder, you agree to these terms of service. If you don't agree with these terms, 
                  please don't use our service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Description</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  FrameFinder provides a free, browser-based face shape analysis tool to help users discover 
                  suitable eyewear styles. Our service:
                </p>
                <ul>
                  <li>Analyzes facial features using AI technology</li>
                  <li>Provides general eyewear recommendations</li>
                  <li>Operates entirely in your browser for privacy</li>
                  <li>Is provided "as is" without warranties</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>When using FrameFinder, you agree to:</p>
                <ul>
                  <li>Use the service for personal, non-commercial purposes</li>
                  <li>Not attempt to reverse engineer or copy our technology</li>
                  <li>Not use the service for any illegal or harmful purposes</li>
                  <li>Understand that results are suggestions, not professional advice</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disclaimers</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>Important disclaimers about our service:</p>
                <ul>
                  <li>Face shape analysis results are automated suggestions only</li>
                  <li>Results should not replace professional optician advice</li>
                  <li>We make no guarantees about accuracy or suitability</li>
                  <li>Individual results may vary based on photo quality and lighting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  FrameFinder is provided free of charge as an informational tool. We are not liable for:
                </p>
                <ul>
                  <li>Decisions made based on our recommendations</li>
                  <li>Any dissatisfaction with eyewear purchases</li>
                  <li>Technical issues or service interruptions</li>
                  <li>Any indirect or consequential damages</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We may update these terms occasionally. Significant changes will be reflected in the 
                  "Last updated" date above. Continued use of the service after changes constitutes acceptance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Questions about these terms? Contact us through our website's contact form.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}