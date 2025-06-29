import { FaceShape, FrameRecommendation } from '../types';

export const faceShapes: FaceShape[] = [
  {
    id: 'oval',
    name: 'oval',
    displayName: 'Oval',
    description: 'Oval faces are considered the most versatile face shape, with balanced proportions and gently rounded features. This shape is characterized by a forehead that is slightly wider than the jawline, with the face length being about 1.5 times the width.',
    characteristics: [
      'Forehead is slightly wider than the jawline',
      'Face length is about 1.5 times the width',
      'Jawline is gently rounded',
      'Cheekbones are the widest part of the face',
      'Face tapers slightly from forehead to chin',
      'Balanced proportions throughout'
    ],
    measurements: {
      widthToHeight: [1.4, 1.6],
      jawToForehead: [0.8, 0.9],
      cheekboneWidth: [0.9, 1.0]
    },
    imageUrl: '/images/face-shapes/oval.jpg',
    recommendedFrames: [
      {
        id: 'rect-classic',
        name: 'Classic Rectangular',
        category: 'rectangular',
        description: 'Timeless rectangular frames that complement the balanced proportions of oval faces.',
        imageUrl: '/images/frames/rectangular-classic.jpg',
        suitableFor: ['oval', 'round'],
        features: ['Timeless design', 'Professional look', 'Versatile styling'],
        priceRange: 'mid-range',
        popularity: 95
      },
      {
        id: 'round-vintage',
        name: 'Vintage Round',
        category: 'round',
        description: 'Elegant round frames that add character while maintaining the natural balance.',
        imageUrl: '/images/frames/round-vintage.jpg',
        suitableFor: ['oval', 'square'],
        features: ['Retro appeal', 'Sophisticated look', 'Artistic flair'],
        priceRange: 'premium',
        popularity: 88
      },
      {
        id: 'cat-eye-sophisticated',
        name: 'Sophisticated Cat-Eye',
        category: 'cat-eye',
        description: 'Upswept cat-eye frames that add a touch of glamour to the naturally balanced oval face.',
        imageUrl: '/images/frames/cat-eye-sophisticated.jpg',
        suitableFor: ['oval', 'heart'],
        features: ['Feminine appeal', 'Glamorous look', 'Upswept design'],
        priceRange: 'premium',
        popularity: 92
      },
      {
        id: 'aviator-classic',
        name: 'Classic Aviator',
        category: 'aviator',
        description: 'Timeless aviator frames that work beautifully with oval face proportions.',
        imageUrl: '/images/frames/aviator-classic.jpg',
        suitableFor: ['oval', 'round'],
        features: ['Iconic design', 'Versatile styling', 'Premium materials'],
        priceRange: 'premium',
        popularity: 90
      }
    ],
    avoidFrames: ['Very small frames', 'Frames that are too narrow', 'Oversized frames that overwhelm'],
    celebrities: ['Beyoncé', 'George Clooney', 'Scarlett Johansson', 'Brad Pitt'],
    stylingTips: [
      'Oval faces can wear almost any frame style',
      'Focus on frames that maintain the natural balance',
      'Consider your personal style preferences',
      'Experiment with different colors and materials'
    ]
  },
  {
    id: 'round',
    name: 'round',
    displayName: 'Round',
    description: 'Round faces have soft, curved lines with equal width and length, featuring full cheeks and a rounded chin. The face has minimal angles and appears circular.',
    characteristics: [
      'Face width and length are nearly equal',
      'Full, rounded cheeks',
      'Soft, curved jawline',
      'Minimal angles in the face',
      'Wide forehead',
      'Rounded chin'
    ],
    measurements: {
      widthToHeight: [0.9, 1.1],
      jawToForehead: [0.9, 1.0],
      cheekboneWidth: [0.9, 1.0]
    },
    imageUrl: '/images/face-shapes/round.jpg',
    recommendedFrames: [
      {
        id: 'rect-angular',
        name: 'Angular Rectangular',
        category: 'rectangular',
        description: 'Sharp, angular rectangular frames that add definition and structure to round faces.',
        imageUrl: '/images/frames/rectangular-angular.jpg',
        suitableFor: ['round', 'oval'],
        features: ['Angular design', 'Strong lines', 'Professional look'],
        priceRange: 'mid-range',
        popularity: 85
      },
      {
        id: 'square-bold',
        name: 'Bold Square',
        category: 'square',
        description: 'Strong square frames that create contrast with the soft features of round faces.',
        imageUrl: '/images/frames/square-bold.jpg',
        suitableFor: ['round', 'oval'],
        features: ['Bold design', 'Strong contrast', 'Modern appeal'],
        priceRange: 'premium',
        popularity: 82
      },
      {
        id: 'browline-classic',
        name: 'Classic Browline',
        category: 'browline',
        description: 'Browline frames that add structure and definition to round faces.',
        imageUrl: '/images/frames/browline-classic.jpg',
        suitableFor: ['round', 'square'],
        features: ['Vintage appeal', 'Strong brow line', 'Sophisticated look'],
        priceRange: 'premium',
        popularity: 78
      },
      {
        id: 'geometric-modern',
        name: 'Modern Geometric',
        category: 'geometric',
        description: 'Contemporary geometric frames that add angles and structure.',
        imageUrl: '/images/frames/geometric-modern.jpg',
        suitableFor: ['round', 'oval'],
        features: ['Modern design', 'Geometric shapes', 'Trendy appeal'],
        priceRange: 'mid-range',
        popularity: 80
      }
    ],
    avoidFrames: ['Small round frames', 'Frames that are too narrow', 'Circular frames'],
    celebrities: ['Emma Stone', 'Mila Kunis', 'Ginnifer Goodwin', 'Drew Barrymore'],
    stylingTips: [
      'Choose frames with strong angles and straight lines',
      'Avoid circular or round frames',
      'Look for frames that are wider than they are tall',
      'Consider bold, angular designs'
    ]
  },
  {
    id: 'square',
    name: 'square',
    displayName: 'Square',
    description: 'Square faces feature strong, angular jawlines with equal width at the forehead and jaw. This face shape is characterized by bold, defined features and a structured appearance.',
    characteristics: [
      'Strong, angular jawline',
      'Forehead and jawline are similar in width',
      'Face width and length are nearly equal',
      'Prominent cheekbones',
      'Minimal tapering from forehead to jaw',
      'Bold, structured features'
    ],
    measurements: {
      widthToHeight: [0.8, 1.0],
      jawToForehead: [0.9, 1.1],
      cheekboneWidth: [0.85, 0.95]
    },
    imageUrl: '/images/face-shapes/square.jpg',
    recommendedFrames: [
      {
        id: 'round-soft',
        name: 'Soft Round',
        category: 'round',
        description: 'Round frames that soften the angular features of square faces.',
        imageUrl: '/images/frames/round-soft.jpg',
        suitableFor: ['square', 'rectangular'],
        features: ['Softening effect', 'Classic appeal', 'Balanced proportions'],
        priceRange: 'mid-range',
        popularity: 87
      },
      {
        id: 'oval-gentle',
        name: 'Gentle Oval',
        category: 'oval',
        description: 'Oval frames that create harmony with angular square features.',
        imageUrl: '/images/frames/oval-gentle.jpg',
        suitableFor: ['square', 'oval'],
        features: ['Harmonizing design', 'Elegant curves', 'Professional look'],
        priceRange: 'premium',
        popularity: 84
      }
    ],
    avoidFrames: ['Square frames', 'Rectangular frames', 'Angular geometric shapes'],
    celebrities: ['Olivia Wilde', 'Keira Knightley', 'Rosario Dawson', 'Demi Moore'],
    stylingTips: [
      'Choose frames with soft, curved lines',
      'Avoid angular or square frames that emphasize jaw structure',
      'Look for frames wider than your jawline',
      'Round or oval shapes work best'
    ]
  },
  {
    id: 'heart',
    name: 'heart',
    displayName: 'Heart',
    description: 'Heart-shaped faces have a wider forehead and cheekbones with a narrow, pointed chin. This creates an inverted triangle shape that is both striking and delicate.',
    characteristics: [
      'Wide forehead and temples',
      'Prominent cheekbones',
      'Narrow, pointed chin',
      'Face width decreases from forehead to chin',
      'Often have a widow\'s peak hairline',
      'Delicate jawline'
    ],
    measurements: {
      widthToHeight: [1.2, 1.4],
      jawToForehead: [0.6, 0.8],
      cheekboneWidth: [0.9, 1.0]
    },
    imageUrl: '/images/face-shapes/heart.jpg',
    recommendedFrames: [
      {
        id: 'bottom-heavy',
        name: 'Bottom-Heavy Frames',
        category: 'rectangular',
        description: 'Frames with more visual weight at the bottom to balance the wider forehead.',
        imageUrl: '/images/frames/bottom-heavy.jpg',
        suitableFor: ['heart', 'triangle'],
        features: ['Balancing design', 'Modern appeal', 'Chin emphasis'],
        priceRange: 'mid-range',
        popularity: 82
      },
      {
        id: 'aviator-classic-heart',
        name: 'Classic Aviator',
        category: 'aviator',
        description: 'Aviator frames that complement the heart shape\'s natural curves.',
        imageUrl: '/images/frames/aviator-heart.jpg',
        suitableFor: ['heart', 'oval'],
        features: ['Timeless style', 'Flattering curves', 'Versatile appeal'],
        priceRange: 'premium',
        popularity: 89
      }
    ],
    avoidFrames: ['Top-heavy frames', 'Cat-eye frames', 'Wide temple designs'],
    celebrities: ['Reese Witherspoon', 'Jennifer Love Hewitt', 'Scarlett Johansson', 'Ryan Gosling'],
    stylingTips: [
      'Choose frames that add width to the lower face',
      'Avoid top-heavy or cat-eye styles',
      'Look for frames with decorative elements on the bottom',
      'Light-colored or rimless frames work well'
    ]
  },
  {
    id: 'diamond',
    name: 'diamond',
    displayName: 'Diamond',
    description: 'Diamond faces feature wide, prominent cheekbones with a narrow forehead and jawline. This creates a distinctive diamond shape with beautiful angular features.',
    characteristics: [
      'Wide, prominent cheekbones',
      'Narrow forehead',
      'Narrow jawline and chin',
      'Face is widest at the cheekbones',
      'Angular, defined features',
      'Distinctive diamond silhouette'
    ],
    measurements: {
      widthToHeight: [1.1, 1.3],
      jawToForehead: [0.8, 1.0],
      cheekboneWidth: [1.0, 1.2]
    },
    imageUrl: '/images/face-shapes/diamond.jpg',
    recommendedFrames: [
      {
        id: 'cat-eye-diamond',
        name: 'Statement Cat-Eye',
        category: 'cat-eye',
        description: 'Cat-eye frames that highlight the eyes and complement cheekbone prominence.',
        imageUrl: '/images/frames/cat-eye-diamond.jpg',
        suitableFor: ['diamond', 'heart'],
        features: ['Eye-enhancing', 'Glamorous appeal', 'Cheekbone flattering'],
        priceRange: 'premium',
        popularity: 86
      },
      {
        id: 'rimless-diamond',
        name: 'Minimalist Rimless',
        category: 'oval',
        description: 'Rimless frames that don\'t compete with the natural diamond shape.',
        imageUrl: '/images/frames/rimless-diamond.jpg',
        suitableFor: ['diamond', 'oval'],
        features: ['Subtle elegance', 'Non-competing design', 'Professional look'],
        priceRange: 'premium',
        popularity: 81
      }
    ],
    avoidFrames: ['Narrow frames', 'Frames that emphasize cheekbone width'],
    celebrities: ['Halle Berry', 'Elizabeth Hurley', 'Frieda Pinto', 'Johnny Depp'],
    stylingTips: [
      'Choose frames that emphasize the eyes',
      'Cat-eye or oval frames work beautifully',
      'Avoid narrow frames that make cheekbones appear wider',
      'Rimless or semi-rimless frames are excellent choices'
    ]
  },
  {
    id: 'triangle',
    name: 'triangle',
    displayName: 'Triangle',
    description: 'Triangle faces, also known as pear-shaped, have a narrow forehead with a wider jawline. This creates a triangle shape that can be beautifully balanced with the right frames.',
    characteristics: [
      'Narrow forehead',
      'Wide jawline and chin',
      'Face is widest at the jaw',
      'Smaller upper face area',
      'Strong, defined jaw',
      'Triangle or pear-shaped silhouette'
    ],
    measurements: {
      widthToHeight: [1.0, 1.2],
      jawToForehead: [1.1, 1.4],
      cheekboneWidth: [0.8, 0.9]
    },
    imageUrl: '/images/face-shapes/triangle.jpg',
    recommendedFrames: [
      {
        id: 'top-heavy-triangle',
        name: 'Top-Heavy Frames',
        category: 'browline',
        description: 'Frames with emphasis on the upper portion to balance the wider jaw.',
        imageUrl: '/images/frames/top-heavy.jpg',
        suitableFor: ['triangle', 'heart'],
        features: ['Upper emphasis', 'Balancing effect', 'Classic styling'],
        priceRange: 'mid-range',
        popularity: 83
      },
      {
        id: 'cat-eye-triangle',
        name: 'Upswept Cat-Eye',
        category: 'cat-eye',
        description: 'Cat-eye frames that draw attention upward and balance the jawline.',
        imageUrl: '/images/frames/cat-eye-triangle.jpg',
        suitableFor: ['triangle', 'round'],
        features: ['Upward lift', 'Feminine appeal', 'Jaw balancing'],
        priceRange: 'premium',
        popularity: 85
      }
    ],
    avoidFrames: ['Bottom-heavy frames', 'Wide rectangular frames', 'Frames that emphasize jaw width'],
    celebrities: ['Kelly Osbourne', 'Minnie Driver', 'Stephanie Seymour', 'Forest Whitaker'],
    stylingTips: [
      'Choose frames that add width to the upper face',
      'Cat-eye and browline frames are ideal',
      'Avoid bottom-heavy or wide frames',
      'Look for decorative elements on top or temples'
    ]
  }
];

export const getFaceShapeById = (id: string): FaceShape | undefined => {
  return faceShapes.find(shape => shape.id === id);
};

export const getAllFrameRecommendations = (): FrameRecommendation[] => {
  const allFrames: FrameRecommendation[] = [];
  faceShapes.forEach(shape => {
    allFrames.push(...shape.recommendedFrames);
  });
  return allFrames;
}; 