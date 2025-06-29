import React from 'react';

export interface FaceShape {
  id: string;
  name: 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'triangle';
  displayName: string;
  description: string;
  characteristics: string[];
  measurements: {
    widthToHeight: number[];
    jawToForehead: number[];
    cheekboneWidth: number[];
  };
  imageUrl: string;
  recommendedFrames: FrameRecommendation[];
  avoidFrames: string[];
  celebrities: string[];
  stylingTips: string[];
}

export interface FrameRecommendation {
  id: string;
  name: string;
  category: 'rectangular' | 'round' | 'cat-eye' | 'aviator' | 'square' | 'oval' | 'browline' | 'geometric';
  description: string;
  imageUrl: string;
  suitableFor: string[];
  features: string[];
  priceRange: 'budget' | 'mid-range' | 'premium';
  popularity: number;
}

export interface FaceLandmark {
  x: number;
  y: number;
  z?: number;
  confidence?: number;
}

export interface FaceMeasurements {
  widthToHeightRatio: number;
  jawToForeheadRatio: number;
  cheekboneWidth: number;
  faceWidth: number;
  faceHeight: number;
  jawWidth: number;
  foreheadWidth: number;
}

export interface AnalysisResult {
  faceShape: FaceShape;
  confidence: number;
  landmarks: FaceLandmark[];
  measurements: FaceMeasurements;
  recommendations: FrameRecommendation[];
  stylingTips: string[];
  alternativeShapes: Array<{ shape: FaceShape; confidence: number }>;
}

export interface UserPreferences {
  style: 'professional' | 'casual' | 'trendy' | 'classic';
  budget: 'budget' | 'mid-range' | 'premium';
  colorPreference: string[];
  materialPreference: string[];
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
  userId?: string;
  sessionId?: string;
}

export interface CacheEntry {
  key: string;
  value: any;
  ttl: number;
  createdAt: number;
}

export interface ErrorReport {
  error: Error;
  context: {
    page: string;
    action: string;
    userId?: string;
    sessionId?: string;
  };
  timestamp: number;
}

export interface WebcamConfig {
  width: number;
  height: number;
  facingMode: 'user' | 'environment';
  aspectRatio: number;
}

export interface FormData {
  image: File | null;
  preferences: UserPreferences;
  consent: boolean;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  pagination: PaginationParams;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavigationItem[];
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ImageProcessingResult {
  originalFile: File;
  processedBlob: Blob;
  dimensions: { width: number; height: number };
  fileSize: number;
  format: string;
}

export interface FaceDetectionConfig {
  modelPath: string;
  confidenceThreshold: number;
  maxFaces: number;
  enableLandmarks: boolean;
  enableMesh: boolean;
}

export interface RecommendationEngineConfig {
  algorithm: 'ml' | 'rule-based' | 'hybrid';
  weights: {
    faceShape: number;
    preferences: number;
    popularity: number;
    style: number;
  };
  maxRecommendations: number;
}

export interface PerformanceMetrics {
  loadTime: number;
  analysisTime: number;
  renderTime: number;
  memoryUsage: number;
  errors: ErrorReport[];
}

export interface UserSession {
  id: string;
  userId?: string;
  startTime: number;
  lastActivity: number;
  pageViews: string[];
  actions: string[];
  preferences: Partial<UserPreferences>;
}

export interface NewsletterSubscription {
  email: string;
  preferences: {
    weeklyTips: boolean;
    newFrames: boolean;
    styleUpdates: boolean;
  };
  subscribedAt: number;
  status: 'active' | 'unsubscribed' | 'pending';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'consultation' | 'feedback' | 'bug-report';
  consent: boolean;
}

export interface StyleTip {
  id: string;
  title: string;
  content: string;
  category: 'face-shape' | 'frame-style' | 'color' | 'trends' | 'care';
  tags: string[];
  imageUrl?: string;
  publishedAt: number;
  author: string;
  readTime: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'privacy' | 'recommendations';
  tags: string[];
  helpful: number;
  notHelpful: number;
}

export interface VirtualTryOnResult {
  originalImage: string;
  tryOnImage: string;
  frameId: string;
  position: { x: number; y: number; scale: number; rotation: number };
  confidence: number;
}

export interface ExportOptions {
  format: 'pdf' | 'image' | 'json';
  includeRecommendations: boolean;
  includeStylingTips: boolean;
  includeMeasurements: boolean;
  watermark: boolean;
}

export interface SocialShareData {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'pinterest';
}

export interface ABTestConfig {
  id: string;
  name: string;
  variants: Array<{
    id: string;
    name: string;
    weight: number;
    config: Record<string, any>;
  }>;
  startDate: number;
  endDate?: number;
  active: boolean;
}

export interface CoreWebVitals {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  fcp: number;
}

export interface MonitoringAlert {
  id: string;
  type: 'error' | 'performance' | 'security' | 'business';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: number;
  resolved: boolean;
  metadata?: Record<string, any>;
} 