'use client';

import React from 'react';
import { getPlantById, getCompanions } from '@/lib/data';
import { PlantIcon } from '@/components/PlantIcon';
import { CATEGORY_CONFIG } from '@/types';
import { myGardenPlants } from '@/lib/myGarden';
import { getPlantImageUrl } from '@/lib/plantImages';
import { parseDiseases } from '@/lib/diseaseMatch';

const MONTHS = ['Січ','Лют','Бер','Кві','Тра','Чер','Лип','Сер','Вер','Жов','Лис','Гру'];

const MONTH_FULL_NAMES = [
  'січень','лютий','березень','квітень','травень','червень',
  'липень','серпень','вересень','жовтень','листопад','грудень'
];

// Parses "Червень–Вересень" → [5,6,7,8], "Квітень, жовтень" → [3,9], "Квітень або жовтень" → [3,9]
function parseMonthRange(text: string | null | undefined): number[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  const found: number[] = [];
  MONTH_FULL_NAMES.forEach((m, i) => {
    if (lower.includes(m)) found.push(i);
  });
  if (found.length === 0) return [];
  if (found.length === 1) return found;
  // If separator is "–" (range), fill between first and last
  if (lower.includes('–') || lower.includes('-')) {
    const start = found[0];
    const end = found[found.length - 1];
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }
  // Otherwise (comma or "або") — just the found months
  return found;
}

const Pin = ({ color }: { color: string }) => (
  <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
      <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
    </svg>
  </div>
);

interface PlantDetailScreenProps {
  plantId: string;
  onBack: () => void;
  onSelectPlant: (id: string) => void;
  onSelectDisease: (id: string) => void;
}

export function PlantDetailScreen({ plantId, onBack, onSelectPlant, onSelectDisease }: PlantDetailScreenProps) {
  const plant = getPlantById(plantId);
  if (!plant) return <div className="px-6 pt-12"><p>Рослину не знайдено</p></div>;

  const cfg = CATEGORY_CONFIG[plant.category];
  const companions = getCompanions(plant.companions);

  const careItems = [
    { emoji: '💧', label: 'Полив', value: plant.wateringFrequency },
    { emoji: '☀️', label: 'Сонце', value: plant.sun },
    { emoji: '🌱', label: 'Ґрунт', value: plant.soilType },
    { emoji: '✂️', label: 'Обрізка', value: plant.pruningTime },
    { emoji: '❄️', label: 'Зимівля', value: plant.winterCover },
  ].filter((i) => i.value && i.value !== 'None' && i.value !== 'null');

  const diseaseParts = parseDiseases(plant.diseases);

  const bloomMonthIndices = parseMonthRange(plant.bloomMonths);
  const plantingMonthIndices = parseMonthRange(plant.plantingTime);
  const pruningMonthIndices = parseMonthRange(plant.pruningTime);

  const rotations = ['-0.8deg', '0.5deg', '-0.5deg', '0.7deg', '-0.6deg', '0.4deg'];

  const imageUrl = getPlantImageUrl(plantId);
  const alreadyInGarden = myGardenPlants.some(gp => gp.plantId === plantId);
  const [added, setAdded] = React.useState(alreadyInGarden);
  const [removed, setRemoved] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);

  const handleAdd = () => {
    if (added) return;
    setAdded(true);
    setRemoved(false);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div>
      {/* Hero */}
      <div style={{
        height: '260px',
        background: `linear-gradient(135deg, ${cfg.cardColor} 0%, ${cfg.tabColor} 100%)`,
        borderRadius: '0 0 20px 20px', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={plant.name}
            style={{
              height: '260px', width: '260px',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
            }}
          />
        ) : (
          <PlantIcon category={plant.category} color={cfg.accent} size={100} opacity={0.4} />
        )}
        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: '48px', left: '24px', zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.92)', padding: '8px 14px',
            borderRadius: '20px', color: cfg.accent, fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
        >
          ← До каталогу
        </button>
      </div>

      <div className="px-6 pt-6">
        {/* Name */}
        <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '40px', color: cfg.accent, fontWeight: 600, marginBottom: '4px' }}>
          {plant.name}
        </h1>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: cfg.accent, fontStyle: 'italic', opacity: 0.7, marginBottom: '20px' }}>
          {plant.latinName}
        </p>

        {/* Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {[
            plant.hardiness ? { icon: '❄️', label: 'Морозостійкість', value: plant.hardiness } : null,
            plant.height    ? { icon: '📏', label: 'Висота', value: `${plant.height} м` } : null,
            plant.regions   ? { icon: '📍', label: 'Регіони', value: plant.regions } : null,
          ].filter(Boolean).map((chip) => chip && (
            <div key={chip.label} style={{
              backgroundColor: cfg.cardColor, border: `1px solid ${cfg.accent}20`,
              padding: '8px 12px', borderRadius: '12px',
              fontFamily: 'DM Sans, sans-serif', color: cfg.accent,
              display: 'flex', flexDirection: 'column', gap: '2px',
            }}>
              <span style={{ fontSize: '10px', opacity: 0.5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {chip.icon} {chip.label}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{chip.value}</span>
            </div>
          ))}
        </div>

        {/* Add / Remove button */}
        {added ? (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '32px' }}>
            <div style={{
              flex: 1, backgroundColor: `${cfg.accent}22`, color: cfg.accent,
              padding: '14px', borderRadius: '4px', border: `1px solid ${cfg.accent}40`,
              fontFamily: 'Caveat, cursive', fontSize: '22px', fontWeight: 600,
              textAlign: 'center',
            }}>
              ✓ {alreadyInGarden && !removed ? 'Вже є в саду' : 'Додано до саду'}
            </div>
            <button
              onClick={() => { setAdded(false); setRemoved(true); }}
              style={{
                backgroundColor: '#FEE2E2', color: '#DC2626',
                padding: '14px 16px', borderRadius: '4px',
                border: '1px solid #FECACA', cursor: 'pointer',
                fontFamily: 'Caveat, cursive', fontSize: '20px', fontWeight: 600,
                whiteSpace: 'nowrap', transition: 'background-color 0.2s',
              }}>
              🗑 Прибрати
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            style={{
              width: '100%', backgroundColor: cfg.accent, color: '#FFFFFF',
              padding: '14px', borderRadius: '4px', border: 'none', cursor: 'pointer',
              fontFamily: 'Caveat, cursive', fontSize: '22px', fontWeight: 600, marginBottom: '32px',
              transition: 'background-color 0.3s',
            }}>
            + Додати до мого саду
          </button>
        )}

        {/* Success popup */}
        <div style={{
          position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: cfg.accent, color: '#FFFFFF',
          padding: '12px 20px', borderRadius: '24px',
          fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          zIndex: 200, whiteSpace: 'nowrap',
          opacity: showPopup ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}>
          🌱 {plant.name} додано до саду!
        </div>

        {/* Care */}
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: cfg.accent, fontWeight: 600, marginBottom: '16px' }}>
          Догляд
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {careItems.map((item, i) => (
            <div key={i} style={{
              position: 'relative', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: '12px',
              backgroundColor: cfg.cardColor,
              transform: `rotate(${rotations[i % rotations.length]})`,
              boxShadow: `2px 4px 10px rgba(0,0,0,0.08)`, borderRadius: '4px',
            }}>
              <Pin color={cfg.pinColor} />
              <div style={{ fontSize: '20px' }}>{item.emoji}</div>
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: cfg.accent, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: cfg.accent, opacity: 0.75 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Diseases — clickable chips */}
        {diseaseParts.length > 0 && (
          <div style={{
            position: 'relative', padding: '14px 16px',
            backgroundColor: cfg.cardColor,
            transform: 'rotate(0.4deg)',
            boxShadow: '2px 4px 10px rgba(0,0,0,0.08)', borderRadius: '4px',
            marginBottom: '32px',
          }}>
            <Pin color={cfg.pinColor} />
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '20px' }}>🪲</div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: cfg.accent, fontWeight: 600 }}>Хвороби та шкідники</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {diseaseParts.map((part, i) =>
                part.diseaseId ? (
                  <button
                    key={i}
                    onClick={() => onSelectDisease(part.diseaseId!)}
                    style={{
                      backgroundColor: '#FEE2E2', color: '#DC2626',
                      border: '1px solid #FECACA',
                      padding: '5px 12px', borderRadius: '20px',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                    }}
                  >
                    {part.text} →
                  </button>
                ) : (
                  <span
                    key={i}
                    style={{
                      backgroundColor: `${cfg.accent}15`, color: cfg.accent,
                      border: `1px solid ${cfg.accent}25`,
                      padding: '5px 12px', borderRadius: '20px',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '12px',
                    }}
                  >
                    {part.text}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* Seasonal calendar */}
        <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: cfg.accent, fontWeight: 600, marginBottom: '12px' }}>
          Сезонний календар
        </h2>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            {MONTHS.map((m) => (
              <div key={m} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '9px', color: cfg.accent, opacity: 0.5, width: '8.33%', textAlign: 'center' }}>{m}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '2px', height: '36px' }}>
            {MONTHS.map((_, i) => {
              const hasBoom = bloomMonthIndices.includes(i);
              const hasPlant = plantingMonthIndices.includes(i);
              const hasPrune = pruningMonthIndices.includes(i);
              const hasAny = hasBoom || hasPlant || hasPrune;
              return (
                <div key={i} style={{
                  flex: 1, borderRadius: '2px', overflow: 'hidden',
                  border: hasAny ? 'none' : `1px dashed ${cfg.accent}30`,
                  display: 'flex', flexDirection: 'column',
                }}>
                  {hasBoom && <div style={{ flex: 1, backgroundColor: cfg.tabColor }} />}
                  {hasPlant && <div style={{ flex: 1, backgroundColor: '#86EFAC' }} />}
                  {hasPrune && <div style={{ flex: 1, backgroundColor: '#FCA5A5' }} />}
                  {!hasAny && <div style={{ flex: 1 }} />}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
            {[
              { color: cfg.tabColor, label: 'Цвітіння' },
              { color: '#86EFAC', label: 'Висадка' },
              { color: '#FCA5A5', label: 'Обрізка' },
            ].map((leg) => (
              <div key={leg.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', backgroundColor: leg.color, borderRadius: '2px' }} />
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: cfg.accent, opacity: 0.7 }}>{leg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Companions */}
        {companions.length > 0 && (
          <>
            <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: cfg.accent, fontWeight: 600, marginBottom: '16px' }}>
              Добре поєднується з
            </h2>
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
              {companions.map((c, i) => (
                <div
                  key={c.id}
                  onClick={() => onSelectPlant(c.id)}
                  style={{
                    position: 'relative', flexShrink: 0, padding: '16px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    backgroundColor: cfg.cardColor, minWidth: '110px',
                    transform: `rotate(${i % 2 === 0 ? '-0.8deg' : '0.5deg'})`,
                    boxShadow: '2px 4px 10px rgba(0,0,0,0.08)', borderRadius: '4px', cursor: 'pointer',
                  }}
                >
                  <Pin color={cfg.pinColor} />
                  {(() => {
                    const img = getPlantImageUrl(c.id);
                    return img ? (
                      <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', backgroundColor: cfg.cardColor }}>
                        <img src={img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }} />
                      </div>
                    ) : (
                      <PlantIcon category={c.category} color={cfg.accent} size={40} opacity={0.6} />
                    );
                  })()}
                  <div style={{ fontFamily: 'Caveat, cursive', fontSize: '16px', color: cfg.accent, fontWeight: 600, textAlign: 'center' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '14px', color: cfg.accent }}>→</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Fun fact */}
        {plant.funFact && plant.funFact !== 'null' && (
          <div style={{
            margin: '16px 0 32px', padding: '16px', borderRadius: '4px',
            backgroundColor: cfg.cardColor, transform: 'rotate(-0.4deg)',
            boxShadow: '2px 4px 10px rgba(0,0,0,0.07)', position: 'relative',
          }}>
            <Pin color={cfg.pinColor} />
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: cfg.accent, opacity: 0.85, fontStyle: 'italic' }}>
              🌿 {plant.funFact}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
