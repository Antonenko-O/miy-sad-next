'use client';

import React from 'react';

interface CareCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  rotation: string;
  onClick?: () => void;
}

export function CareCard({ icon, title, count, rotation, onClick }: CareCardProps) {
  return (
    <div
      onClick={onClick}
      className="p-4 flex flex-col"
      style={{
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: '#FFFFFF',
        border: '1px solid #FFDCF6',
        transform: `rotate(${rotation})`,
        boxShadow: '2px 4px 12px rgba(52, 85, 43, 0.08)',
        borderRadius: '4px',
        minWidth: '140px',
        transition: 'transform 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}) scale(1.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation})`;
      }}
    >
      <div className="mb-2">{icon}</div>
      <div
        className="mb-1"
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          color: '#34552B'
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'Caveat, cursive',
          fontSize: '32px',
          color: '#34552B',
          fontWeight: 600
        }}
      >
        {count}
      </div>
    </div>
  );
}
