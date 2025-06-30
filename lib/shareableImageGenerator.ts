'use client';

import { AnalysisResult } from '@/types';

export interface ShareableImageOptions {
  format: 'desktop' | 'mobile';
  width?: number;
  height?: number;
  includePhoto?: boolean;
}

export class ShareableImageGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async generateShareableImage(
    result: AnalysisResult,
    userPhoto: string | null,
    options: ShareableImageOptions = { format: 'desktop' }
  ): Promise<string> {
    const { format, includePhoto = true } = options;

    if (format === 'desktop') {
      return this.generateDesktopShareImage(result, userPhoto, includePhoto);
    } else {
      return this.generateMobileShareImage(result, userPhoto, includePhoto);
    }
  }

  private async generateDesktopShareImage(
    result: AnalysisResult,
    userPhoto: string | null,
    includePhoto: boolean
  ): Promise<string> {
    // Desktop format: 1200x630 (optimal for social media)
    this.canvas.width = 1200;
    this.canvas.height = 630;

    // Background gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#0f0f23');
    gradient.addColorStop(1, '#1a1a2e');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, 1200, 630);

    // Brand header
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 32px system-ui';
    this.ctx.fillText('FrameFinder', 40, 60);
    
    this.ctx.fillStyle = '#9ca3af';
    this.ctx.font = '18px system-ui';
    this.ctx.fillText('AI-Powered Face Shape Analysis', 40, 90);

    // User photo (left side)
    if (includePhoto && userPhoto) {
      try {
        const img = await this.loadImage(userPhoto);
        const photoSize = 280;
        const photoX = 40;
        const photoY = 120;

        // Draw photo with rounded corners
        this.drawRoundedImage(img, photoX, photoY, photoSize, photoSize, 20);
        
        // Photo border
        this.ctx.strokeStyle = '#374151';
        this.ctx.lineWidth = 2;
        this.roundRect(photoX, photoY, photoSize, photoSize, 20);
        this.ctx.stroke();
      } catch (error) {
        console.error('Error loading user photo:', error);
      }
    }

    // Results section (right side)
    const resultX = includePhoto ? 360 : 40;
    const resultY = 120;

    // Face shape title
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 36px system-ui';
    this.ctx.fillText('Your Face Shape:', resultX, resultY + 40);

    // Face shape name with background
    const shapeNameWidth = this.ctx.measureText(result.faceShape.displayName).width + 40;
    this.ctx.fillStyle = '#3b82f6';
    this.roundRect(resultX, resultY + 60, shapeNameWidth, 50, 10);
    this.ctx.fill();

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 28px system-ui';
    this.ctx.fillText(result.faceShape.displayName, resultX + 20, resultY + 90);

    // Confidence
    this.ctx.fillStyle = '#9ca3af';
    this.ctx.font = '18px system-ui';
    this.ctx.fillText(`${Math.round(result.confidence * 100)}% confidence`, resultX + shapeNameWidth + 20, resultY + 85);

    // Description
    this.ctx.fillStyle = '#d1d5db';
    this.ctx.font = '20px system-ui';
    this.wrapText(result.faceShape.description, resultX, resultY + 140, 500, 25);

    // Key characteristics
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 22px system-ui';
    this.ctx.fillText('Key Characteristics:', resultX, resultY + 220);

    this.ctx.fillStyle = '#d1d5db';
    this.ctx.font = '18px system-ui';
    const characteristics = result.faceShape.characteristics.slice(0, 3);
    characteristics.forEach((char, index) => {
      this.ctx.fillText(`• ${char}`, resultX, resultY + 250 + (index * 25));
    });

    // Top frame recommendations
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 22px system-ui';
    this.ctx.fillText('Perfect Frame Styles:', resultX, resultY + 360);

    const topFrames = result.recommendations.slice(0, 2);
    topFrames.forEach((frame, index) => {
      const frameY = resultY + 390 + (index * 60);
      
      // Frame card background
      this.ctx.fillStyle = 'rgba(55, 65, 81, 0.6)';
      this.roundRect(resultX, frameY, 480, 50, 8);
      this.ctx.fill();

      // Frame name
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 18px system-ui';
      this.ctx.fillText(frame.name, resultX + 15, frameY + 25);

      // Match percentage
      this.ctx.fillStyle = '#10b981';
      this.ctx.font = '16px system-ui';
      this.ctx.fillText(`${frame.popularity}% match`, resultX + 400, frameY + 25);

      // Description
      this.ctx.fillStyle = '#9ca3af';
      this.ctx.font = '14px system-ui';
      this.ctx.fillText(frame.description.substring(0, 50) + '...', resultX + 15, frameY + 42);
    });

    // Footer
    this.ctx.fillStyle = '#6b7280';
    this.ctx.font = '16px system-ui';
    this.ctx.fillText('Get your free face shape analysis at framefinder.com', 40, 600);

    return this.canvas.toDataURL('image/png', 0.9);
  }

  private async generateMobileShareImage(
    result: AnalysisResult,
    userPhoto: string | null,
    includePhoto: boolean
  ): Promise<string> {
    // Mobile format: 1080x1080 (Instagram square)
    this.canvas.width = 1080;
    this.canvas.height = 1080;

    // Background gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, '#0f0f23');
    gradient.addColorStop(1, '#1a1a2e');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, 1080, 1080);

    // Brand header
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 48px system-ui';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('FrameFinder', 540, 80);
    
    this.ctx.fillStyle = '#9ca3af';
    this.ctx.font = '24px system-ui';
    this.ctx.fillText('AI Face Shape Analysis', 540, 120);

    // User photo (centered)
    if (includePhoto && userPhoto) {
      try {
        const img = await this.loadImage(userPhoto);
        const photoSize = 400;
        const photoX = (1080 - photoSize) / 2;
        const photoY = 160;

        // Draw photo with rounded corners
        this.drawRoundedImage(img, photoX, photoY, photoSize, photoSize, 30);
        
        // Photo border
        this.ctx.strokeStyle = '#374151';
        this.ctx.lineWidth = 3;
        this.roundRect(photoX, photoY, photoSize, photoSize, 30);
        this.ctx.stroke();
      } catch (error) {
        console.error('Error loading user photo:', error);
      }
    }

    // Face shape result (centered below photo)
    const resultY = includePhoto ? 620 : 300;

    // Face shape title
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 42px system-ui';
    this.ctx.fillText('Your Face Shape:', 540, resultY);

    // Face shape name with background
    const shapeNameWidth = this.ctx.measureText(result.faceShape.displayName).width + 60;
    const shapeX = (1080 - shapeNameWidth) / 2;
    
    this.ctx.fillStyle = '#3b82f6';
    this.roundRect(shapeX, resultY + 20, shapeNameWidth, 70, 15);
    this.ctx.fill();

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 38px system-ui';
    this.ctx.fillText(result.faceShape.displayName, 540, resultY + 70);

    // Confidence
    this.ctx.fillStyle = '#9ca3af';
    this.ctx.font = '24px system-ui';
    this.ctx.fillText(`${Math.round(result.confidence * 100)}% confidence`, 540, resultY + 120);

    // Description (wrapped for mobile)
    this.ctx.fillStyle = '#d1d5db';
    this.ctx.font = '26px system-ui';
    this.ctx.textAlign = 'center';
    this.wrapTextCentered(result.faceShape.description, 540, resultY + 170, 800, 35);

    // Top frame recommendation
    const topFrame = result.recommendations[0];
    if (topFrame) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 32px system-ui';
      this.ctx.fillText('Perfect Frame Style:', 540, resultY + 300);

      // Frame card background
      const cardWidth = 700;
      const cardX = (1080 - cardWidth) / 2;
      this.ctx.fillStyle = 'rgba(55, 65, 81, 0.8)';
      this.roundRect(cardX, resultY + 320, cardWidth, 80, 12);
      this.ctx.fill();

      // Frame name
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 28px system-ui';
      this.ctx.fillText(topFrame.name, 540, resultY + 355);

      // Match percentage
      this.ctx.fillStyle = '#10b981';
      this.ctx.font = '24px system-ui';
      this.ctx.fillText(`${topFrame.popularity}% perfect match`, 540, resultY + 385);
    }

    // Footer
    this.ctx.fillStyle = '#6b7280';
    this.ctx.font = '24px system-ui';
    this.ctx.fillText('Get your free analysis at framefinder.com', 540, 1040);

    // Reset text align
    this.ctx.textAlign = 'start';

    return this.canvas.toDataURL('image/png', 0.9);
  }

  private async loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = 'anonymous';
      img.src = src;
    });
  }

  private drawRoundedImage(
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    this.ctx.save();
    this.roundRect(x, y, width, height, radius);
    this.ctx.clip();
    this.ctx.drawImage(img, x, y, width, height);
    this.ctx.restore();
  }

  private roundRect(x: number, y: number, width: number, height: number, radius: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
  }

  private wrapText(text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = this.ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        this.ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    this.ctx.fillText(line, x, currentY);
  }

  private wrapTextCentered(text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = this.ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        this.ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    this.ctx.fillText(line, x, currentY);
  }
}

export const shareableImageGenerator = new ShareableImageGenerator();