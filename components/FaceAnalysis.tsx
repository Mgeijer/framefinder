'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Camera, Upload, RotateCcw, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { simpleFaceAnalysis } from '@/lib/simpleFaceAnalysis';
import { AnalysisResult } from '@/types';
import { validateImageFile, resizeImage } from '@/lib/utils';
import SocialShare from '@/components/ui/social-share';

interface FaceAnalysisProps {
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

type AnalysisState = 'idle' | 'initializing' | 'analyzing' | 'complete' | 'error';

export default function FaceAnalysis({ onAnalysisComplete }: FaceAnalysisProps) {
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [useCamera, setUseCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simple face analysis doesn't need initialization
  const initializeIfNeeded = async () => {
    return true; // Always ready
  };

  const resetAnalysis = useCallback(() => {
    setAnalysisState('idle');
    setError(null);
    setResult(null);
    setCapturedImage(null);
    setProgress(0);
  }, []);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      setAnalysisState('error');
      return;
    }

    // No initialization needed for simple analysis

    setAnalysisState('analyzing');
    setProgress(20);

    try {
      // Resize image for better performance
      const resizedBlob = await resizeImage(file, 800);
      const resizedFile = new File([resizedBlob], file.name, { type: 'image/jpeg' });
      
      setProgress(60);

      // Analyze face
      const analysisResult = await simpleFaceAnalysis.analyzeFaceFromFile(resizedFile);
      
      setProgress(100);
      setResult(analysisResult);
      setAnalysisState('complete');
      
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisResult);
      }
      
      // Create preview URL
      setCapturedImage(URL.createObjectURL(resizedFile));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      setAnalysisState('error');
    }

    // Reset file input
    event.target.value = '';
  }, [onAnalysisComplete]);

  const capturePhoto = useCallback(async () => {
    if (!webcamRef.current) return;

    // No initialization needed for simple analysis

    setAnalysisState('analyzing');
    setProgress(20);

    try {
      // Capture image from webcam
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        throw new Error('Failed to capture image from camera');
      }

      setCapturedImage(imageSrc);
      setProgress(40);

      // Convert to canvas for analysis
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        setProgress(60);

        try {
          const analysisResult = await simpleFaceAnalysis.analyzeFaceFromCanvas(canvas);
          
          setProgress(100);
          setResult(analysisResult);
          setAnalysisState('complete');
          
          if (onAnalysisComplete) {
            onAnalysisComplete(analysisResult);
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
          setError(errorMessage);
          setAnalysisState('error');
        }
      };
      img.src = imageSrc;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to capture photo';
      setError(errorMessage);
      setAnalysisState('error');
    }
  }, [onAnalysisComplete]);

  const formatConfidence = (confidence: number): string => {
    return `${Math.round(confidence * 100)}%`;
  };

  if (analysisState === 'initializing') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Initializing AI Model
          </CardTitle>
          <CardDescription>
            Preparing face analysis... This should only take a moment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (analysisState === 'complete' && result) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-primary">
            <CheckCircle2 className="h-6 w-6" />
            Analysis Complete!
          </CardTitle>
          <CardDescription>
            Your face shape has been identified with AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Captured Image */}
            {capturedImage && (
              <div className="space-y-2">
                <h3 className="font-semibold">Your Photo</h3>
                <OptimizedImage
                  src={capturedImage} 
                  alt="Captured face for analysis"
                  width={400}
                  height={300}
                  className="w-full rounded-lg shadow-md"
                  sizes="(max-width: 768px) 100vw, 400px"
                  quality={90}
                />
              </div>
            )}

            {/* Results */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Your Face Shape</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default" className="text-lg px-3 py-1">
                    {result.faceShape.displayName}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatConfidence(result.confidence)} confidence
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {result.faceShape.description}
                </p>
              </div>

              {/* Characteristics */}
              <div>
                <h4 className="font-medium mb-2">Key Characteristics</h4>
                <ul className="text-sm space-y-1">
                  {result.faceShape.characteristics.slice(0, 3).map((characteristic, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {characteristic}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Alternative Shapes */}
              {result.alternativeShapes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Alternative Possibilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.alternativeShapes.slice(0, 2).map((alt, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {alt.shape.displayName} ({formatConfidence(alt.confidence)})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Frame Recommendations */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Recommended Frame Styles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.recommendations.slice(0, 4).map((frame) => (
                <Card key={frame.id} className="p-4">
                  <h4 className="font-medium text-base mb-1">{frame.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{frame.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {frame.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {frame.popularity}% match
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Styling Tips */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Styling Tips</h3>
            <ul className="space-y-2">
              {result.stylingTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Sharing */}
          <SocialShare result={result} imageUrl={capturedImage || undefined} />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button onClick={resetAnalysis} variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Analyze Another Photo
            </Button>
            <Button variant="default" className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Save Results
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (analysisState === 'error') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Analysis Failed
          </CardTitle>
          <CardDescription className="text-destructive">
            {error}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={resetAnalysis} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (analysisState === 'analyzing') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing Your Face Shape
          </CardTitle>
          <CardDescription>
            Analyzing your face shape and generating personalized recommendations...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {progress < 40 ? 'Processing image...' : 
             progress < 80 ? 'Analyzing facial features...' : 
             'Generating recommendations...'}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Main interface
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Face Shape Analysis</CardTitle>
        <CardDescription>
          Upload a photo or use your camera to discover your face shape and get personalized frame recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Method Selection */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant={useCamera ? "outline" : "default"}
            onClick={() => setUseCamera(false)}
            className="flex-1 max-w-xs"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Photo
          </Button>
          <Button
            variant={useCamera ? "default" : "outline"}
            onClick={() => setUseCamera(true)}
            className="flex-1 max-w-xs"
          >
            <Camera className="h-4 w-4 mr-2" />
            Use Camera
          </Button>
        </div>

        {/* Camera Interface */}
        {useCamera ? (
          <div className="space-y-4">
            <div className="relative aspect-video max-w-md mx-auto bg-muted/50 rounded-lg overflow-hidden">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 640,
                  height: 480,
                  facingMode: "user"
                }}
                className="w-full h-full object-cover"
                onUserMediaError={(error) => {
                  console.error('Camera access error:', error);
                  setError('Camera access denied. Please allow camera permissions and ensure you are using HTTPS.');
                  setAnalysisState('error');
                }}
              />
              <div className="absolute inset-4 border-2 border-white/50 rounded-lg pointer-events-none">
                <div className="w-full h-full border border-dashed border-white/30 rounded-lg flex items-center justify-center">
                  <span className="text-white/70 text-sm bg-black/20 px-2 py-1 rounded">
                    Position your face in the frame
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button onClick={capturePhoto} size="lg">
                <Camera className="h-4 w-4 mr-2" />
                📷 Capture & Analyze
              </Button>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              ⚠️ Camera requires HTTPS and permission access
            </div>
          </div>
        ) : (
          /* Upload Interface */
          <div className="space-y-4">
            <div 
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">
                Upload your photo
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or click to select a clear, front-facing photo
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPG, PNG, WebP up to 10MB
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Tips */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-medium text-sm mb-2">📸 Photo Tips for Best Results:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use good lighting with your face clearly visible</li>
            <li>• Face the camera directly with a neutral expression</li>
            <li>• Remove glasses and ensure hair doesn't obscure your face</li>
            <li>• Keep a comfortable distance from the camera</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}