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

interface SocialShareProps {
  result: AnalysisResult;
  imageUrl?: string;
}

export default function SocialShare({ result, imageUrl }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

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

  const downloadResults = async () => {
    if (!imageUrl) return;
    
    setDownloading(true);
    try {
      // Create a canvas to generate a shareable image with results
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = 800;
      canvas.height = 600;

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load and draw the user's image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Draw user image (left side)
      const imgSize = 300;
      const imgX = 50;
      const imgY = 50;
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

      // Add text content (right side)
      const textX = imgX + imgSize + 50;
      const textY = 80;

      // Title
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 32px Arial';
      ctx.fillText('My Face Shape', textX, textY);

      // Face shape result
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(result.faceShape.displayName, textX, textY + 50);

      // Confidence
      ctx.fillStyle = '#6b7280';
      ctx.font = '20px Arial';
      ctx.fillText(`${Math.round(result.confidence * 100)}% confidence`, textX, textY + 85);

      // Description
      ctx.fillStyle = '#374151';
      ctx.font = '16px Arial';
      const words = result.faceShape.description.split(' ');
      let line = '';
      let lineY = textY + 120;
      const maxWidth = 300;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && i > 0) {
          ctx.fillText(line, textX, lineY);
          line = words[i] + ' ';
          lineY += 25;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, textX, lineY);

      // Branding
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('FrameFinder.ai', textX, canvas.height - 80);
      
      ctx.fillStyle = '#6b7280';
      ctx.font = '14px Arial';
      ctx.fillText('AI-Powered Face Shape Analysis', textX, canvas.height - 50);

      // Download the image
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `framefinder-${result.faceShape.id}-analysis.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');

    } catch (error) {
      console.error('Failed to generate shareable image:', error);
    } finally {
      setDownloading(false);
    }
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(baseUrl);
    const text = encodeURIComponent(shareText);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(fullShareText);
    const url = encodeURIComponent(baseUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(baseUrl);
    const title = encodeURIComponent('FrameFinder - AI Face Shape Analysis');
    const summary = encodeURIComponent(shareText);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
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
        {/* Preview Text */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-700 leading-relaxed">
            {shareText}
          </p>
          <p className="text-sm text-blue-600 mt-2">{hashtagText}</p>
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
            onClick={shareToLinkedIn}
            variant="outline"
            className="flex items-center gap-2 text-blue-700 border-blue-200 hover:bg-blue-50"
          >
            <Link className="h-4 w-4" />
            LinkedIn
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

          <Button
            onClick={downloadResults}
            variant="outline"
            className="flex items-center gap-2"
            disabled={downloading || !imageUrl}
          >
            <Download className="h-4 w-4" />
            {downloading ? 'Creating...' : 'Download'}
          </Button>
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