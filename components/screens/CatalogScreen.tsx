'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { CatalogCard } from '@/components/CatalogCard';
import { DiseasesSection } from '@/components/DiseasesSection';
import { ToolsSection } from '@/components/ToolsSection';
import { catalog, searchPlants } from '@/lib/data';
import type { CategoryId } from '@/types';

type FilterId = 'all' | CategoryId;
type Section = 'plants' | 'diseases' | 'tools';

const SECTION_IDS: { id: Section; emoji: string }[] = [
  { id: 'plants',   emoji: '🌱' },
  { id: 'diseases', emoji: '🦠' },
  { id: 'tools',    emoji: '🪴' },
];

const FILTER_IDS: FilterId[] = ['all', 'kvity', 'kushchi', 'plodovi', 'dekoratyvni'];

interface CatalogScreenProps {
  onSelectPlant: (id: string) => void;
  initialDiseaseId?: string | null;
  onDiseaseOpened?: () => void;
}

export function CatalogScreen({ onSelectPlant, initialDiseaseId, onDiseaseOpened }: CatalogScreenProps) {
  const t = useTranslations('catalog');

  const [section, setSection] = useState<Section>(initialDiseaseId ? 'diseases' : 'plants');
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [query, setQuery] = useState('');

  const accent = '#1E3A5F';

  const plants = useMemo(() => {
    if (query.trim().length > 1) return searchPlants(query);
    if (activeFilter === 'all') return catalog.plants;
    return catalog.plants.filter((p) => p.category === activeFilter);
  }, [activeFilter, query]);

  const handleSectionChange = (s: Section) => {
    setSection(s);
    if (s !== 'plants') setQuery('');
  };

  return (
    <div className="px-6 pt-12 pb-4">
      <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '40px', color: accent, fontWeight: 600, marginBottom: '4px' }}>
        {t('title')} 📚
      </h1>

      {/* Section switcher */}
      <div style={{
        display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '12px',
        padding: '4px', gap: '4px', marginBottom: '20px', marginTop: '20px',
      }}>
        {SECTION_IDS.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSectionChange(s.id)}
            style={{
              flex: 1,
              backgroundColor: section === s.id ? '#FFFFFF' : 'transparent',
              color: section === s.id ? accent : `${accent}80`,
              border: 'none',
              padding: '10px 8px', borderRadius: '8px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: section === s.id ? 600 : 400,
              cursor: 'pointer',
              boxShadow: section === s.id ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {s.emoji} {t(`sections.${s.id}`)}
          </button>
        ))}
      </div>

      {/* Plants section */}
      {section === 'plants' && (
        <>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <span style={{
              position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
              fontSize: '16px', pointerEvents: 'none',
            }}>🔍</span>
            <input
              type="search"
              placeholder={t('searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%', padding: '14px 16px 14px 40px',
                border: `2px solid #BBFFD8`, borderRadius: '24px',
                fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: accent,
                backgroundColor: '#FFFFFF', outline: 'none', boxSizing: 'border-box',
                WebkitAppearance: 'none',
              }}
            />
            {query.length > 0 && (
              <button
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '18px', color: accent, opacity: 0.4, padding: '4px',
                }}
              >✕</button>
            )}
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
            {FILTER_IDS.map((id) => (
              <button
                key={id}
                onClick={() => { setActiveFilter(id); setQuery(''); }}
                style={{
                  backgroundColor: activeFilter === id ? accent : 'transparent',
                  color: activeFilter === id ? '#FFFFFF' : accent,
                  border: `1px solid ${accent}`,
                  padding: '8px 16px', borderRadius: '20px',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 500,
                  whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s ease',
                }}
              >
                {t(`categories.${id}`)}
              </button>
            ))}
          </div>

          {/* Plant grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', paddingBottom: '8px' }}>
            {plants.map((plant, index) => (
              <div key={plant.id} onClick={() => onSelectPlant(plant.id)} style={{ cursor: 'pointer' }}>
                <CatalogCard
                  name={plant.name}
                  latinName={plant.latinName ?? ''}
                  category={plant.category}
                  index={index}
                  plantId={plant.id}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Diseases section */}
      {section === 'diseases' && (
        <DiseasesSection
          initialDiseaseId={initialDiseaseId ?? undefined}
          onOpened={onDiseaseOpened}
        />
      )}

      {/* Tools section */}
      {section === 'tools' && <ToolsSection />}
    </div>
  );
}
