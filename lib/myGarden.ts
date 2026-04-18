import type { CategoryId } from '@/types';
import { getPlantById } from './plants';

export interface GardenPlant {
  id: string;
  plantId: string; // links to catalog
  quantity: string;
  status: 'ok' | 'attention';
  rotation: string;
  category: CategoryId;
  addedAt: string;
}

// Mock "My Garden" – linked to real catalog plant IDs
export const myGardenPlants: GardenPlant[] = [
  { id: '1', plantId: 'troyanda-sadova',       quantity: '3 кущі',   status: 'ok',        rotation: '-1deg',   category: 'kvity',       addedAt: '2025-04-01' },
  { id: '2', plantId: 'lavanda-vuzkolysta',    quantity: '5 рослин', status: 'attention', rotation: '0.8deg',  category: 'kvity',       addedAt: '2025-04-01' },
  { id: '3', plantId: 'hortenziya-volotysta',  quantity: '2 кущі',   status: 'ok',        rotation: '-0.5deg', category: 'kushchi',     addedAt: '2025-04-01' },
  { id: '4', plantId: 'yablunya-domashnya',    quantity: '1 дерево', status: 'ok',        rotation: '1deg',    category: 'plodovi',     addedAt: '2025-04-01' },
  { id: '5', plantId: 'samshyt-vichnozelenyy', quantity: '4 рослини',status: 'attention', rotation: '-0.7deg', category: 'dekoratyvni', addedAt: '2025-04-01' },
  { id: '6', plantId: 'khosta-zibolda',        quantity: '6 рослин', status: 'ok',        rotation: '0.6deg',  category: 'kushchi',     addedAt: '2025-04-01' },
];

const MONTH_FULL = [
  'січень','лютий','березень','квітень','травень','червень',
  'липень','серпень','вересень','жовтень','листопад','грудень',
];

function needsWateringToday(wateringFreq: string | null | undefined): boolean {
  if (!wateringFreq) return false;
  const f = wateringFreq.toLowerCase();
  const day = new Date().getDay(); // 0=sun, 1=mon...
  if (f.includes('7 днів') || f.includes('тиждень')) return day === 1 || day === 5; // Mon & Fri
  if (f.includes('14 днів')) return day === 1; // Only Mon
  if (f.includes('10 днів')) return day === 1 || day === 4; // Mon & Thu
  if (f.includes('3–4 дні') || f.includes('через день')) return true;
  // Range like "Травень–серпень" — check current month
  const month = new Date().getMonth();
  if (f.includes('–') || f.includes('-')) {
    const found = MONTH_FULL.filter((m) => f.includes(m)).map((m) => MONTH_FULL.indexOf(m));
    if (found.length >= 2) return month >= found[0] && month <= found[found.length - 1];
    return false;
  }
  return false;
}

function needsPruningThisMonth(pruningTime: string | null | undefined): boolean {
  if (!pruningTime) return false;
  const month = MONTH_FULL[new Date().getMonth()];
  return pruningTime.toLowerCase().includes(month);
}

function needsFertilizingThisMonth(fertSpring: string | null | undefined, fertSummer: string | null | undefined): boolean {
  const month = new Date().getMonth(); // 0-indexed
  const isSpring = month >= 2 && month <= 4; // Mar-May
  const isSummer = month >= 5 && month <= 7; // Jun-Aug
  if (isSpring && fertSpring) return true;
  if (isSummer && fertSummer) return true;
  return false;
}

export interface CareTask {
  plantName: string;
  instruction: string;
  volume?: string;
  tip?: string;
}

export interface TodayTasks {
  water: CareTask[];
  prune: CareTask[];
  fertilize: CareTask[];
}

export function getTodayTasks(): TodayTasks {
  const result: TodayTasks = { water: [], prune: [], fertilize: [] };

  for (const gp of myGardenPlants) {
    const plant = getPlantById(gp.plantId);
    if (!plant) continue;

    if (needsWateringToday(plant.wateringFrequency)) {
      result.water.push({
        plantName: plant.name,
        instruction: plant.wateringMethod ?? 'Полив під корінь',
        volume: plant.wateringVolume ? `${plant.wateringVolume} л` : undefined,
        tip: plant.wateringNotes ?? undefined,
      });
    }

    if (needsPruningThisMonth(plant.pruningTime)) {
      result.prune.push({
        plantName: plant.name,
        instruction: `${plant.pruningType ?? 'Обрізка'}: ${plant.pruningMethod ?? ''}`.trim(),
        tip: plant.pruningTools ?? undefined,
      });
    }

    if (needsFertilizingThisMonth(plant.fertSpring, plant.fertSummer)) {
      const month = new Date().getMonth();
      const isSpring = month >= 2 && month <= 4;
      result.fertilize.push({
        plantName: plant.name,
        instruction: isSpring ? (plant.fertSpring ?? 'Весняне підживлення') : (plant.fertSummer ?? 'Літнє підживлення'),
        tip: 'Вносити після поливу, не на суху землю',
      });
    }
  }

  return result;
}
