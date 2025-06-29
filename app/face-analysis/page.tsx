'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import Link from 'next/link';
import FaceAnalysis from '@/components/FaceAnalysis';
import { AnalysisResult } from '@/types';
import { features } from '@/lib/features';

export default function FaceAnalysisPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    
    // Track analytics event
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('face_analysis_completed', {
        face_shape: result.faceShape.name,
        confidence: result.confidence,
        num_recommendations: result.recommendations.length
      });
    }
  };

  const handleShare = async () => {
    if (!analysisResult) return;

    if ((navigator as any).share) {
      try {
        await (navigator as any).share({
          title: `My Face Shape: ${analysisResult.faceShape.displayName}`,
          text: `I discovered my face shape is ${analysisResult.faceShape.displayName} using FrameFinder! Check out my personalized eyeglass recommendations.`,
          url: window.location.origin
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `I discovered my face shape is ${analysisResult.faceShape.displayName} using FrameFinder! Check it out at ${window.location.origin}`;
      navigator.clipboard.writeText(shareText);
      alert('Share text copied to clipboard!');
    }

    // Track analytics
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('analysis_shared', {
        face_shape: analysisResult.faceShape.name,
        method: (navigator as any).share ? 'native' : 'clipboard'
      });
    }
  };

  const handleDownload = () => {
    if (!analysisResult) return;

    const reportData = {
      faceShape: analysisResult.faceShape.displayName,
      confidence: Math.round(analysisResult.confidence * 100),
      characteristics: analysisResult.faceShape.characteristics,
      recommendations: analysisResult.recommendations.map(frame => ({
        name: frame.name,
        category: frame.category,
        description: frame.description,
        features: frame.features
      })),
      stylingTips: analysisResult.stylingTips,
      generatedAt: new Date().toLocaleDateString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `framefinder-analysis-${analysisResult.faceShape.name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Track analytics
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('analysis_downloaded', {
        face_shape: analysisResult.faceShape.name
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Face Shape Analysis</h1>
                <p className="text-sm text-gray-600">Discover your perfect eyeglass style</p>
              </div>
            </div>
            
            {analysisResult && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden lg:block w-80 pr-8">
            <div className="sticky top-8 space-y-4">
              {/* Ad Space - Only show when ads are enabled */}
              {features.ads.sidebarAd && (
                <div className="ad-container h-64 rounded-lg">
                  {/* Actual ad content will go here when enabled */}
                </div>
              )}
              
              {/* Tips Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">💡 Analysis Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>For the most accurate results:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Use good lighting</li>
                    <li>• Face the camera directly</li>
                    <li>• Remove glasses</li>
                    <li>• Keep hair away from face</li>
                    <li>• Maintain neutral expression</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Alternative Face Shapes */}
              {analysisResult && analysisResult.alternativeShapes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Alternative Shapes</CardTitle>
                    <CardDescription className="text-sm">
                      Other possible matches for your face
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysisResult.alternativeShapes.slice(0, 3).map((alt, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{alt.shape.displayName}</span>
                        <span className="text-gray-500">
                          {Math.round(alt.confidence * 100)}%
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </aside>

          {/* Main Analysis Component */}
          <div className="flex-1">
            <FaceAnalysis onAnalysisComplete={handleAnalysisComplete} />
            
            {/* Additional Information */}
            {analysisResult && (
              <div className="mt-8 space-y-6">
                {/* Celebrity Matches */}
                <Card>
                  <CardHeader>
                    <CardTitle>Celebrity Style Inspiration</CardTitle>
                    <CardDescription>
                      Celebrities with similar {analysisResult.faceShape.displayName.toLowerCase()} face shapes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.faceShape.celebrities.map((celebrity, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {celebrity}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* What to Avoid */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frames to Avoid</CardTitle>
                    <CardDescription>
                      Frame styles that may not complement your {analysisResult.faceShape.displayName.toLowerCase()} face shape
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {analysisResult.faceShape.avoidFrames.map((avoid, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <span className="text-red-500">❌</span>
                          {avoid}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                    <CardDescription>
                      Ready to find your perfect frames?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button variant="outline" asChild>
                        <Link href="/guide">
                          📚 Learn More About Face Shapes
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/style-tips">
                          💄 Get More Styling Tips
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-3">
                        Ready to shop? Check out these popular eyewear retailers:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <a 
                          href="https://www.warbyparker.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200 transition-colors"
                        >
                          Warby Parker
                        </a>
                        <a 
                          href="https://www.zennioptical.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200 transition-colors"
                        >
                          Zenni Optical
                        </a>
                        <a 
                          href="https://www.eyebuydirect.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm hover:bg-purple-200 transition-colors"
                        >
                          EyeBuyDirect
                        </a>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        * FrameFinder may earn a commission from purchases made through these links
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Ad Space - Only show when ads are enabled */}
      {features.ads.bottomAd && (
        <div className="container mx-auto px-4 py-4">
          <div className="ad-container h-20 rounded-lg">
            {/* Actual ad content will go here when enabled */}
          </div>
        </div>
      )}
    </div>
  );
}