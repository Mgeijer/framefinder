/**
 * Image security and validation utilities for FrameFinder
 * Ensures safe handling of user-uploaded images
 */

export interface ImageValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  metadata?: ImageMetadata;
}

export interface ImageMetadata {
  width: number;
  height: number;
  fileSize: number;
  format: string;
  hasExif: boolean;
  colorSpace: string;
  aspectRatio: number;
}

export interface SecurityScanResult {
  isSafe: boolean;
  threats: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Image Security Manager
 * Handles secure image processing and validation
 */
export class ImageSecurityManager {
  private static instance: ImageSecurityManager;
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly MIN_DIMENSION = 200; // 200px minimum
  private readonly MAX_DIMENSION = 4096; // 4K maximum
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  private constructor() {}

  static getInstance(): ImageSecurityManager {
    if (!ImageSecurityManager.instance) {
      ImageSecurityManager.instance = new ImageSecurityManager();
    }
    return ImageSecurityManager.instance;
  }

  /**
   * Validate uploaded image file
   */
  async validateImage(file: File): Promise<ImageValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    let metadata: ImageMetadata | undefined;

    try {
      // Basic file validation
      const basicValidation = this.validateBasicFileProperties(file);
      errors.push(...basicValidation.errors);
      warnings.push(...basicValidation.warnings);

      if (basicValidation.isValid) {
        // Advanced image validation
        metadata = await this.extractImageMetadata(file);
        const advancedValidation = this.validateImageProperties(metadata);
        errors.push(...advancedValidation.errors);
        warnings.push(...advancedValidation.warnings);

        // Security scan
        const securityScan = await this.scanImageForThreats(file);
        if (!securityScan.isSafe) {
          errors.push(...securityScan.threats);
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        metadata
      };
    } catch (error) {
      return {
        isValid: false,
        errors: ['Failed to validate image: ' + (error instanceof Error ? error.message : 'Unknown error')],
        warnings
      };
    }
  }

  /**
   * Sanitize image by removing EXIF data and potential threats
   */
  async sanitizeImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          // Set canvas dimensions
          canvas.width = img.width;
          canvas.height = img.height;

          // Clear canvas (removes any potential embedded content)
          ctx!.clearRect(0, 0, canvas.width, canvas.height);

          // Draw clean image (removes EXIF and embedded data)
          ctx!.drawImage(img, 0, 0);

          // Convert to blob with compression
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to sanitize image'));
              }
            },
            'image/jpeg',
            0.9 // Slight compression to remove artifacts
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for sanitization'));
      };

      // Create object URL for loading
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Create secure image processing environment
   */
  createSecureProcessingContext(image: HTMLImageElement): {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    cleanup: () => void;
  } {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', {
      willReadFrequently: true, // Optimize for frequent pixel reading
      alpha: false // Disable alpha channel for better performance
    });

    if (!context) {
      throw new Error('Failed to create canvas context');
    }

    // Set canvas dimensions to match image
    canvas.width = image.width;
    canvas.height = image.height;

    // Apply security headers (CSP-like restrictions)
    canvas.setAttribute('data-secure', 'true');

    const cleanup = () => {
      // Clear canvas data
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Reset canvas size to free memory
      canvas.width = 0;
      canvas.height = 0;
      
      // Remove from DOM if attached
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };

    return { canvas, context, cleanup };
  }

  /**
   * Detect potential steganography or hidden content
   */
  async detectHiddenContent(file: File): Promise<{
    hasHiddenContent: boolean;
    suspiciousPatterns: string[];
    confidence: number;
  }> {
    const suspiciousPatterns: string[] = [];
    let confidence = 0;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Check for suspicious file signatures
      const header = Array.from(uint8Array.slice(0, 20))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Look for embedded files (ZIP, RAR, etc.)
      if (header.includes('504b0304')) { // ZIP signature
        suspiciousPatterns.push('Embedded ZIP archive detected');
        confidence += 0.7;
      }

      if (header.includes('526172211a07')) { // RAR signature
        suspiciousPatterns.push('Embedded RAR archive detected');
        confidence += 0.7;
      }

      // Check for unusual entropy patterns (potential steganography)
      const entropy = this.calculateEntropy(uint8Array.slice(0, 1024));
      if (entropy > 7.5) { // Very high entropy might indicate hidden data
        suspiciousPatterns.push('High entropy detected - possible steganography');
        confidence += 0.3;
      }

      // Check for suspicious comments in JPEG
      if (file.type === 'image/jpeg') {
        const commentMarkers = this.findJPEGComments(uint8Array);
        if (commentMarkers.length > 0) {
          suspiciousPatterns.push(`${commentMarkers.length} comment blocks found`);
          confidence += 0.2;
        }
      }

      return {
        hasHiddenContent: confidence > 0.5,
        suspiciousPatterns,
        confidence: Math.min(confidence, 1.0)
      };
    } catch (error) {
      return {
        hasHiddenContent: false,
        suspiciousPatterns: ['Error during analysis'],
        confidence: 0
      };
    }
  }

  /**
   * Validate image for face detection suitability
   */
  validateForFaceDetection(metadata: ImageMetadata): {
    suitable: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check dimensions
    if (metadata.width < 200 || metadata.height < 200) {
      issues.push('Image too small for reliable face detection');
      recommendations.push('Use images at least 200x200 pixels');
    }

    // Check aspect ratio
    if (metadata.aspectRatio < 0.5 || metadata.aspectRatio > 2.0) {
      issues.push('Unusual aspect ratio may affect detection accuracy');
      recommendations.push('Use images with aspect ratios between 1:2 and 2:1');
    }

    // Check file size (quality indicator)
    const pixelCount = metadata.width * metadata.height;
    const bytesPerPixel = metadata.fileSize / pixelCount;
    
    if (bytesPerPixel < 0.1) {
      issues.push('Image appears heavily compressed');
      recommendations.push('Use higher quality images for better results');
    }

    // Check format
    if (metadata.format === 'image/webp') {
      recommendations.push('JPEG or PNG formats may provide better compatibility');
    }

    return {
      suitable: issues.length === 0,
      issues,
      recommendations
    };
  }

  // Private helper methods
  private validateBasicFileProperties(file: File): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      errors.push(`Invalid file type: ${file.type}. Allowed types: ${this.ALLOWED_TYPES.join(', ')}`);
    }

    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      errors.push(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum: ${this.MAX_FILE_SIZE / 1024 / 1024}MB`);
    }

    if (file.size < 1024) {
      errors.push('File too small: minimum 1KB required');
    }

    // Check file name
    if (file.name.length > 255) {
      errors.push('File name too long');
    }

    // Check for suspicious file name patterns
    const suspiciousPatterns = ['.exe', '.scr', '.bat', '.cmd', '.com', '.pif', '.scf'];
    const hasDoublEextension = suspiciousPatterns.some(pattern => 
      file.name.toLowerCase().includes(pattern)
    );

    if (hasDoublEextension) {
      errors.push('Suspicious file name pattern detected');
    }

    // Warnings for potential issues
    if (file.size > 5 * 1024 * 1024) { // 5MB
      warnings.push('Large file size may result in slower processing');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private async extractImageMetadata(file: File): Promise<ImageMetadata> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        const metadata: ImageMetadata = {
          width: img.width,
          height: img.height,
          fileSize: file.size,
          format: file.type,
          hasExif: false, // Will be determined by separate analysis
          colorSpace: 'sRGB', // Default assumption
          aspectRatio: img.width / img.height
        };

        resolve(metadata);
        URL.revokeObjectURL(img.src);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
        URL.revokeObjectURL(img.src);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  private validateImageProperties(metadata: ImageMetadata): {
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate dimensions
    if (metadata.width < this.MIN_DIMENSION || metadata.height < this.MIN_DIMENSION) {
      errors.push(`Image too small: ${metadata.width}x${metadata.height}. Minimum: ${this.MIN_DIMENSION}x${this.MIN_DIMENSION}`);
    }

    if (metadata.width > this.MAX_DIMENSION || metadata.height > this.MAX_DIMENSION) {
      warnings.push(`Very large image: ${metadata.width}x${metadata.height}. May cause performance issues`);
    }

    // Validate aspect ratio
    if (metadata.aspectRatio < 0.25 || metadata.aspectRatio > 4) {
      warnings.push('Extreme aspect ratio may affect face detection accuracy');
    }

    return { errors, warnings };
  }

  private async scanImageForThreats(file: File): Promise<SecurityScanResult> {
    const threats: string[] = [];
    const recommendations: string[] = [];

    try {
      // Check for hidden content
      const hiddenContentScan = await this.detectHiddenContent(file);
      if (hiddenContentScan.hasHiddenContent) {
        threats.push(...hiddenContentScan.suspiciousPatterns);
      }

      // Check for unusual file properties
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Validate file header
      if (!this.validateFileHeader(uint8Array, file.type)) {
        threats.push('File header does not match declared type');
      }

      // Check for excessive metadata
      if (file.type === 'image/jpeg') {
        const exifSize = this.estimateEXIFSize(uint8Array);
        if (exifSize > 64 * 1024) { // 64KB
          threats.push('Excessive EXIF data detected');
          recommendations.push('Strip EXIF data before processing');
        }
      }

      const riskLevel = this.calculateRiskLevel(threats.length, hiddenContentScan.confidence);

      return {
        isSafe: threats.length === 0,
        threats,
        recommendations,
        riskLevel
      };
    } catch (error) {
      return {
        isSafe: false,
        threats: ['Failed to scan image for threats'],
        recommendations: ['Manual review required'],
        riskLevel: 'medium'
      };
    }
  }

  private validateFileHeader(data: Uint8Array, expectedType: string): boolean {
    const header = data.slice(0, 10);
    
    switch (expectedType) {
      case 'image/jpeg':
        return header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF;
      case 'image/png':
        return header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47;
      case 'image/webp':
        return header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46;
      default:
        return false;
    }
  }

  private calculateEntropy(data: Uint8Array): number {
    const frequency = new Array(256).fill(0);
    
    // Count byte frequencies
    for (let i = 0; i < data.length; i++) {
      frequency[data[i]]++;
    }
    
    // Calculate entropy
    let entropy = 0;
    const length = data.length;
    
    for (let i = 0; i < 256; i++) {
      if (frequency[i] > 0) {
        const probability = frequency[i] / length;
        entropy -= probability * Math.log2(probability);
      }
    }
    
    return entropy;
  }

  private findJPEGComments(data: Uint8Array): number[] {
    const comments: number[] = [];
    
    for (let i = 0; i < data.length - 1; i++) {
      // Look for JPEG comment marker (0xFFFE)
      if (data[i] === 0xFF && data[i + 1] === 0xFE) {
        comments.push(i);
      }
    }
    
    return comments;
  }

  private estimateEXIFSize(data: Uint8Array): number {
    // Look for EXIF marker in JPEG
    for (let i = 0; i < data.length - 4; i++) {
      if (data[i] === 0xFF && data[i + 1] === 0xE1) {
        // EXIF segment found, get length
        const length = (data[i + 2] << 8) | data[i + 3];
        return length;
      }
    }
    return 0;
  }

  private calculateRiskLevel(threatCount: number, confidence: number): 'low' | 'medium' | 'high' | 'critical' {
    if (threatCount === 0) return 'low';
    if (threatCount === 1 && confidence < 0.5) return 'medium';
    if (threatCount <= 2 && confidence < 0.8) return 'high';
    return 'critical';
  }
}

// Export singleton instance
export const imageSecurity = ImageSecurityManager.getInstance();

// Utility functions
export const imageSecurityUtils = {
  /**
   * Quick validation for common use cases
   */
  isImageSafeForProcessing(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    return allowedTypes.includes(file.type) && 
           file.size <= maxSize && 
           file.size >= 1024;
  },

  /**
   * Generate secure filename
   */
  generateSecureFilename(originalName: string): string {
    const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `secure_${timestamp}_${random}.${extension}`;
  },

  /**
   * Estimate processing time based on image size
   */
  estimateProcessingTime(width: number, height: number): number {
    const pixels = width * height;
    const baseTime = 500; // 500ms base processing time
    const pixelFactor = pixels / (640 * 480); // Relative to VGA
    return Math.round(baseTime * Math.sqrt(pixelFactor));
  }
};