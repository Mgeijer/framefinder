import { AnalysisResult, FaceShape } from '../types';
import { faceShapes, getFaceShapeById } from '../data/face-shapes';

interface FaceDetectionResult {
  width: number;
  height: number;
  landmarks: Array<{ x: number; y: number }>;
}

export class SimpleFaceAnalysis {
  
  // Simulate face detection using basic image analysis
  private async detectFaceFromImage(img: HTMLImageElement): Promise<FaceDetectionResult> {
    // Create a canvas to analyze the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Simple face detection using color analysis
    // Look for skin tone ranges and approximate face boundaries
    let faceTop = canvas.height;
    let faceBottom = 0;
    let faceLeft = canvas.width;
    let faceRight = 0;
    
    // Scan for skin-like pixels (very basic detection)
    for (let y = 0; y < canvas.height; y += 10) {
      for (let x = 0; x < canvas.width; x += 10) {
        const i = (y * canvas.width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Basic skin tone detection
        if (r > 95 && g > 40 && b > 20 && 
            r > g && r > b && 
            Math.abs(r - g) > 15 && 
            r - b > 15) {
          faceTop = Math.min(faceTop, y);
          faceBottom = Math.max(faceBottom, y);
          faceLeft = Math.min(faceLeft, x);
          faceRight = Math.max(faceRight, x);
        }
      }
    }
    
    // If no face detected, use center region
    if (faceTop >= faceBottom) {
      faceTop = canvas.height * 0.2;
      faceBottom = canvas.height * 0.8;
      faceLeft = canvas.width * 0.2;
      faceRight = canvas.width * 0.8;
    }
    
    const faceWidth = faceRight - faceLeft;
    const faceHeight = faceBottom - faceTop;
    
    // Generate approximate landmarks based on face region
    const centerX = faceLeft + faceWidth / 2;
    const centerY = faceTop + faceHeight / 2;
    
    const landmarks = [
      { x: centerX, y: faceTop }, // forehead
      { x: faceLeft + faceWidth * 0.2, y: centerY }, // left cheek
      { x: faceRight - faceWidth * 0.2, y: centerY }, // right cheek
      { x: faceLeft + faceWidth * 0.15, y: faceBottom - faceHeight * 0.2 }, // left jaw
      { x: faceRight - faceWidth * 0.15, y: faceBottom - faceHeight * 0.2 }, // right jaw
      { x: centerX, y: faceBottom }, // chin
      { x: faceLeft + faceWidth * 0.1, y: faceTop + faceHeight * 0.1 }, // left temple
      { x: faceRight - faceWidth * 0.1, y: faceTop + faceHeight * 0.1 }, // right temple
    ];
    
    return {
      width: faceWidth,
      height: faceHeight,
      landmarks
    };
  }
  
  private classifyFaceShape(faceWidth: number, faceHeight: number): { shape: FaceShape; confidence: number } {
    const widthToHeightRatio = faceWidth / faceHeight;
    
    // Simple classification based on width/height ratio
    let bestMatch: { shape: FaceShape; confidence: number } = { 
      shape: faceShapes[0], 
      confidence: 0.7 
    };
    
    if (widthToHeightRatio < 0.9) {
      // Longer face - likely oval or oblong
      bestMatch = { shape: getFaceShapeById('oval')!, confidence: 0.85 };
    } else if (widthToHeightRatio > 1.1) {
      // Wider face - likely round or square
      bestMatch = { shape: getFaceShapeById('round')!, confidence: 0.8 };
    } else if (widthToHeightRatio >= 0.9 && widthToHeightRatio <= 1.1) {
      // Balanced proportions - likely oval or square
      bestMatch = { shape: getFaceShapeById('square')!, confidence: 0.75 };
    }
    
    return bestMatch;
  }
  
  async analyzeImage(imageElement: HTMLImageElement): Promise<AnalysisResult> {
    try {
      // Detect face in image
      const detection = await this.detectFaceFromImage(imageElement);
      
      // Classify face shape
      const classification = this.classifyFaceShape(detection.width, detection.height);
      
      // Create analysis result
      const result: AnalysisResult = {
        faceShape: classification.shape,
        confidence: classification.confidence,
        landmarks: detection.landmarks.map(p => ({ x: p.x, y: p.y, z: 0, confidence: 1.0 })),
        measurements: {
          widthToHeightRatio: detection.width / detection.height,
          jawToForeheadRatio: 0.9, // Approximate
          cheekboneWidth: detection.width * 0.8,
          faceWidth: detection.width,
          faceHeight: detection.height,
          jawWidth: detection.width * 0.7,
          foreheadWidth: detection.width * 0.8
        },
        recommendations: classification.shape.recommendedFrames,
        stylingTips: classification.shape.stylingTips,
        alternativeShapes: this.getAlternativeShapes(classification.shape)
      };
      
      return result;
    } catch (error) {
      throw new Error(`Face analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  private getAlternativeShapes(primaryShape: FaceShape): Array<{ shape: FaceShape; confidence: number }> {
    const alternatives = faceShapes
      .filter(shape => shape.id !== primaryShape.id)
      .slice(0, 3)
      .map(shape => ({ shape, confidence: Math.random() * 0.5 + 0.3 })); // Random confidence between 0.3-0.8
    
    return alternatives.sort((a, b) => b.confidence - a.confidence);
  }
  
  async analyzeFaceFromFile(file: File): Promise<AnalysisResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.analyzeImage(img)
          .then(resolve)
          .catch(reject);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }
  
  async analyzeFaceFromCanvas(canvas: HTMLCanvasElement): Promise<AnalysisResult> {
    const img = new Image();
    img.src = canvas.toDataURL();
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        this.analyzeImage(img)
          .then(resolve)
          .catch(reject);
      };
      img.onerror = () => reject(new Error('Failed to load canvas image'));
    });
  }
}

// Export singleton instance
export const simpleFaceAnalysis = new SimpleFaceAnalysis();