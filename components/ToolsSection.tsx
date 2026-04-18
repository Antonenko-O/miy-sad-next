'use client';

import React, { useState } from 'react';
import toolsData from '@/data/tools.json';

const CATEGORY_COLORS: Record<string, { color: string; bg: string; accent: string }> = {
  pruning:   { color: '#92400E', bg: '#FEF3C7', accent: '#B45309' },
  soil:      { color: '#065F46', bg: '#D1FAE5', accent: '#059669' },
  watering:  { color: '#1E3A5F', bg: '#DBEAFE', accent: '#2563EB' },
  protection:{ color: '#4C1D95', bg: '#EDE9FE', accent: '#7C3AED' },
  lawn:      { color: '#14532D', bg: '#DCFCE7', accent: '#16A34A' },
  transport: { color: '#7C2D12', bg: '#FFEDD5', accent: '#EA580C' },
};

const Pin = ({ color }: { color: string }) => (
  <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
      <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
    </svg>
  </div>
);

interface ToolDetailProps {
  tool: typeof toolsData.tools[0];
  onBack: () => void;
}

function ToolDetail({ tool, onBack }: ToolDetailProps) {
  const conf = CATEGORY_COLORS[tool.category] ?? CATEGORY_COLORS.soil;
  const rotations = ['-0.8deg', '0.5deg', '-0.5deg', '0.7deg'];

  return (
    <div>
      {/* Hero */}
      <div style={{
        height: '180px',
        background: `linear-gradient(135deg, ${conf.bg} 0%, #FFFFFF 100%)`,
        borderRadius: '0 0 16px 16px', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: '48px', left: '24px',
            backgroundColor: 'rgba(255,255,255,0.9)', padding: '8px 14px',
            borderRadius: '20px', color: conf.accent,
            fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500,
            border: 'none', cursor: 'pointer',
          }}
        >
          ← До каталогу
        </button>
        <span style={{ fontSize: '72px' }}>{tool.emoji}</span>
      </div>

      <div className="px-6 pt-6" style={{ paddingBottom: '32px' }}>
        {/* Category + Season badges */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{
            backgroundColor: conf.bg, color: conf.color,
            padding: '4px 12px', borderRadius: '20px',
            fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600,
          }}>
            {tool.categoryLabel}
          </span>
          {tool.season.map((s) => (
            <span key={s} style={{
              backgroundColor: '#F0FDF4', color: '#16A34A',
              padding: '4px 12px', borderRadius: '20px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500,
            }}>{s}</span>
          ))}
        </div>

        <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '36px', color: conf.accent, fontWeight: 600, marginBottom: '4px' }}>
          {tool.name}
        </h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: conf.color, opacity: 0.75, marginBottom: '20px' }}>
          {tool.shortDesc}
        </p>

        {/* Description */}
        <div style={{
          backgroundColor: conf.bg, borderRadius: '4px', padding: '16px',
          marginBottom: '24px', position: 'relative',
          transform: 'rotate(-0.4deg)',
          boxShadow: '2px 4px 10px rgba(0,0,0,0.07)',
        }}>
          <Pin color={conf.accent} />
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: conf.color, fontStyle: 'italic', lineHeight: 1.6 }}>
            {tool.description}
          </p>
        </div>

        {/* Used for */}
        <div style={{
          position: 'relative', backgroundColor: conf.bg, borderRadius: '4px',
          padding: '14px 16px', marginBottom: '12px',
          boxShadow: '2px 4px 10px rgba(0,0,0,0.07)',
          transform: `rotate(${rotations[1]})`,
        }}>
          <Pin color={conf.accent} />
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: conf.accent, fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            🎯 Використовується для
          </div>
          <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
            {tool.usedFor.map((item, i) => (
              <li key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: conf.color, marginBottom: '4px' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tips */}
        <div style={{
          position: 'relative', backgroundColor: '#FFFBEB', borderRadius: '4px',
          padding: '14px 16px', marginBottom: '12px',
          boxShadow: '2px 4px 10px rgba(0,0,0,0.07)',
          transform: `rotate(${rotations[2]})`,
        }}>
          <Pin color="#CA8A04" />
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#92400E', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            💡 Поради
          </div>
          {tool.tips.map((tip, i) => (
            <div key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#92400E', marginBottom: '4px' }}>
              • {tip}
            </div>
          ))}
        </div>

        {/* Care */}
        <div style={{
          position: 'relative', backgroundColor: '#F0FDF4', borderRadius: '4px',
          padding: '14px 16px',
          boxShadow: '2px 4px 10px rgba(0,0,0,0.07)',
          transform: `rotate(${rotations[3]})`,
        }}>
          <Pin color="#16A34A" />
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#14532D', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            🧹 Догляд за інструментом
          </div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#14532D' }}>
            {tool.care}
          </div>
        </div>
      </div>
    </div>
  );
}

type CatFilter = 'all' | string;

export function ToolsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [catFilter, setCatFilter] = useState<CatFilter>('all');

  const { tools, categories } = toolsData;

  if (selectedId) {
    const tool = tools.find((t) => t.id === selectedId);
    if (tool) {
      return <ToolDetail tool={tool} onBack={() => setSelectedId(null)} />;
    }
  }

  const filtered = catFilter === 'all' ? tools : tools.filter((t) => t.category === catFilter);

  const catFilters = [{ id: 'all', label: 'Усі', emoji: '🔍' }, ...categories.map((c) => ({ id: c.id, label: c.label, emoji: c.emoji }))];

  return (
    <div>
      {/* Category filter chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px' }}>
        {catFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => setCatFilter(f.id)}
            style={{
              backgroundColor: catFilter === f.id ? '#92400E' : 'transparent',
              color: catFilter === f.id ? '#FFFFFF' : '#92400E',
              border: '1px solid #92400E',
              padding: '8px 14px', borderRadius: '20px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500,
              whiteSpace: 'nowrap', cursor: 'pointer',
            }}
          >
            {f.emoji} {f.label}
          </button>
        ))}
      </div>

      {/* Tools grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {filtered.map((tool, index) => {
          const conf = CATEGORY_COLORS[tool.category] ?? CATEGORY_COLORS.soil;
          const rotation = index % 2 === 0 ? '0.4deg' : '-0.4deg';

          return (
            <div
              key={tool.id}
              onClick={() => setSelectedId(tool.id)}
              style={{
                position: 'relative',
                backgroundColor: conf.bg,
                borderRadius: '4px',
                padding: '16px 14px',
                boxShadow: '2px 3px 8px rgba(0,0,0,0.08)',
                transform: `rotate(${rotation})`,
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                textAlign: 'center',
              }}
            >
              <Pin color={conf.accent} />
              <span style={{ fontSize: '32px' }}>{tool.emoji}</span>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: '18px', color: conf.accent, fontWeight: 600, lineHeight: 1.2 }}>
                {tool.name}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: conf.color, opacity: 0.75, lineHeight: 1.4 }}>
                {tool.shortDesc}
              </div>
              <span style={{
                backgroundColor: 'white', color: conf.color,
                padding: '2px 8px', borderRadius: '10px',
                fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 500,
              }}>
                {tool.categoryLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
