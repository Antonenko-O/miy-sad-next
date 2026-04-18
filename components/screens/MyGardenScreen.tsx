'use client';

import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { PlantIcon } from '@/components/PlantIcon';
import { CareDrawer } from '@/components/CareDrawer';
import { myGardenPlants, getTodayTasks } from '@/lib/myGarden';
import { getPlantById } from '@/lib/data';
import type { CareTask } from '@/lib/myGarden';
import { getPlantImageUrl } from '@/lib/plantImages';

const Pin = ({ color }: { color: string }) => (
  <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
      <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
    </svg>
  </div>
);

const accent = '#7C2D12';
const cardBg = '#FFF3E8';
const pinColor = '#7C2D12';

export function MyGardenScreen({ onSelectPlant }: { onSelectPlant?: (id: string) => void }) {
  const tasks = useMemo(() => getTodayTasks(), []);
  const [drawerType, setDrawerType] = useState<'water' | 'prune' | 'fertilize' | null>(null);
  const [drawerItems, setDrawerItems] = useState<CareTask[]>([]);

  const openPlantDrawer = (plantId: string) => {
    const plant = getPlantById(plantId);
    if (!plant) return;

    const waterTask = tasks.water.find(t => t.plantName === plant.name);
    const pruneTask = tasks.prune.find(t => t.plantName === plant.name);
    const fertTask  = tasks.fertilize.find(t => t.plantName === plant.name);

    if (waterTask) {
      setDrawerType('water');
      setDrawerItems([waterTask]);
    } else if (pruneTask) {
      setDrawerType('prune');
      setDrawerItems([pruneTask]);
    } else if (fertTask) {
      setDrawerType('fertilize');
      setDrawerItems([fertTask]);
    } else {
      setDrawerType('water');
      setDrawerItems([{
        plantName: plant.name,
        instruction: plant.wateringMethod ?? 'Полив за потребою',
        volume: plant.wateringVolume ? `${plant.wateringVolume} л` : undefined,
        tip: plant.wateringNotes ?? undefined,
      }]);
    }
  };

  const season = ['Зима','Зима','Весна','Весна','Весна','Літо','Літо','Літо','Осінь','Осінь','Осінь','Зима'][new Date().getMonth()];

  return (
    <div className="px-6 pt-12 pb-4">
      <h1 style={{ fontFamily: 'Caveat, cursive', fontSize: '40px', color: accent, fontWeight: 600 }}>
        Мій сад
      </h1>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#34552B', opacity: 0.6, marginTop: '4px', marginBottom: '24px' }}>
        {myGardenPlants.length} рослин · {season}
      </p>

      {/* Summary strip — clickable */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
        {[
          { value: String(tasks.water.length),     label: 'Полив сьогодні',    rotation: '-0.8deg', type: 'water'     as const, items: tasks.water },
          { value: String(tasks.prune.length),     label: 'Обрізка зараз',     rotation: '0.5deg',  type: 'prune'     as const, items: tasks.prune },
          { value: String(tasks.fertilize.length), label: 'Підживлення зараз', rotation: '-0.3deg', type: 'fertilize' as const, items: tasks.fertilize },
        ].map((s) => (
          <div key={s.label} onClick={() => { setDrawerType(s.type); setDrawerItems(s.items); }} style={{
            padding: '12px 8px', textAlign: 'center',
            backgroundColor: '#FFFFFF', border: '1px solid #FFD4A8',
            transform: `rotate(${s.rotation})`,
            boxShadow: '2px 4px 12px rgba(124,45,18,0.08)', borderRadius: '4px',
            cursor: 'pointer',
          }}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: '22px', color: accent, fontWeight: 600, marginBottom: '2px' }}>
              {s.value}
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#34552B', opacity: 0.7 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Plant list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {myGardenPlants.map((gp) => {
          const plant = getPlantById(gp.plantId);
          const name = plant?.name ?? gp.plantId;
          const hasWater = tasks.water.some(t => t.plantName === name);
          const hasPrune = tasks.prune.some(t => t.plantName === name);
          const hasFert  = tasks.fertilize.some(t => t.plantName === name);
          const needsCare = hasWater || hasPrune || hasFert;

          return (
            <div key={gp.id} onClick={() => openPlantDrawer(gp.plantId)} style={{
              position: 'relative', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: '16px',
              backgroundColor: cardBg, transform: `rotate(${gp.rotation})`,
              boxShadow: '2px 4px 10px rgba(124,45,18,0.10)', borderRadius: '4px',
              cursor: 'pointer',
            }}>
              <Pin color={pinColor} />
              {(() => {
                const img = getPlantImageUrl(gp.plantId);
                return img ? (
                  <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, backgroundColor: cardBg }}>
                    <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }} />
                  </div>
                ) : (
                  <PlantIcon category={gp.category} color={accent} size={44} opacity={0.45} />
                );
              })()}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'Caveat, cursive', fontSize: '24px', color: accent, fontWeight: 600, marginBottom: '2px' }}>
                  {name}
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#34552B', opacity: 0.6 }}>
                  {gp.quantity}
                  {hasWater && ' · 💧'}
                  {hasPrune && ' · ✂️'}
                  {hasFert  && ' · 🌱'}
                </p>
              </div>
              <div style={{
                width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0,
                backgroundColor: needsCare ? '#F97316' : '#22C55E',
              }} />
            </div>
          );
        })}

        {/* Add card */}
        <div style={{
          padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px',
          border: '2px dashed #FFD4A8', transform: 'rotate(-0.5deg)', borderRadius: '4px',
          minHeight: '100px', cursor: 'pointer', backgroundColor: 'transparent',
        }}>
          <Plus size={28} color={accent} strokeWidth={1.5} />
          <span style={{ fontFamily: 'Caveat, cursive', fontSize: '22px', color: accent, fontWeight: 500 }}>
            Додати рослину
          </span>
        </div>
      </div>

      <CareDrawer
        open={drawerType !== null}
        onClose={() => setDrawerType(null)}
        type={drawerType}
        items={drawerItems}
      />
    </div>
  );
}
