'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Share2, 
  Copy, 
  Check, 
  Facebook, 
  Twitter, 
  Instagram, 
  MessageCircle,
  Mail,
  Download,
  Link
} from 'lucide-react';
import { AnalysisResult } from '@/types';
import { shareableImageGenerator } from '@/lib/shareableImageGenerator';

interface SocialShareProps {
  result: AnalysisResult;
  imageUrl?: string;
}

export default function SocialShare({ result, imageUrl }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [lastGeneratedImage, setLastGeneratedImage] = useState<string | null>(null);
  const [shareStep, setShareStep] = useState<'idle' | 'generating' | 'ready' | 'shared'>('idle');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://framefinder2.vercel.app';
  const shareText = `I just discovered my face shape is ${result.faceShape.displayName}! Check out FrameFinder for AI-powered face shape analysis and personalized eyewear recommendations. ${baseUrl}`;
  const hashtagText = '#FrameFinder #FaceShape #Eyewear #AI #PersonalStyle';
  const fullShareText = `${shareText} ${hashtagText}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullShareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateShareableImage = async (format: 'desktop' | 'mobile') => {
    if (!imageUrl) return null;
    
    setGeneratingImage(true);
    try {
      const shareableImage = await shareableImageGenerator.generateShareableImage(
        result,
        imageUrl,
        { format, includePhoto: true }
      );
      setLastGeneratedImage(shareableImage);
      return shareableImage;
    } catch (error) {
      console.error('Failed to generate shareable image:', error);
      return null;
    } finally {
      setGeneratingImage(false);
    }
  };

  const downloadResults = async (format: 'desktop' | 'mobile' = 'desktop') => {
    setDownloading(true);
    try {
      const shareableImage = await generateShareableImage(format);
      if (shareableImage) {
        // Convert data URL to blob and download
        const response = await fetch(shareableImage);
        const blob = await response.blob();
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `framefinder-${result.faceShape.id}-${format}-share.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to download shareable image:', error);
    } finally {
      setDownloading(false);
    }
  };

  const shareToFacebook = async () => {
    // Download desktop image for user to upload
    await downloadResults('desktop');
    
    // Show instructions
    setShowInstructions(true);
    setTimeout(() => setShowInstructions(false), 8000);
    
    // Open Facebook after delay
    setTimeout(() => {
      const url = encodeURIComponent(baseUrl);
      const text = encodeURIComponent(shareText);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    }, 1000);
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(fullShareText);
    const url = encodeURIComponent(baseUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareToInstagram = async () => {
    setShareStep('generating');
    
    // Generate and show preview image
    const shareableImage = await generateShareableImage('mobile');
    if (shareableImage) {
      setLastGeneratedImage(shareableImage);
      setShareStep('ready');
      
      // Copy text to clipboard
      copyToClipboard();
      
      // Show instructions with image preview
      setShowInstructions(true);
    }
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(fullShareText);
    if (typeof window !== 'undefined' && /Android|iPhone/i.test(navigator.userAgent)) {
      window.open(`whatsapp://send?text=${text}`, '_blank');
    } else {
      window.open(`https://web.whatsapp.com/send?text=${text}`, '_blank');
    }
  };

  const shareToEmail = () => {
    const subject = encodeURIComponent('Check out my FrameFinder face shape analysis!');
    const body = encodeURIComponent(fullShareText);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const shareToMessages = () => {
    const text = encodeURIComponent(fullShareText);
    if (typeof window !== 'undefined' && /iPhone|iPad/i.test(navigator.userAgent)) {
      window.open(`sms:&body=${text}`, '_blank');
    } else {
      // Fallback to copying text
      copyToClipboard();
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FrameFinder Face Shape Analysis',
          text: shareText,
          url: baseUrl,
        });
      } catch (err) {
        console.log('Native sharing cancelled or failed:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share Your Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Share Instructions with Preview */}
        {showInstructions && lastGeneratedImage && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Preview Image */}
              <div className="space-y-2">
                <h4 className="font-medium text-blue-900">Your Shareable Image:</h4>
                <img 
                  src={lastGeneratedImage} 
                  alt="Generated share image preview"
                  className="w-full max-w-xs mx-auto rounded-lg shadow-md border"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.download = `framefinder-${result.faceShape.id}-share.png`;
                      link.href = lastGeneratedImage;
                      link.click();
                    }}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Save Image
                  </Button>
                  <Button
                    onClick={() => {
                      if (typeof window !== 'undefined' && /iPhone|iPad|Android/i.test(navigator.userAgent)) {
                        window.open('instagram://', '_blank');
                      } else {
                        window.open('https://www.instagram.com/', '_blank');
                      }
                      setShareStep('shared');
                    }}
                    size="sm"
                    className="flex-1"
                  >
                    <Instagram className="h-3 w-3 mr-1" />
                    Open Instagram
                  </Button>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="space-y-3">
                <h4 className="font-medium text-blue-900">How to Share:</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    <span>Save the image to your device (button above)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    <span>Open Instagram and create a new post</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                    <span>Select the saved image from your photos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                    <span>Paste the copied text as your caption</span>
                  </div>
                </div>
                <div className="bg-white/60 p-3 rounded border border-blue-200">
                  <p className="text-xs text-blue-600 font-medium mb-1">✅ Text copied to clipboard:</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    {shareText.substring(0, 100)}...
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setShowInstructions(false);
                    setShareStep('idle');
                    setLastGeneratedImage(null);
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Got it!
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Text */}
        <div className="bg-muted/50 p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {shareText}
          </p>
          <p className="text-sm text-primary mt-2">{hashtagText}</p>
        </div>

        {/* Social Media Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button
            onClick={shareToFacebook}
            variant="outline"
            className="flex items-center gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>

          <Button
            onClick={shareToTwitter}
            variant="outline"
            className="flex items-center gap-2 text-sky-600 border-sky-200 hover:bg-sky-50"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>

          <Button
            onClick={shareToInstagram}
            variant="outline"
            className="flex items-center gap-2 text-pink-600 border-pink-200 hover:bg-pink-50"
            disabled={shareStep === 'generating' || generatingImage}
          >
            {shareStep === 'generating' ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-pink-600 border-t-transparent" />
                Creating...
              </>
            ) : (
              <>
                <Instagram className="h-4 w-4" />
                Instagram
              </>
            )}
          </Button>

          <Button
            onClick={shareToWhatsApp}
            variant="outline"
            className="flex items-center gap-2 text-green-600 border-green-200 hover:bg-green-50"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
        </div>

        {/* Additional Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={shareToEmail}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Email
          </Button>

          <Button
            onClick={shareToMessages}
            variant="outline"
            className="flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Messages
          </Button>
        </div>

        {/* Download Options */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">Download Shareable Images</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={() => downloadResults('desktop')}
              variant="outline"
              className="flex items-center gap-2"
              disabled={downloading || generatingImage || !imageUrl}
            >
              <Download className="h-4 w-4" />
              {downloading ? 'Creating...' : 'Desktop Format'}
            </Button>

            <Button
              onClick={() => downloadResults('mobile')}
              variant="outline"
              className="flex items-center gap-2"
              disabled={downloading || generatingImage || !imageUrl}
            >
              <Download className="h-4 w-4" />
              {downloading ? 'Creating...' : 'Mobile/Instagram'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Desktop: 1200x630 (perfect for Facebook, Twitter) • Mobile: 1080x1080 (perfect for Instagram)
          </p>
        </div>

        {/* Copy Link & Native Share */}
        <div className="flex gap-3">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="flex-1 flex items-center gap-2"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </Button>

          {typeof window !== 'undefined' && navigator.share !== undefined && (
            <Button
              onClick={nativeShare}
              variant="default"
              className="flex-1 flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}