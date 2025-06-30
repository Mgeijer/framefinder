import React from 'react';

interface FaceShapeIconProps {
  shape: 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'triangle';
  size?: number;
  className?: string;
}

export function FaceShapeIcon({ shape, size = 60, className = "" }: FaceShapeIconProps) {
  const iconComponents = {
    oval: (
      <svg width={size} height={size} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className={`mx-auto ${className}`}>
        <defs>
          <radialGradient id="oval-shading" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#f8f8f8"/>
            <stop offset="70%" stopColor="#e8e8e8"/>
            <stop offset="100%" stopColor="#d0d0d0"/>
          </radialGradient>
        </defs>
        <path d="M100 20 C130 20, 150 50, 150 100 C150 150, 130 200, 100 220 C70 200, 50 150, 50 100 C50 50, 70 20, 100 20 Z" 
              fill="url(#oval-shading)" stroke="#333" strokeWidth="1.2"/>
        <ellipse cx="80" cy="85" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
        <ellipse cx="120" cy="85" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
        <circle cx="80" cy="85" r="3" fill="#4a4a4a"/>
        <circle cx="120" cy="85" r="3" fill="#4a4a4a"/>
        <path d="M90 150 Q100 160, 110 150" fill="none" stroke="#333" strokeWidth="1.2"/>
        <path d="M70 75 Q80 70, 90 75" fill="none" stroke="#333" strokeWidth="1.5"/>
        <path d="M110 75 Q120 70, 130 75" fill="none" stroke="#333" strokeWidth="1.5"/>
      </svg>
    ),
    round: (
      <svg width={size} height={size} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className={`mx-auto ${className}`}>
        <defs>
          <radialGradient id="round-shading" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#f8f8f8"/>
            <stop offset="70%" stopColor="#e8e8e8"/>
            <stop offset="100%" stopColor="#d0d0d0"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="120" r="60" fill="url(#round-shading)" stroke="#333" strokeWidth="1.2"/>
        <ellipse cx="55" cy="125" rx="10" ry="15" fill="#e0e0e0" opacity="0.4"/>
        <ellipse cx="145" cy="125" rx="10" ry="15" fill="#e0e0e0" opacity="0.4"/>
        <ellipse cx="80" cy="105" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
        <ellipse cx="120" cy="105" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
        <circle cx="80" cy="105" r="3" fill="#4a4a4a"/>
        <circle cx="120" cy="105" r="3" fill="#4a4a4a"/>
        <path d="M90 165 Q100 175, 110 165" fill="none" stroke="#333" strokeWidth="1.2"/>
        <path d="M70 95 Q80 90, 90 95" fill="none" stroke="#333" strokeWidth="1.5"/>
        <path d="M110 95 Q120 90, 130 95" fill="none" stroke="#333" strokeWidth="1.5"/>
      </svg>
    ),
    square: (
      <svg width={size} height={size} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className={`mx-auto ${className}`}>
        <defs>
          <radialGradient id="square-shading" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#f8f8f8"/>
            <stop offset="70%" stopColor="#e8e8e8"/>
            <stop offset="100%" stopColor="#d0d0d0"/>
          </radialGradient>
        </defs>
        <path d="M55 40 L145 40 L150 50 L155 100 L155 170 L150 190 L100 205 L50 190 L45 170 L45 100 L50 50 Z" 
              fill="url(#square-shading)" stroke="#333" strokeWidth="1.2"/>
        <path d="M50 170 Q100 190, 150 170" fill="#d8d8d8" stroke="#bbb" strokeWidth="0.8"/>
        <ellipse cx="80" cy="90" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
        <ellipse cx="120" cy="90" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
        <circle cx="80" cy="90" r="3" fill="#4a4a4a"/>
        <circle cx="120" cy="90" r="3" fill="#4a4a4a"/>
        <path d="M90 155 Q100 165, 110 155" fill="none" stroke="#333" strokeWidth="1.2"/>
        <path d="M70 80 Q80 75, 90 80" fill="none" stroke="#333" strokeWidth="1.8"/>
        <path d="M110 80 Q120 75, 130 80" fill="none" stroke="#333" strokeWidth="1.8"/>
      </svg>
    ),
    heart: (
      <svg width={size} height={size} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className={`mx-auto ${className}`}>
        <defs>
          <radialGradient id="heart-shading" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#f8f8f8"/>
            <stop offset="70%" stopColor="#e8e8e8"/>
            <stop offset="100%" stopColor="#d0d0d0"/>
          </radialGradient>
        </defs>
        <path d="M100 20 C135 20, 160 40, 160 75 C160 95, 155 115, 145 135 C135 155, 125 175, 100 205 C75 175, 65 155, 55 135 C45 115, 40 95, 40 75 C40 40, 65 20, 100 20 Z" 
              fill="url(#heart-shading)" stroke="#333" strokeWidth="1.2"/>
        <path d="M45 60 Q100 50, 155 60" fill="none" stroke="#ddd" strokeWidth="0.8" opacity="0.6"/>
        <ellipse cx="80" cy="75" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
        <ellipse cx="120" cy="75" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
        <circle cx="80" cy="75" r="3" fill="#4a4a4a"/>
        <circle cx="120" cy="75" r="3" fill="#4a4a4a"/>
        <path d="M92 140 Q100 150, 108 140" fill="none" stroke="#333" strokeWidth="1.2"/>
        <path d="M70 65 Q80 60, 90 65" fill="none" stroke="#333" strokeWidth="1.5"/>
        <path d="M110 65 Q120 60, 130 65" fill="none" stroke="#333" strokeWidth="1.5"/>
        <path d="M85 180 Q100 200, 115 180" fill="none" stroke="#aaa" strokeWidth="1" opacity="0.8"/>
      </svg>
    ),
    diamond: (
      <svg width={size} height={size} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className={`mx-auto ${className}`}>
        <defs>
          <radialGradient id="diamond-shading" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#f8f8f8"/>
            <stop offset="70%" stopColor="#e8e8e8"/>
            <stop offset="100%" stopColor="#d0d0d0"/>
          </radialGradient>
        </defs>
        <path d="M100 25 C118 25, 130 35, 135 50 C145 70, 155 90, 155 110 C155 130, 145 150, 135 170 C130 185, 118 195, 100 205 C82 195, 70 185, 65 170 C55 150, 45 130, 45 110 C45 90, 55 70, 65 50 C70 35, 82 25, 100 25 Z" 
              fill="url(#diamond-shading)" stroke="#333" strokeWidth="1.2"/>
        <ellipse cx="40" cy="110" rx="6" ry="12" fill="#d8d8d8" opacity="0.6"/>
        <ellipse cx="160" cy="110" rx="6" ry="12" fill="#d8d8d8" opacity="0.6"/>
        <ellipse cx="80" cy="85" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
        <ellipse cx="120" cy="85" rx="8" ry="5" fill="white" stroke="#333" strokeWidth="0.8"/>
        <circle cx="80" cy="85" r="3" fill="#4a4a4a"/>
        <circle cx="120" cy="85" r="3" fill="#4a4a4a"/>
        <path d="M92 150 Q100 160, 108 150" fill="none" stroke="#333" strokeWidth="1.2"/>
        <path d="M72 75 Q80 70, 88 75" fill="none" stroke="#333" strokeWidth="1.5"/>
        <path d="M112 75 Q120 70, 128 75" fill="none" stroke="#333" strokeWidth="1.5"/>
      </svg>
    ),
    triangle: (
      <svg width={size} height={size} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className={`mx-auto ${className}`}>
        <defs>
          <radialGradient id="triangle-shading" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#f8f8f8"/>
            <stop offset="70%" stopColor="#e8e8e8"/>
            <stop offset="100%" stopColor="#d0d0d0"/>
          </radialGradient>
        </defs>
        <path d="M100 30 C112 30, 122 35, 127 45 C132 55, 137 70, 142 90 C147 110, 152 130, 157 150 C162 170, 155 185, 140 195 C125 205, 100 215, 100 215 C100 215, 75 205, 60 195 C45 185, 38 170, 43 150 C48 130, 53 110, 58 90 C63 70, 68 55, 73 45 C78 35, 88 30, 100 30 Z" 
              fill="url(#triangle-shading)" stroke="#333" strokeWidth="1.2"/>
        <path d="M40 175 Q100 195, 160 175" fill="#d0d0d0" stroke="#aaa" strokeWidth="1"/>
        <ellipse cx="85" cy="75" rx="7" ry="4" fill="white" stroke="#333" strokeWidth="0.8"/>
        <ellipse cx="115" cy="75" rx="7" ry="4" fill="white" stroke="#333" strokeWidth="0.8"/>
        <circle cx="85" cy="75" r="2.5" fill="#4a4a4a"/>
        <circle cx="115" cy="75" r="2.5" fill="#4a4a4a"/>
        <path d="M88 140 Q100 150, 112 140" fill="none" stroke="#333" strokeWidth="1.2"/>
        <path d="M78 65 Q85 62, 92 65" fill="none" stroke="#333" strokeWidth="1.3"/>
        <path d="M108 65 Q115 62, 122 65" fill="none" stroke="#333" strokeWidth="1.3"/>
      </svg>
    )
  };

  return iconComponents[shape] || null;
}