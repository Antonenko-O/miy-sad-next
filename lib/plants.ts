import catalogData from '@/data/catalog.json';
import kvityData from '@/data/kvity.json';
import kushchiData from '@/data/kushchi.json';
import plovodiData from '@/data/plodovi.json';
import dekoratyvniData from '@/data/dekoratyvni.json';
import type { CatalogPlant, Plant, CategoryId } from '@/types';

export const catalog = catalogData as { categories: { id: string; label: string }[]; plants: CatalogPlant[] };

const allPlants: Plant[] = [
  ...(kvityData as Plant[]),
  ...(kushchiData as Plant[]),
  ...(plovodiData as Plant[]),
  ...(dekoratyvniData as Plant[]),
];

export function getPlantById(id: string): Plant | undefined {
  return allPlants.find((p) => p.id === id);
}

export function getPlantsByCategory(category: CategoryId): Plant[] {
  return allPlants.filter((p) => p.category === category);
}

export function searchPlants(query: string): CatalogPlant[] {
  const q = query.toLowerCase();
  return catalog.plants.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.latinName && p.latinName.toLowerCase().includes(q))
  );
}

export function getCompanions(companions: string | null): CatalogPlant[] {
  if (!companions) return [];
  const names = companions.split(',').map((s) => s.trim().toLowerCase());
  return catalog.plants.filter((p) =>
    names.some((n) => p.name.toLowerCase().includes(n))
  ).slice(0, 4);
}
