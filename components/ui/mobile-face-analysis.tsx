'use client';

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, RotateCcw, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { faceDetectionService } from '@/lib/faceDetection';
import { AnalysisResult } from '@/types';
import { validateImageFile, resizeImage } from '@/lib/utils';
import SocialShare from '@/components/ui/social-share';

interface MobileFaceAnalysisProps {
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

type AnalysisState = 'idle' | 'initializing' | 'analyzing' | 'complete' | 'error';

export default function MobileFaceAnalysis({ onAnalysisComplete }: MobileFaceAnalysisProps) {
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [useCamera, setUseCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setUseCamera(false);
    }
  }, [webcamRef]);

  const analyzeImage = async (imageData: string) => {
    setAnalysisState('analyzing');
    setError(null);
    setProgress(0);

    try {
      if (!faceDetectionService.isReady()) {
        setAnalysisState('initializing');
        await faceDetectionService.initialize();
      }

      setProgress(50);
      const analysisResult = await faceDetectionService.analyzeImage(imageData);
      setProgress(100);
      
      setResult(analysisResult);
      setAnalysisState('complete');
      onAnalysisComplete?.(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      setAnalysisState('error');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    try {
      const resizedBlob = await resizeImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(resizedBlob);
    } catch (err) {
      setError('Failed to process image');
    }
  };

  const resetAnalysis = () => {
    setAnalysisState('idle');
    setError(null);
    setResult(null);
    setCapturedImage(null);
    setProgress(0);
  };

  // Mobile-optimized video constraints
  const videoConstraints = {
    width: { min: 320, ideal: 640, max: 1280 },
    height: { min: 240, ideal: 480, max: 720 },
    facingMode: 'user',
    aspectRatio: 4/3
  };

  if (analysisState === 'complete' && result) {
    return (
      <div className="w-full max-w-md mx-auto space-y-4">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl text-green-800">Analysis Complete!</CardTitle>
            <CardDescription className="text-green-600">
              Your face shape: <span className="font-semibold">{result.faceShape.displayName}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Confidence Score</div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(result.confidence * 100)}%
              </div>
            </div>
            
            <div className="flex gap-2 mb-4">
              <Button 
                onClick={resetAnalysis} 
                variant="outline" 
                className="flex-1 h-12 text-lg touch-target"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
              <Button 
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="flex-1 h-12 text-lg touch-target"
              >
                View Frames
              </Button>
            </div>
            
            {/* Social Sharing for Mobile */}
            <SocialShare result={result} imageUrl={capturedImage || undefined} />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (useCamera) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg">Position Your Face</CardTitle>
            <CardDescription>Center your face in the frame</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full h-full object-cover"
                mirrored
              />
              <div className="absolute inset-4 border-2 border-white/50 rounded-full" />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => setUseCamera(false)} 
                variant="outline" 
                className="flex-1 h-12 touch-target"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={capture}
                className="flex-1 h-12 text-lg touch-target bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="w-5 h-5 mr-2" />
                Capture
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {analysisState === 'error' && error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-red-800 text-center text-sm">{error}</p>
            <Button 
              onClick={resetAnalysis} 
              variant="outline" 
              className="w-full mt-4 h-10 touch-target"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {(analysisState === 'initializing' || analysisState === 'analyzing') && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
              <div>
                <p className="font-medium">
                  {analysisState === 'initializing' ? 'Initializing AI...' : 'Analyzing Your Face...'}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {capturedImage && analysisState === 'idle' && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={resetAnalysis} 
                  variant="outline" 
                  className="flex-1 h-12 touch-target"
                >
                  Retake
                </Button>
                <Button 
                  onClick={() => analyzeImage(capturedImage)}
                  className="flex-1 h-12 text-lg touch-target"
                >
                  Analyze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {analysisState === 'idle' && !capturedImage && (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Face Shape Analysis</CardTitle>
            <CardDescription>
              Take a photo or upload an image to discover your face shape
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setUseCamera(true)}
              className="w-full h-14 text-lg touch-target bg-blue-600 hover:bg-blue-700"
            >
              <Camera className="w-6 h-6 mr-3" />
              Take Photo
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full h-14 text-lg touch-target"
            >
              <Upload className="w-6 h-6 mr-3" />
              Upload Photo
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}