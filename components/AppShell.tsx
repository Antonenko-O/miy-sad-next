'use client';

import React, { useState, useEffect } from 'react';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { CatalogScreen } from '@/components/screens/CatalogScreen';
import { PlantDetailScreen } from '@/components/screens/PlantDetailScreen';
import { MyGardenScreen } from '@/components/screens/MyGardenScreen';
import { CalendarScreen } from '@/components/screens/CalendarScreen';
import { BottomNav } from './BottomNav';

type Tab = 'home' | 'catalog' | 'garden' | 'calendar';

const GRID_COLORS: Record<Tab | 'detail', string> = {
  home:     'linear-gradient(to right, #FFDCF6 1px, transparent 1px), linear-gradient(to bottom, #FFDCF6 1px, transparent 1px)',
  catalog:  'linear-gradient(to right, #BBFFD8 1px, transparent 1px), linear-gradient(to bottom, #BBFFD8 1px, transparent 1px)',
  garden:   'linear-gradient(to right, #FFD4A8 1px, transparent 1px), linear-gradient(to bottom, #FFD4A8 1px, transparent 1px)',
  calendar: 'linear-gradient(to right, #E9D8FD 1px, transparent 1px), linear-gradient(to bottom, #E9D8FD 1px, transparent 1px)',
  detail:   'linear-gradient(to right, #BBFFD8 1px, transparent 1px), linear-gradient(to bottom, #BBFFD8 1px, transparent 1px)',
};

const BG_COLORS: Record<Tab | 'detail', string> = {
  home:     '#FEFAF8',
  catalog:  '#FAFFFE',
  garden:   '#FEFAF8',
  calendar: '#FEFAF8',
  detail:   '#FAFFFE',
};

// Language switcher — reads locale from URL, toggles on click
function LanguageSwitcher() {
  const [locale, setLocale] = useState<'uk' | 'en'>('uk');

  useEffect(() => {
    setLocale(window.location.pathname.startsWith('/en') ? 'en' : 'uk');
  }, []);

  const toggle = () => {
    const path = window.location.pathname;
    const newPath = locale === 'uk'
      ? path.replace(/^\/uk/, '/en')
      : path.replace(/^\/en/, '/uk');
    window.location.href = newPath;
  };

  return (
    <button
      onClick={toggle}
      title={locale === 'uk' ? 'Switch to English' : 'Перейти на українську'}
      style={{
        position: 'fixed', top: '16px', right: '16px',
        zIndex: 200,
        background: 'rgba(255,255,255,0.88)',
        border: '1px solid rgba(52,85,43,0.18)',
        borderRadius: '20px',
        padding: '5px 12px',
        cursor: 'pointer',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '12px',
        fontWeight: 700,
        color: '#34552B',
        letterSpacing: '0.04em',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {locale === 'uk' ? 'EN' : 'UK'}
    </button>
  );
}

export function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [initialDiseaseId, setInitialDiseaseId] = useState<string | null>(null);
  // Stack of previous tabs for back navigation
  const [navStack, setNavStack] = useState<Tab[]>([]);

  const context: Tab | 'detail' = selectedPlantId ? 'detail' : activeTab;

  const handleSelectPlant = (id: string) => {
    setSelectedPlantId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedPlantId(null);
  };

  // Go back in tab history (used by the floating back button)
  const handleTabBack = () => {
    if (navStack.length === 0) return;
    const prev = navStack[navStack.length - 1];
    setNavStack((s) => s.slice(0, -1));
    setActiveTab(prev);
    setSelectedPlantId(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleTabChange = (tab: Tab) => {
    if (tab !== activeTab) {
      // Push current tab onto history before switching
      setNavStack((s) => [...s, activeTab]);
    }
    setSelectedPlantId(null);
    setActiveTab(tab);
    if (tab !== 'catalog') setInitialDiseaseId(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleSelectDisease = (diseaseId: string) => {
    setSelectedPlantId(null);
    setActiveTab('catalog');
    setInitialDiseaseId(diseaseId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show back button when there's tab history (PlantDetailScreen handles its own back)
  const showTabBack = navStack.length > 0 && selectedPlantId === null;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: BG_COLORS[context],
        fontFamily: 'DM Sans, sans-serif',
        position: 'relative',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: GRID_COLORS[context],
          backgroundSize: '48px 48px',
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      {/* Floating back button — shown when tab history exists */}
      {showTabBack && (
        <button
          onClick={handleTabBack}
          title="Назад"
          style={{
            position: 'fixed', top: '16px', left: '16px',
            zIndex: 200,
            width: '36px', height: '36px',
            background: 'rgba(255,255,255,0.88)',
            border: '1px solid rgba(52,85,43,0.18)',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            backdropFilter: 'blur(8px)',
            fontSize: '18px',
            color: '#34552B',
          }}
        >
          ←
        </button>
      )}

      {/* Language switcher — always visible */}
      <LanguageSwitcher />

      {/* Main scrollable content */}
      <div style={{ position: 'relative', zIndex: 1, paddingBottom: '80px' }}>
        {selectedPlantId ? (
          <PlantDetailScreen
            plantId={selectedPlantId}
            onBack={handleBack}
            onSelectPlant={handleSelectPlant}
            onSelectDisease={handleSelectDisease}
          />
        ) : activeTab === 'home' ? (
          <HomeScreen onAddPlant={() => handleTabChange('catalog')} onSelectPlant={handleSelectPlant} />
        ) : activeTab === 'catalog' ? (
          <CatalogScreen
            onSelectPlant={handleSelectPlant}
            initialDiseaseId={initialDiseaseId}
            onDiseaseOpened={() => setInitialDiseaseId(null)}
          />
        ) : activeTab === 'garden' ? (
          <MyGardenScreen onSelectPlant={handleSelectPlant} />
        ) : activeTab === 'calendar' ? (
          <CalendarScreen />
        ) : null}
      </div>

      {/* Fixed bottom nav */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
