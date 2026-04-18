'use client';

import React, { useState } from 'react';
import diseasesData from '@/data/diseases.json';

const URGENCY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  critical: { label: 'Критично',  color: '#DC2626', bg: '#FEE2E2' },
  high:     { label: 'Високий',   color: '#EA580C', bg: '#FFEDD5' },
  medium:   { label: 'Середній',  color: '#CA8A04', bg: '#FEF9C3' },
  low:      { label: 'Низький',   color: '#16A34A', bg: '#DCFCE7' },
};

const TYPE_CONFIG: Record<string, { color: string; bg: string }> = {
  fungal:   { color: '#92400E', bg: '#FEF3C7' },
  bacterial:{ color: '#1D4ED8', bg: '#DBEAFE' },
  pest:     { color: '#065F46', bg: '#D1FAE5' },
};

const Pin = ({ color }: { color: string }) => (
  <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
      <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
    </svg>
  </div>
);

interface DiseaseDetailProps {
  disease: typeof diseasesData.diseases[0];
  onBack: () => void;
}

function DiseaseDetail({ disease, onBack }: DiseaseDetailProps) {
  const urgency = URGENCY_CONFIG[disease.urgency] ?? URGENCY_CONFIG.medium;
  const typeConf = TYPE_CONFIG[disease.type] ?? TYPE_CONFIG.fungal;
  const rotations = ['-0.8deg', '0.5deg', '-0.5deg', '0.7deg', '-0.6deg', '0.4deg'];

  const infoItems = [
    { emoji: '🔍', label: 'Симптоми',    value: disease.symptoms },
    { emoji: '🦠', label: 'Причини',     value: disease.causes },
    { emoji: '💊', label: 'Лікування',   value: disease.treatment },
    { emoji: '🛡️', label: 'Профілактика', value: disease.prevention },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{
        height: '180px',
        background: `linear-gradient(135deg, ${urgency.bg} 0%, ${typeConf.bg} 100%)`,
        borderRadius: '0 0 16px 16px', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: '48px', left: '24px',
            backgroundColor: 'rgba(255,255,255,0.9)', padding: '8px 14px',
            borderRadius: '20px', color: urgency.color,
            fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500,
            border: 'none', cursor: 'pointer',
          }}
        >
          ← До каталогу
        </button>
        <span style={{ fontSize: '72px' }}>{disease.emoji}</span>
      </div>

      <div className="px-6 pt-6" style={{ paddingBottom: '32px' }}>
        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{
            backgroundColor: typeConf.bg, color: typeConf.color,
            padding: '4px 12px', borderRadius: '20px',
            fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600,
          }}>
            {disease.typeLabel}
          </span>
          <span style={{
            backgroundColor: urgency.bg, color: urgency.color,
            padding: '4px 12px', borderRadius: '20px',
            fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 600,
          }}>
            ⚠️ {urgency.label}
          </span>
          {disease.season.map((s) => (
            <span key={s} style={{
              backgroundColor: '#F0FDF4', color: '#16A34A',
              padding: '4px 12px', borderRadius: '20px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500,
            }}>{s}</span>
          ))}
        </div>

        <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '36px', color: urgency.color, fontWeight: 600, marginBottom: '20px' }}>
          {disease.name}
        </h1>

        {/* Affected plants */}
        <div style={{
          backgroundColor: '#FFF7ED', borderRadius: '4px', padding: '12px 16px',
          marginBottom: '24px', border: '1px solid #FED7AA', position: 'relative',
          transform: 'rotate(-0.3deg)',
        }}>
          <Pin color="#EA580C" />
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#92400E', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            🌿 Вражає рослини
          </div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#92400E' }}>
            {disease.affectedPlantsLabels.join(' · ')}
          </div>
        </div>

        {/* Info cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {infoItems.map((item, i) => (
            <div key={i} style={{
              position: 'relative', padding: '14px 16px',
              backgroundColor: urgency.bg, borderRadius: '4px',
              boxShadow: '2px 4px 10px rgba(0,0,0,0.07)',
              transform: `rotate(${rotations[i % rotations.length]})`,
            }}>
              <Pin color={urgency.color} />
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: urgency.color, fontWeight: 600, marginBottom: '4px' }}>
                {item.emoji} {item.label}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: urgency.color, opacity: 0.85 }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type TypeFilter = 'all' | 'fungal' | 'bacterial' | 'pest';

interface DiseasesSectionProps {
  initialDiseaseId?: string;
  onOpened?: () => void;
}

export function DiseasesSection({ initialDiseaseId, onOpened }: DiseasesSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(initialDiseaseId ?? null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');

  // Notify parent once we've consumed the initial disease
  React.useEffect(() => {
    if (initialDiseaseId) onOpened?.();
  }, []);

  const { diseases } = diseasesData;

  if (selectedId) {
    const disease = diseases.find((d) => d.id === selectedId);
    if (disease) {
      return <DiseaseDetail disease={disease} onBack={() => setSelectedId(null)} />;
    }
  }

  const filtered = typeFilter === 'all' ? diseases : diseases.filter((d) => d.type === typeFilter);

  const typeFilters: { id: TypeFilter; label: string; emoji: string }[] = [
    { id: 'all',      label: 'Усі',       emoji: '🔍' },
    { id: 'fungal',   label: 'Грибкові',  emoji: '🍄' },
    { id: 'bacterial',label: 'Бактерії',  emoji: '🦠' },
    { id: 'pest',     label: 'Шкідники',  emoji: '🐛' },
  ];

  return (
    <div>
      {/* Type filter chips */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '20px' }}>
        {typeFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => setTypeFilter(f.id)}
            style={{
              backgroundColor: typeFilter === f.id ? '#DC2626' : 'transparent',
              color: typeFilter === f.id ? '#FFFFFF' : '#DC2626',
              border: '1px solid #DC2626',
              padding: '8px 14px', borderRadius: '20px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500,
              whiteSpace: 'nowrap', cursor: 'pointer',
            }}
          >
            {f.emoji} {f.label}
          </button>
        ))}
      </div>

      {/* Disease cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((disease, index) => {
          const urgency = URGENCY_CONFIG[disease.urgency] ?? URGENCY_CONFIG.medium;
          const typeConf = TYPE_CONFIG[disease.type] ?? TYPE_CONFIG.fungal;
          const rotation = index % 2 === 0 ? '0.3deg' : '-0.3deg';

          return (
            <div
              key={disease.id}
              onClick={() => setSelectedId(disease.id)}
              style={{
                position: 'relative', padding: '14px 16px',
                backgroundColor: urgency.bg,
                borderRadius: '4px',
                boxShadow: '2px 3px 8px rgba(0,0,0,0.08)',
                transform: `rotate(${rotation})`,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '14px',
              }}
            >
              <Pin color={urgency.color} />
              <span style={{ fontSize: '28px', flexShrink: 0 }}>{disease.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontFamily: 'Caveat, cursive', fontSize: '20px', color: urgency.color, fontWeight: 600 }}>
                    {disease.name}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{
                    backgroundColor: typeConf.bg, color: typeConf.color,
                    padding: '2px 8px', borderRadius: '10px',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 500,
                  }}>
                    {disease.typeLabel}
                  </span>
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: urgency.color, opacity: 0.75,
                  }}>
                    {disease.affectedPlantsLabels.slice(0, 2).join(', ')}
                    {disease.affectedPlantsLabels.length > 2 ? ` +${disease.affectedPlantsLabels.length - 2}` : ''}
                  </span>
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  backgroundColor: urgency.bg, color: urgency.color,
                  width: '8px', height: '8px', borderRadius: '50%',
                  border: `2px solid ${urgency.color}`,
                }} />
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: urgency.color, opacity: 0.4, flexShrink: 0 }}>→</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
