'use client';

import React, { useEffect } from 'react';
import type { CareTask } from '@/lib/myGarden';

interface CareDrawerProps {
  open: boolean;
  onClose: () => void;
  type: 'water' | 'prune' | 'fertilize' | null;
  items: CareTask[];
}

const TYPE_META = {
  water:     { title: 'Полив сьогодні',      emoji: '💧', color: '#DBEAFE' },
  prune:     { title: 'Обрізка цього місяця', emoji: '✂️', color: '#DCFCE7' },
  fertilize: { title: 'Підживлення зараз',    emoji: '🌱', color: '#FEF9C3' },
};

export function CareDrawer({ open, onClose, type, items }: CareDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!type) return null;
  const meta = TYPE_META[type];

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 100, opacity: open ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: open ? 'auto' : 'none',
      }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        backgroundColor: '#FEFAF8',
        borderRadius: '20px 20px 0 0',
        zIndex: 101,
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        maxHeight: '80vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        paddingBottom: '80px',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px', paddingBottom: '8px' }}>
          <div style={{ width: '40px', height: '4px', backgroundColor: '#34552B', opacity: 0.2, borderRadius: '2px' }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 24px 16px', borderBottom: '1px solid #34552B15',
        }}>
          <h2 style={{ fontFamily: 'Caveat, cursive', fontSize: '28px', color: '#34552B', fontWeight: 600 }}>
            {meta.emoji} {meta.title}
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '20px', color: '#34552B', opacity: 0.5, padding: '4px',
          }}>✕</button>
        </div>

        {/* Plant list */}
        <div style={{ overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <p style={{ fontFamily: 'Caveat, cursive', fontSize: '22px', color: '#34552B', opacity: 0.5 }}>
                Сьогодні все добре 🌿
              </p>
            </div>
          ) : items.map((item, i) => (
            <div key={i} style={{
              backgroundColor: meta.color, borderRadius: '4px',
              padding: '14px 16px',
              transform: `rotate(${i % 2 === 0 ? '-0.5deg' : '0.4deg'})`,
              boxShadow: '2px 4px 10px rgba(0,0,0,0.06)',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="#34552B">
                  <path d="M8 2L9.5 5L12 6L10 8.5L10.5 11L8 9.5L5.5 11L6 8.5L4 6L6.5 5L8 2Z" />
                </svg>
              </div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: '20px', color: '#34552B', fontWeight: 600, marginBottom: '4px' }}>
                {item.plantName}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#34552B', marginBottom: item.tip ? '6px' : 0 }}>
                {item.instruction}
                {item.volume && <span style={{ fontWeight: 600 }}> · {item.volume}</span>}
              </div>
              {item.tip && (
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#34552B', opacity: 0.6, fontStyle: 'italic' }}>
                  💡 {item.tip}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
