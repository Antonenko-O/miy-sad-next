'use client';

import React from 'react';
import { PlantIcon } from './PlantIcon';
import type { CategoryId } from '@/types';
import { CATEGORY_CONFIG } from '@/types';

interface PlantCardProps {
  name: string;
  latinName: string;
  category: CategoryId;
  index: number;
}

export function PlantCard({ name, latinName, category, index }: PlantCardProps) {
  const cfg = CATEGORY_CONFIG[category];
  const rotation = index % 2 === 0 ? '1deg' : '-1.5deg';

  return (
    <div
      style={{
        backgroundColor: cfg.cardColor,
        transform: `rotate(${rotation})`,
        boxShadow: '2px 4px 10px rgba(52,85,43,0.10)',
        borderRadius: '4px',
        minHeight: '180px',
        padding: '16px',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}) translateY(-4px)`;
        e.currentTarget.style.boxShadow = '2px 8px 18px rgba(52,85,43,0.14)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation})`;
        e.currentTarget.style.boxShadow = '2px 4px 10px rgba(52,85,43,0.10)';
      }}
    >
      {/* Pin */}
      <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill={cfg.pinColor}>
          <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
        </svg>
      </div>

      {/* Folded corner */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px',
        background: 'linear-gradient(135deg, transparent 50%, rgba(52,85,43,0.05) 50%)',
        borderRadius: '0 0 4px 0',
      }} />

      {/* Icon */}
      <div style={{ marginBottom: '8px' }}>
        <PlantIcon category={category} color={cfg.accent} size={48} opacity={0.5} />
      </div>

      {/* Name */}
      <h3 style={{ fontFamily: 'Caveat, cursive', fontSize: '22px', color: cfg.accent, fontWeight: 600, marginBottom: '4px' }}>
        {name}
      </h3>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: cfg.accent, opacity: 0.6, fontStyle: 'italic' }}>
        {latinName}
      </p>
    </div>
  );
}
