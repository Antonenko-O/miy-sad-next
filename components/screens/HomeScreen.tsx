'use client';

import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { CareCard } from '@/components/CareCard';
import { CareDrawer } from '@/components/CareDrawer';
import { PlantIcon } from '@/components/PlantIcon';
import { catalog } from '@/lib/data';
import { getTodayTasks } from '@/lib/myGarden';
import { CATEGORY_CONFIG, type CategoryId } from '@/types';
import { getPlantImageUrl } from '@/lib/plantImages';

const WaterIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 30C22 30 25 27 25 23C25 19 18 10 18 10C18 10 11 19 11 23C11 27 14 30 18 30Z"
      stroke="#34552B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PruneIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="12" cy="24" r="4" stroke="#34552B" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="#34552B" strokeWidth="1.5" />
    <path d="M15 21L26 10" stroke="#34552B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 15L26 26" stroke="#34552B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FertilizeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M8 14H22L20 26H10L8 14Z" stroke="#34552B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 17H27L25 22" stroke="#34552B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 14C8 14 10 10 15 10H18" stroke="#34552B" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="26" cy="25" r="1" fill="#34552B" />
    <circle cx="29" cy="22" r="1" fill="#34552B" />
    <circle cx="28" cy="28" r="1" fill="#34552B" />
  </svg>
);

// Show only first 6 plants from catalog for the home preview
const previewPlants = catalog.plants.slice(0, 6);

interface HomeScreenProps {
  onAddPlant: () => void;
  onSelectPlant: (id: string) => void;
}

export function HomeScreen({ onAddPlant, onSelectPlant }: HomeScreenProps) {
  const t = useTranslations('home');
  const tCare = useTranslations('care');
  const tSeasons = useTranslations('seasons');
  const locale = useLocale();

  const [drawerType, setDrawerType] = useState<'water' | 'prune' | 'fertilize' | null>(null);
  const tasks = useMemo(() => getTodayTasks(), []);

  // Locale-aware date + season
  const now = new Date();
  const dateLocale = locale === 'uk' ? 'uk-UA' : 'en-US';
  const dateFormatted = new Intl.DateTimeFormat(dateLocale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now);
  const seasonKeys = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer',
    'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'] as const;
  const season = tSeasons(seasonKeys[now.getMonth()]);
  const dateStr = `${dateFormatted} · ${season}`;

  return (
    <div className="px-6 pt-12 pb-4">
      {/* Greeting */}
      <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '40px', color: '#34552B', fontWeight: 600, lineHeight: 1.2 }}>
        {t('greeting')}
      </h1>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#34552B', opacity: 0.6, marginTop: '4px', marginBottom: '32px' }}>
        {dateStr}
      </p>

      {/* Care Cards */}
      <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: '#34552B', fontWeight: 500, marginBottom: '16px' }}>
        {t('careToday')}
      </h2>
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '32px' }}>
        <CareCard icon={<WaterIcon />} title={tCare('water')} count={tasks.water.length} rotation="-1.5deg" onClick={() => setDrawerType('water')} />
        <CareCard icon={<PruneIcon />} title={tCare('prune')} count={tasks.prune.length} rotation="0.5deg" onClick={() => setDrawerType('prune')} />
        <CareCard icon={<FertilizeIcon />} title={tCare('fertilize')} count={tasks.fertilize.length} rotation="-0.8deg" onClick={() => setDrawerType('fertilize')} />
      </div>

      {/* My Garden Preview */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: '#34552B', fontWeight: 500 }}>
          {t('myGarden')}
        </h2>
        <button
          onClick={onAddPlant}
          style={{
            backgroundColor: '#34552B', color: '#FEFAF8', borderRadius: '4px',
            fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 14px', border: 'none', cursor: 'pointer',
          }}
        >
          <Plus size={16} /> {t('addShort')}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {previewPlants.map((plant, index) => {
          const cfg = CATEGORY_CONFIG[plant.category as CategoryId];
          const rotation = index % 2 === 0 ? '0.4deg' : '-0.4deg';
          return (
            <div
              key={plant.id}
              onClick={() => onSelectPlant(plant.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                backgroundColor: cfg.cardColor,
                padding: '10px 14px',
                borderRadius: '4px',
                transform: `rotate(${rotation})`,
                boxShadow: '2px 3px 8px rgba(52,85,43,0.08)',
                cursor: 'pointer', position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)' }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill={cfg.pinColor}>
                  <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
                </svg>
              </div>
              {(() => {
                const img = getPlantImageUrl(plant.id);
                return img ? (
                  <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, backgroundColor: cfg.cardColor }}>
                    <img src={img} alt={plant.name} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }} />
                  </div>
                ) : (
                  <PlantIcon category={plant.category as CategoryId} color={cfg.accent} size={36} opacity={0.5} />
                );
              })()}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: '20px', color: cfg.accent, fontWeight: 600, lineHeight: 1.2 }}>
                  {plant.name}
                </div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: cfg.accent, opacity: 0.6, fontStyle: 'italic' }}>
                  {plant.latinName}
                </div>
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: cfg.accent, opacity: 0.3 }}>→</div>
            </div>
          );
        })}
      </div>

      <CareDrawer
        open={drawerType !== null}
        onClose={() => setDrawerType(null)}
        type={drawerType}
        items={drawerType ? tasks[drawerType] : []}
      />
    </div>
  );
}
