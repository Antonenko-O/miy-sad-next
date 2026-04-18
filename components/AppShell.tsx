'use client';

import React, { useState } from 'react';
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

export function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [initialDiseaseId, setInitialDiseaseId] = useState<string | null>(null);

  const context: Tab | 'detail' = selectedPlantId ? 'detail' : activeTab;

  const handleSelectPlant = (id: string) => {
    setSelectedPlantId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedPlantId(null);
  };

  const handleTabChange = (tab: Tab) => {
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
          <HomeScreen onAddPlant={() => setActiveTab('catalog')} onSelectPlant={handleSelectPlant} />
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
