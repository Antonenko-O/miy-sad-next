'use client';

import React from 'react';
import { Sprout, Droplets, Sun } from 'lucide-react';

type Tab = 'home' | 'catalog' | 'garden' | 'calendar';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; color: string; textColor: string }[] = [
  { id: 'home',     label: 'Головна',  color: '#FFDCF6', textColor: '#34552B' },
  { id: 'catalog',  label: 'Каталог',  color: '#DCFCE7', textColor: '#1E3A5F' },
  { id: 'garden',   label: 'Мій сад',  color: '#FFE4CC', textColor: '#7C2D12' },
  { id: 'calendar', label: 'Календар', color: '#EDE9FE', textColor: '#5B21B6' },
];

function TabIcon({ id, color }: { id: Tab; color: string }) {
  const style = { color };
  switch (id) {
    case 'home':
      return <Sprout size={22} strokeWidth={1.5} style={style} />;
    case 'catalog':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'garden':
      return <Droplets size={22} strokeWidth={1.5} style={style} />;
    case 'calendar':
      return <Sun size={22} strokeWidth={1.5} style={style} />;
  }
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              backgroundColor: tab.color,
              opacity: isActive ? 1 : 0.4,
              height: isActive ? '72px' : '60px',
              paddingTop: isActive ? '14px' : '10px',
              paddingBottom: '8px',
              paddingLeft: '16px',
              paddingRight: '16px',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.25s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              minWidth: '72px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <TabIcon id={tab.id} color={tab.textColor} />
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                color: tab.textColor,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
