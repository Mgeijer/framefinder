#!/usr/bin/env node

/**
 * Frame Inventory Checker for FrameFinder
 * Verifies we have sufficient frame recommendations for launch
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FRAMES_PER_SHAPE = 6;
const MIN_IMAGE_SIZE = 400; // 400x400px minimum
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];

// Face shapes and their required frame categories
const FACE_SHAPES = {
  oval: {
    name: 'Oval',
    requiredFrameTypes: [
      'classic-aviators',
      'round-frames', 
      'square-frames',
      'cat-eye-styles',
      'oversized-styles',
      'rimless-options'
    ]
  },
  round: {
    name: 'Round',
    requiredFrameTypes: [
      'square-frames',
      'rectangular-frames',
      'angular-cat-eye',
      'geometric-styles', 
      'browline-frames',
      'wide-frames'
    ]
  },
  square: {
    name: 'Square',
    requiredFrameTypes: [
      'round-frames',
      'oval-frames',
      'cat-eye-styles',
      'curved-frames',
      'soft-rectangular',
      'rimless-round'
    ]
  },
  heart: {
    name: 'Heart',
    requiredFrameTypes: [
      'bottom-heavy-frames',
      'round-frames',
      'oval-frames',
      'subtle-cat-eye',
      'rimless-styles',
      'wide-bottom-frames'
    ]
  },
  diamond: {
    name: 'Diamond',
    requiredFrameTypes: [
      'cat-eye-frames',
      'oval-frames',
      'round-frames',
      'rimless-styles',
      'browline-frames',
      'detailed-temples'
    ]
  },
  triangle: {
    name: 'Triangle',
    requiredFrameTypes: [
      'cat-eye-frames',
      'wide-top-frames',
      'browline-styles',
      'round-frames',
      'aviator-styles',
      'decorative-tops'
    ]
  }
};

// Sample frame database structure
const SAMPLE_FRAMES = {
  oval: [
    { id: 'ov1', name: 'Classic Aviator Gold', type: 'classic-aviators', image: '/frames/oval/aviator-gold.jpg', price: 125 },
    { id: 'ov2', name: 'Vintage Round Tortoise', type: 'round-frames', image: '/frames/oval/round-tortoise.jpg', price: 95 },
    { id: 'ov3', name: 'Modern Square Black', type: 'square-frames', image: '/frames/oval/square-black.jpg', price: 110 },
    { id: 'ov4', name: 'Elegant Cat-Eye', type: 'cat-eye-styles', image: '/frames/oval/cat-eye-elegant.jpg', price: 140 },
    { id: 'ov5', name: 'Oversized Fashion', type: 'oversized-styles', image: '/frames/oval/oversized-fashion.jpg', price: 85 },
    { id: 'ov6', name: 'Minimalist Rimless', type: 'rimless-options', image: '/frames/oval/rimless-minimal.jpg', price: 160 }
  ],
  round: [
    { id: 'rd1', name: 'Angular Square Brown', type: 'square-frames', image: '/frames/round/square-brown.jpg', price: 105 },
    { id: 'rd2', name: 'Rectangular Professional', type: 'rectangular-frames', image: '/frames/round/rectangular-pro.jpg', price: 130 },
    { id: 'rd3', name: 'Sharp Cat-Eye', type: 'angular-cat-eye', image: '/frames/round/cat-eye-sharp.jpg', price: 115 },
    { id: 'rd4', name: 'Geometric Designer', type: 'geometric-styles', image: '/frames/round/geometric-designer.jpg', price: 150 },
    { id: 'rd5', name: 'Classic Browline', type: 'browline-frames', image: '/frames/round/browline-classic.jpg', price: 90 },
    { id: 'rd6', name: 'Wide Frame Bold', type: 'wide-frames', image: '/frames/round/wide-bold.jpg', price: 75 }
  ],
  square: [
    { id: 'sq1', name: 'Soft Round Wire', type: 'round-frames', image: '/frames/square/round-wire.jpg', price: 80 },
    { id: 'sq2', name: 'Gentle Oval Rose', type: 'oval-frames', image: '/frames/square/oval-rose.jpg', price: 120 },
    { id: 'sq3', name: 'Feminine Cat-Eye', type: 'cat-eye-styles', image: '/frames/square/cat-eye-feminine.jpg', price: 135 },
    { id: 'sq4', name: 'Classic Aviator', type: 'curved-frames', image: '/frames/square/aviator-classic.jpg', price: 100 },
    { id: 'sq5', name: 'Soft Rectangle Blue', type: 'soft-rectangular', image: '/frames/square/soft-rect-blue.jpg', price: 95 },
    { id: 'sq6', name: 'Round Rimless', type: 'rimless-round', image: '/frames/square/rimless-round.jpg', price: 145 }
  ],
  heart: [
    { id: 'ht1', name: 'Bottom Heavy Classic', type: 'bottom-heavy-frames', image: '/frames/heart/bottom-heavy.jpg', price: 110 },
    { id: 'ht2', name: 'Soft Round Balance', type: 'round-frames', image: '/frames/heart/round-balance.jpg', price: 85 },
    { id: 'ht3', name: 'Balancing Oval', type: 'oval-frames', image: '/frames/heart/oval-balance.jpg', price: 125 },
    { id: 'ht4', name: 'Subtle Cat-Eye', type: 'subtle-cat-eye', image: '/frames/heart/cat-eye-subtle.jpg', price: 105 },
    { id: 'ht5', name: 'Delicate Rimless', type: 'rimless-styles', image: '/frames/heart/rimless-delicate.jpg', price: 155 },
    { id: 'ht6', name: 'Wide Bottom Frame', type: 'wide-bottom-frames', image: '/frames/heart/wide-bottom.jpg', price: 90 }
  ],
  diamond: [
    { id: 'dm1', name: 'Dramatic Cat-Eye', type: 'cat-eye-frames', image: '/frames/diamond/cat-eye-dramatic.jpg', price: 140 },
    { id: 'dm2', name: 'Flattering Oval', type: 'oval-frames', image: '/frames/diamond/oval-flattering.jpg', price: 115 },
    { id: 'dm3', name: 'Softening Round', type: 'round-frames', image: '/frames/diamond/round-softening.jpg', price: 95 },
    { id: 'dm4', name: 'Elegant Rimless', type: 'rimless-styles', image: '/frames/diamond/rimless-elegant.jpg', price: 170 },
    { id: 'dm5', name: 'Statement Browline', type: 'browline-frames', image: '/frames/diamond/browline-statement.jpg', price: 100 },
    { id: 'dm6', name: 'Detailed Temple', type: 'detailed-temples', image: '/frames/diamond/detailed-temple.jpg', price: 130 }
  ],
  triangle: [
    { id: 'tr1', name: 'Uplifting Cat-Eye', type: 'cat-eye-frames', image: '/frames/triangle/cat-eye-uplifting.jpg', price: 125 },
    { id: 'tr2', name: 'Wide Top Balance', type: 'wide-top-frames', image: '/frames/triangle/wide-top.jpg', price: 110 },
    { id: 'tr3', name: 'Bold Browline', type: 'browline-styles', image: '/frames/triangle/browline-bold.jpg', price: 95 },
    { id: 'tr4', name: 'Balancing Round', type: 'round-frames', image: '/frames/triangle/round-balancing.jpg', price: 85 },
    { id: 'tr5', name: 'Classic Aviator', type: 'aviator-styles', image: '/frames/triangle/aviator-classic.jpg', price: 120 },
    { id: 'tr6', name: 'Decorative Top', type: 'decorative-tops', image: '/frames/triangle/decorative-top.jpg', price: 145 }
  ]
};

class FrameInventoryChecker {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.passed = [];
  }

  /**
   * Run comprehensive frame inventory check
   */
  async runCheck() {
    console.log('🔍 Running FrameFinder Frame Inventory Check...\n');

    // Check if frames directory exists
    await this.checkFramesDirectory();
    
    // Check frame count per face shape
    await this.checkFrameCount();
    
    // Check frame diversity
    await this.checkFrameDiversity();
    
    // Check image quality requirements
    await this.checkImageQuality();
    
    // Check frame metadata
    await this.checkFrameMetadata();
    
    // Generate report
    this.generateReport();
  }

  /**
   * Check if frames directory structure exists
   */
  async checkFramesDirectory() {
    const framesDir = path.join(process.cwd(), 'public', 'frames');
    
    if (!fs.existsSync(framesDir)) {
      this.issues.push({
        severity: 'critical',
        area: 'Directory Structure',
        issue: 'Frames directory not found',
        path: framesDir,
        fix: 'Create /public/frames/ directory with face shape subdirectories'
      });
      return;
    }

    // Check subdirectories for each face shape
    for (const shape of Object.keys(FACE_SHAPES)) {
      const shapeDir = path.join(framesDir, shape);
      if (!fs.existsSync(shapeDir)) {
        this.issues.push({
          severity: 'high',
          area: 'Directory Structure',
          issue: `Missing directory for ${shape} face shape`,
          path: shapeDir,
          fix: `Create /public/frames/${shape}/ directory`
        });
      } else {
        this.passed.push(`Directory exists: /public/frames/${shape}/`);
      }
    }
  }

  /**
   * Check frame count per face shape
   */
  async checkFrameCount() {
    for (const [shapeId, shapeData] of Object.entries(FACE_SHAPES)) {
      const sampleFrames = SAMPLE_FRAMES[shapeId] || [];
      const frameCount = sampleFrames.length;

      if (frameCount < REQUIRED_FRAMES_PER_SHAPE) {
        this.issues.push({
          severity: 'critical',
          area: 'Frame Count',
          issue: `Insufficient frames for ${shapeData.name} face shape`,
          current: frameCount,
          required: REQUIRED_FRAMES_PER_SHAPE,
          fix: `Add ${REQUIRED_FRAMES_PER_SHAPE - frameCount} more frames for ${shapeData.name}`
        });
      } else {
        this.passed.push(`${shapeData.name}: ${frameCount} frames (✓ meets minimum ${REQUIRED_FRAMES_PER_SHAPE})`);
      }
    }
  }

  /**
   * Check frame type diversity
   */
  async checkFrameDiversity() {
    for (const [shapeId, shapeData] of Object.entries(FACE_SHAPES)) {
      const sampleFrames = SAMPLE_FRAMES[shapeId] || [];
      const presentTypes = new Set(sampleFrames.map(frame => frame.type));
      const requiredTypes = new Set(shapeData.requiredFrameTypes);

      // Check missing types
      const missingTypes = [...requiredTypes].filter(type => !presentTypes.has(type));
      
      if (missingTypes.length > 0) {
        this.issues.push({
          severity: 'high',
          area: 'Frame Diversity',
          issue: `Missing frame types for ${shapeData.name}`,
          missing: missingTypes,
          fix: `Add frames for missing types: ${missingTypes.join(', ')}`
        });
      } else {
        this.passed.push(`${shapeData.name}: All required frame types present`);
      }

      // Check type distribution
      const typeCounts = {};
      sampleFrames.forEach(frame => {
        typeCounts[frame.type] = (typeCounts[frame.type] || 0) + 1;
      });

      // Warn if any type has too many frames (poor distribution)
      for (const [type, count] of Object.entries(typeCounts)) {
        if (count > 2) {
          this.warnings.push({
            area: 'Frame Distribution',
            issue: `Too many frames of type "${type}" for ${shapeData.name}`,
            count,
            recommendation: 'Consider more diverse frame selection'
          });
        }
      }
    }
  }

  /**
   * Check image quality requirements
   */
  async checkImageQuality() {
    for (const [shapeId, frames] of Object.entries(SAMPLE_FRAMES)) {
      for (const frame of frames) {
        const imagePath = path.join(process.cwd(), 'public', frame.image);
        
        if (!fs.existsSync(imagePath)) {
          this.issues.push({
            severity: 'high',
            area: 'Image Files',
            issue: `Missing image file for ${frame.name}`,
            path: frame.image,
            fix: `Add high-quality image at ${frame.image}`
          });
          continue;
        }

        // Check file extension
        const ext = path.extname(frame.image).toLowerCase();
        if (!SUPPORTED_FORMATS.includes(ext)) {
          this.issues.push({
            severity: 'medium',
            area: 'Image Format',
            issue: `Unsupported image format for ${frame.name}`,
            format: ext,
            fix: `Convert to supported format: ${SUPPORTED_FORMATS.join(', ')}`
          });
        }

        // Note: In a real implementation, you'd check actual image dimensions
        // using an image processing library like sharp or jimp
        this.passed.push(`Image exists: ${frame.name}`);
      }
    }
  }

  /**
   * Check frame metadata completeness
   */
  async checkFrameMetadata() {
    const requiredFields = ['id', 'name', 'type', 'image', 'price'];
    
    for (const [shapeId, frames] of Object.entries(SAMPLE_FRAMES)) {
      for (const frame of frames) {
        // Check required fields
        const missingFields = requiredFields.filter(field => !frame[field]);
        
        if (missingFields.length > 0) {
          this.issues.push({
            severity: 'medium',
            area: 'Frame Metadata',
            issue: `Missing required fields for ${frame.name || frame.id}`,
            missing: missingFields,
            fix: `Add missing fields: ${missingFields.join(', ')}`
          });
        }

        // Check price validity
        if (frame.price && (frame.price < 50 || frame.price > 300)) {
          this.warnings.push({
            area: 'Price Range',
            issue: `Unusual price for ${frame.name}`,
            price: frame.price,
            recommendation: 'Verify price is realistic for target market ($50-$300)'
          });
        }

        // Check name length
        if (frame.name && frame.name.length > 30) {
          this.warnings.push({
            area: 'Frame Names',
            issue: `Long frame name: ${frame.name}`,
            recommendation: 'Consider shorter, more concise frame names'
          });
        }
      }
    }
  }

  /**
   * Generate comprehensive report
   */
  generateReport() {
    console.log('📊 FRAME INVENTORY REPORT\n');
    console.log('=' * 50);

    // Summary
    const totalFrames = Object.values(SAMPLE_FRAMES).flat().length;
    const criticalIssues = this.issues.filter(i => i.severity === 'critical').length;
    const highIssues = this.issues.filter(i => i.severity === 'high').length;
    const mediumIssues = this.issues.filter(i => i.severity === 'medium').length;

    console.log('\n📈 SUMMARY:');
    console.log(`Total Frames: ${totalFrames}`);
    console.log(`Target Frames: ${Object.keys(FACE_SHAPES).length * REQUIRED_FRAMES_PER_SHAPE} (${REQUIRED_FRAMES_PER_SHAPE} per face shape)`);
    console.log(`Critical Issues: ${criticalIssues}`);
    console.log(`High Priority Issues: ${highIssues}`);
    console.log(`Medium Priority Issues: ${mediumIssues}`);
    console.log(`Warnings: ${this.warnings.length}`);

    // Launch readiness
    const isLaunchReady = criticalIssues === 0 && highIssues === 0;
    console.log(`\n🚀 LAUNCH READY: ${isLaunchReady ? '✅ YES' : '❌ NO'}`);

    if (!isLaunchReady) {
      console.log('\n⚠️  BLOCKING ISSUES (Must fix before launch):');
      this.issues
        .filter(i => i.severity === 'critical' || i.severity === 'high')
        .forEach(issue => {
          console.log(`\n❌ ${issue.area}: ${issue.issue}`);
          if (issue.fix) console.log(`   Fix: ${issue.fix}`);
          if (issue.current !== undefined) console.log(`   Current: ${issue.current}, Required: ${issue.required}`);
        });
    }

    // Medium priority issues
    if (mediumIssues > 0) {
      console.log('\n⚠️  MEDIUM PRIORITY ISSUES (Should fix):');
      this.issues
        .filter(i => i.severity === 'medium')
        .forEach(issue => {
          console.log(`\n🟡 ${issue.area}: ${issue.issue}`);
          if (issue.fix) console.log(`   Fix: ${issue.fix}`);
        });
    }

    // Warnings
    if (this.warnings.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      this.warnings.forEach(warning => {
        console.log(`\n💡 ${warning.area}: ${warning.issue}`);
        if (warning.recommendation) console.log(`   Suggestion: ${warning.recommendation}`);
      });
    }

    // What's working well
    console.log('\n✅ PASSING CHECKS:');
    this.passed.forEach(item => console.log(`✅ ${item}`));

    // Action items
    console.log('\n📋 NEXT STEPS:');
    if (criticalIssues > 0) {
      console.log('1. 🔴 CRITICAL: Fix critical issues before any testing');
    }
    if (highIssues > 0) {
      console.log('2. 🟠 HIGH: Resolve high priority issues before launch');
    }
    if (mediumIssues > 0) {
      console.log('3. 🟡 MEDIUM: Address medium priority issues for better UX');
    }
    console.log('4. 📸 Add actual frame images to /public/frames/ directories');
    console.log('5. 🧪 Run user testing with frame recommendations');
    console.log('6. 📊 Monitor user engagement with frame types post-launch');

    console.log('\n' + '=' * 50);
    console.log('Frame inventory check complete! 🎯');
  }
}

// Generate frame database file for development
function generateFrameDatabase() {
  const dbContent = `// Generated frame database for FrameFinder
// This file contains the frame recommendations for each face shape

export const frameDatabase = ${JSON.stringify(SAMPLE_FRAMES, null, 2)};

export const faceShapeFrames = {
  ${Object.keys(FACE_SHAPES).map(shape => `
  ${shape}: {
    name: "${FACE_SHAPES[shape].name}",
    frames: frameDatabase.${shape},
    count: frameDatabase.${shape}.length
  }`).join(',\n')}
};

// Get frames for specific face shape
export function getFramesForShape(faceShape: string) {
  return faceShapeFrames[faceShape]?.frames || [];
}

// Get frame by ID
export function getFrameById(frameId: string) {
  for (const frames of Object.values(frameDatabase)) {
    const frame = frames.find(f => f.id === frameId);
    if (frame) return frame;
  }
  return null;
}

// Get random frames for face shape
export function getRandomFrames(faceShape: string, count: number = 3) {
  const frames = getFramesForShape(faceShape);
  const shuffled = [...frames].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
`;

  fs.writeFileSync(
    path.join(process.cwd(), 'data', 'frame-database.ts'),
    dbContent
  );
  
  console.log('✅ Generated frame database at /data/frame-database.ts');
}

// Run the check
async function main() {
  const checker = new FrameInventoryChecker();
  await checker.runCheck();
  
  // Generate frame database for development
  console.log('\n📁 Generating frame database...');
  generateFrameDatabase();
  
  console.log('\n🎯 To add real frame images:');
  console.log('1. Create directories: /public/frames/{oval,round,square,heart,diamond,triangle}/');
  console.log('2. Add 6+ high-quality frame images per directory');
  console.log('3. Update frame database with actual image paths');
  console.log('4. Run this script again to verify');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { FrameInventoryChecker, SAMPLE_FRAMES, FACE_SHAPES };