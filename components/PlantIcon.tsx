import React from 'react';
import type { CategoryId } from '@/types';

interface PlantIconProps {
  category: CategoryId;
  color?: string;
  size?: number;
  opacity?: number;
}

// Flower / Квіти
const FlowerIcon = ({ color, size, opacity }: { color: string; size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="5" stroke={color} strokeWidth="1.2" opacity={opacity} />
    <ellipse cx="24" cy="12" rx="4" ry="7" stroke={color} strokeWidth="1.2" opacity={opacity} />
    <ellipse cx="24" cy="36" rx="4" ry="7" stroke={color} strokeWidth="1.2" opacity={opacity} />
    <ellipse cx="12" cy="24" rx="7" ry="4" stroke={color} strokeWidth="1.2" opacity={opacity} />
    <ellipse cx="36" cy="24" rx="7" ry="4" stroke={color} strokeWidth="1.2" opacity={opacity} />
    <ellipse cx="15" cy="15" rx="4" ry="7" transform="rotate(-45 15 15)" stroke={color} strokeWidth="1.2" opacity={opacity} />
    <ellipse cx="33" cy="33" rx="4" ry="7" transform="rotate(-45 33 33)" stroke={color} strokeWidth="1.2" opacity={opacity} />
    <ellipse cx="33" cy="15" rx="4" ry="7" transform="rotate(45 33 15)" stroke={color} strokeWidth="1.2" opacity={opacity} />
    <ellipse cx="15" cy="33" rx="4" ry="7" transform="rotate(45 15 33)" stroke={color} strokeWidth="1.2" opacity={opacity} />
  </svg>
);

// Shrub / Кущі
const ShrubIcon = ({ color, size, opacity }: { color: string; size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 42V30" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={opacity} />
    <path d="M24 30C24 30 18 22 12 18C10 17 10 14 14 14C17 14 20 17 24 22C28 17 31 14 34 14C38 14 38 17 36 18C30 22 24 30 24 30Z"
      stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} />
    <path d="M16 28C16 28 12 24 10 20" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={opacity * 0.6} />
    <path d="M32 28C32 28 36 24 38 20" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={opacity * 0.6} />
    <path d="M20 36C20 36 16 32 14 28" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={opacity * 0.6} />
    <path d="M28 36C28 36 32 32 34 28" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={opacity * 0.6} />
  </svg>
);

// Fruit tree / Плодові
const FruitIcon = ({ color, size, opacity }: { color: string; size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 42V24" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={opacity} />
    <path d="M24 24C24 24 16 18 12 12C10 9 12 6 16 8C19 9 22 12 24 16C26 12 29 9 32 8C36 6 38 9 36 12C32 18 24 24 24 24Z"
      stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} />
    <circle cx="16" cy="22" r="4" stroke={color} strokeWidth="1" opacity={opacity * 0.7} />
    <circle cx="32" cy="20" r="3.5" stroke={color} strokeWidth="1" opacity={opacity * 0.7} />
    <circle cx="24" cy="30" r="3" stroke={color} strokeWidth="1" opacity={opacity * 0.7} />
    <path d="M16 18C16 18 15 16 16 14" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity={opacity * 0.5} />
    <path d="M32 16C32 16 31 14 32 12" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity={opacity * 0.5} />
  </svg>
);

// Decorative tree / Декоративні
const TreeIcon = ({ color, size, opacity }: { color: string; size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 42V28" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={opacity} />
    <path d="M24 28L12 40" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={opacity * 0.4} />
    <path d="M24 28L36 40" stroke={color} strokeWidth="1" strokeLinecap="round" opacity={opacity * 0.4} />
    <path d="M24 10L14 24H34L24 10Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} />
    <path d="M20 20L12 32H32L20 20Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} fill="none"/>
    <path d="M24 6L18 16H30L24 6Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity} />
  </svg>
);

// Generic leaf fallback
const LeafIcon = ({ color, size, opacity }: { color: string; size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path
      d="M24 40V20M24 20C24 20 20 16 16 12C14 10 14 8 16 8C18 8 20 10 24 14C28 10 30 8 32 8C34 8 34 10 32 12C28 16 24 20 24 20Z"
      stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity={opacity}
    />
  </svg>
);

export function PlantIcon({ category, color = '#34552B', size = 48, opacity = 0.5 }: PlantIconProps) {
  const props = { color, size, opacity };
  switch (category) {
    case 'kvity': return <FlowerIcon {...props} />;
    case 'kushchi': return <ShrubIcon {...props} />;
    case 'plodovi': return <FruitIcon {...props} />;
    case 'dekoratyvni': return <TreeIcon {...props} />;
    default: return <LeafIcon {...props} />;
  }
}
