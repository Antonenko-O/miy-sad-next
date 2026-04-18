'use client';

import React from 'react';
import { PlantIcon } from './PlantIcon';
import type { CategoryId } from '@/types';
import { CATEGORY_CONFIG } from '@/types';
import { getPlantImageUrl } from '@/lib/plantImages';

interface CatalogCardProps {
  name: string;
  latinName: string;
  category: CategoryId;
  index: number;
  plantId?: string;
}

const DIFFICULTY: Record<CategoryId, string> = {
  kvity: 'Середня',
  kushchi: 'Легка',
  plodovi: 'Складна',
  dekoratyvni: 'Легка',
};

export function CatalogCard({ name, latinName, category, index, plantId }: CatalogCardProps) {
  const cfg = CATEGORY_CONFIG[category];
  const rotation = index % 2 === 0 ? '-1deg' : '0.8deg';
  const imageUrl = plantId ? getPlantImageUrl(plantId) : null;

  return (
    <div
      style={{
        backgroundColor: cfg.cardColor,
        transform: `rotate(${rotation})`,
        boxShadow: '2px 4px 10px rgba(30,58,95,0.10)',
        borderRadius: '4px',
        padding: '16px',
        position: 'relative',
        minHeight: '180px',
        transition: 'transform 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}) translateY(-4px)`;
        e.currentTarget.style.boxShadow = '2px 8px 18px rgba(30,58,95,0.14)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation})`;
        e.currentTarget.style.boxShadow = '2px 4px 10px rgba(30,58,95,0.10)';
      }}
    >
      {/* Pin */}
      <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill={cfg.pinColor}>
          <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
        </svg>
      </div>

      {/* Image or icon */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: 'calc(100% + 32px)',
            marginLeft: '-16px',
            height: '120px',
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            display: 'block',
            marginBottom: '8px',
          }}
        />
      ) : (
        <div style={{ marginBottom: '8px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PlantIcon category={category} color={cfg.accent} size={48} opacity={0.5} />
        </div>
      )}

      <h3 style={{ fontFamily: 'Caveat, cursive', fontSize: '22px', color: cfg.accent, fontWeight: 600, marginBottom: '2px' }}>
        {name}
      </h3>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: cfg.accent, opacity: 0.6, fontStyle: 'italic', marginBottom: '10px' }}>
        {latinName}
      </p>

      <span style={{
        display: 'inline-block',
        backgroundColor: cfg.tabColor,
        color: cfg.accent,
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '11px',
        fontWeight: 500,
        padding: '3px 10px',
        borderRadius: '10px',
      }}>
        {DIFFICULTY[category]}
      </span>
    </div>
  );
}
