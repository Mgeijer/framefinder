import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { FaceLandmark, FaceMeasurements, AnalysisResult } from '../types';
import { faceShapes, getFaceShapeById } from '../data/face-shapes';
import { calculateConfidence } from './utils';

export class FaceDetectionService {
  private model: faceLandmarksDetection.FaceLandmarksDetector | null = null;
  private isInitialized = false;

  async initialize(retryCount = 0): Promise<void> {
    if (this.isInitialized) return;

    const maxRetries = 3;
    const retryDelay = 1000 * (retryCount + 1); // Progressive delay

    try {
      console.log(`🤖 Initializing face detection service (attempt ${retryCount + 1}/${maxRetries + 1})`);
      
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        throw new Error('Face detection can only be initialized in browser environment');
      }

      // Check for WebGL support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        throw new Error('WebGL is not supported. Face detection requires WebGL for optimal performance.');
      }

      console.log('✅ Browser environment and WebGL support confirmed');

      // Initialize TensorFlow.js backend with explicit configuration
      await tf.ready();
      
      // Try to set webgl backend explicitly
      if (tf.getBackend() !== 'webgl') {
        try {
          await tf.setBackend('webgl');
          await tf.ready();
        } catch (backendError) {
          console.warn('⚠️ Failed to set WebGL backend, falling back to CPU:', backendError);
          await tf.setBackend('cpu');
          await tf.ready();
        }
      }

      console.log('✅ TensorFlow.js backend initialized:', tf.getBackend());

      // Load the face landmarks detection model with timeout
      console.log('📥 Loading MediaPipe FaceMesh model...');
      
      const modelLoadPromise = faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: 'tfjs',
          refineLandmarks: false, // Disable for faster loading
          maxFaces: 1,
        }
      );

      // Add timeout to model loading
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Model loading timeout (30s)')), 30000);
      });

      this.model = await Promise.race([modelLoadPromise, timeoutPromise]);

      this.isInitialized = true;
      console.log('✅ Face detection model initialized successfully');
      
    } catch (error) {
      console.error(`❌ Failed to initialize face detection model (attempt ${retryCount + 1}):`, error);
      
      // Retry logic
      if (retryCount < maxRetries) {
        console.log(`🔄 Retrying in ${retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return this.initialize(retryCount + 1);
      }
      
      // Final failure
      const errorMessage = error instanceof Error ? error.message : 'Unknown initialization error';
      throw new Error(`Failed to initialize face detection after ${maxRetries + 1} attempts: ${errorMessage}`);
    }
  }

  private extractLandmarks(predictions: faceLandmarksDetection.Face[]): FaceLandmark[] {
    if (!predictions || predictions.length === 0) {
      throw new Error('No face detected in the image');
    }

    const face = predictions[0];
    const keypoints = face.keypoints;
    
    // Convert MediaPipe landmarks to our format
    return keypoints.map((keypoint) => ({
      x: keypoint.x,
      y: keypoint.y,
      z: keypoint.z || 0,
      confidence: keypoint.score || 1.0
    }));
  }

  private calculateMeasurements(landmarks: FaceLandmark[]): FaceMeasurements {
    // MediaPipe Face Mesh landmark indices
    const FOREHEAD = 10; // Top of forehead
    const LEFT_CHEEKBONE = 123; // Left cheekbone
    const RIGHT_CHEEKBONE = 352; // Right cheekbone
    const LEFT_JAW = 132; // Left jaw
    const RIGHT_JAW = 361; // Right jaw
    const CHIN = 152; // Bottom of chin
    const LEFT_TEMPLE = 447; // Left temple
    const RIGHT_TEMPLE = 227; // Right temple

    const forehead = landmarks[FOREHEAD];
    const leftCheekbone = landmarks[LEFT_CHEEKBONE];
    const rightCheekbone = landmarks[RIGHT_CHEEKBONE];
    const leftJaw = landmarks[LEFT_JAW];
    const rightJaw = landmarks[RIGHT_JAW];
    const chin = landmarks[CHIN];
    const leftTemple = landmarks[LEFT_TEMPLE];
    const rightTemple = landmarks[RIGHT_TEMPLE];

    // Calculate face dimensions
    const faceWidth = Math.abs(rightCheekbone.x - leftCheekbone.x);
    const faceHeight = Math.abs(forehead.y - chin.y);
    const jawWidth = Math.abs(rightJaw.x - leftJaw.x);
    const foreheadWidth = Math.abs(rightTemple.x - leftTemple.x);
    const cheekboneWidth = Math.abs(rightCheekbone.x - leftCheekbone.x);

    // Calculate ratios
    const widthToHeightRatio = faceWidth / faceHeight;
    const jawToForeheadRatio = jawWidth / foreheadWidth;

    return {
      widthToHeightRatio,
      jawToForeheadRatio,
      cheekboneWidth,
      faceWidth,
      faceHeight,
      jawWidth,
      foreheadWidth
    };
  }

  private classifyFaceShape(measurements: FaceMeasurements): AnalysisResult {
    const { widthToHeightRatio, jawToForeheadRatio, cheekboneWidth } = measurements;
    
    let bestMatch: { shape: string; confidence: number } = { shape: 'oval', confidence: 0 };
    let alternativeShapes: Array<{ shape: any; confidence: number }> = [];

    // Calculate confidence for each face shape
    faceShapes.forEach(faceShape => {
      const confidence = calculateConfidence(
        {
          widthToHeight: widthToHeightRatio,
          jawToForehead: jawToForeheadRatio,
          cheekboneWidth: cheekboneWidth / measurements.faceWidth
        },
        faceShape.measurements
      );

      if (confidence > bestMatch.confidence) {
        bestMatch = { shape: faceShape.id, confidence };
      }

      alternativeShapes.push({ shape: faceShape, confidence });
    });

    // Sort alternative shapes by confidence
    alternativeShapes.sort((a, b) => b.confidence - a.confidence);

    const primaryShape = getFaceShapeById(bestMatch.shape);
    if (!primaryShape) {
      throw new Error('Failed to determine face shape');
    }

    return {
      faceShape: primaryShape,
      confidence: bestMatch.confidence,
      landmarks: [], // Will be filled by caller
      measurements,
      recommendations: primaryShape.recommendedFrames,
      stylingTips: primaryShape.stylingTips,
      alternativeShapes: alternativeShapes.slice(1, 4) // Top 3 alternatives
    };
  }

  async analyzeFace(imageElement: HTMLImageElement): Promise<AnalysisResult> {
    if (!this.model) {
      throw new Error('Face detection service not initialized');
    }

    try {
      // Detect face landmarks
      const predictions = await this.model.estimateFaces(imageElement);
      
      if (!predictions || predictions.length === 0) {
        throw new Error('No face detected in the image. Please ensure your face is clearly visible and well-lit.');
      }

      // Extract landmarks
      const landmarks = this.extractLandmarks(predictions);
      
      // Calculate measurements
      const measurements = this.calculateMeasurements(landmarks);
      
      // Classify face shape
      const analysis = this.classifyFaceShape(measurements);
      
      // Add landmarks to result
      analysis.landmarks = landmarks;
      
      return analysis;
    } catch (error) {
      console.error('Face analysis failed:', error);
      throw error;
    }
  }

  async analyzeFaceFromFile(file: File): Promise<AnalysisResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.analyzeFace(img)
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
        this.analyzeFace(img)
          .then(resolve)
          .catch(reject);
      };
      img.onerror = () => reject(new Error('Failed to load canvas image'));
    });
  }

  async analyzeImage(imageData: string): Promise<AnalysisResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.analyzeFace(img)
          .then(resolve)
          .catch(reject);
      };
      img.onerror = () => reject(new Error('Failed to load image data'));
      img.src = imageData;
    });
  }

  dispose(): void {
    if (this.model) {
      // TensorFlow.js models are automatically cleaned up
      this.model = null;
    }
    this.isInitialized = false;
  }

  isReady(): boolean {
    return this.isInitialized && this.model !== null;
  }
}

// Export singleton instance
export const faceDetectionService = new FaceDetectionService(); 