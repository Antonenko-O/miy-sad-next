import type { Plant, CatalogData } from '@/types';
import catalogData from '@/data/catalog.json';
import plantsData from '@/data/plants.json';
import diseasesData from '@/data/diseases.json';
import toolsData from '@/data/tools.json';

// ─── Plants ───────────────────────────────────────────────────────────────────

export function getCatalogData(): CatalogData {
  return catalogData as CatalogData;
}

// Shorthand export used by some screens
export const catalog = catalogData as CatalogData;

export function getAllPlants(): Plant[] {
  return (plantsData as { categories: unknown[]; plants: Plant[] }).plants;
}

export function getPlantById(id: string): Plant | null {
  const plants = getAllPlants();
  return plants.find((p) => p.id === id) ?? null;
}

export function searchPlants(query: string, categoryId?: string): CatalogData['plants'] {
  const data = getCatalogData();
  let plants = data.plants;
  if (categoryId && categoryId !== 'all') {
    plants = plants.filter((p) => p.category === categoryId);
  }
  if (!query.trim()) return plants;
  const q = query.toLowerCase();
  return plants.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.latinName.toLowerCase().includes(q)
  );
}

export function getCompanions(ids: string[]): CatalogData['plants'] {
  const data = getCatalogData();
  return data.plants.filter((p) => ids.includes(p.id));
}

// ─── Diseases ─────────────────────────────────────────────────────────────────

export interface Disease {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  emoji: string;
  affectedPlants: string[];
  affectedPlantsLabels: string[];
  symptoms: string;
  causes: string;
  treatment: string;
  prevention: string;
  season: string[];
  urgency: string;
}

export function getAllDiseases(): Disease[] {
  return (diseasesData as { diseases: Disease[] }).diseases;
}

export function getDiseaseById(id: string): Disease | null {
  return getAllDiseases().find((d) => d.id === id) ?? null;
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export interface Tool {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  emoji: string;
  description: string;
  tips: string[];
  care: string;
  material?: string;
  price?: string;
}

export function getAllTools(): Tool[] {
  return (toolsData as { tools: Tool[] }).tools;
}

export function getToolById(id: string): Tool | null {
  return getAllTools().find((t) => t.id === id) ?? null;
}
