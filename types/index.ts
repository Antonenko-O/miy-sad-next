export type CategoryId = 'kvity' | 'kushchi' | 'plodovi' | 'dekoratyvni';

export interface Plant {
  id: string;
  category: CategoryId;
  name: string;
  latinName: string;
  regions: string | null;
  hardiness: string | null;
  height: string | null;
  sun: string | null;
  water: string | null;
  bloomMonths: string | null;
  flowerColor: string | null;
  fragrance: string | null;
  bloomFeatures: string | null;
  plantingTime: string | null;
  plantingDistance: string | null;
  soilType: string | null;
  plantingDepth: string | null;
  pruningTime: string | null;
  pruningType: string | null;
  pruningMethod: string | null;
  pruningTools: string | null;
  wateringFrequency: string | null;
  wateringVolume: string | null;
  wateringMethod: string | null;
  wateringNotes: string | null;
  fertSpring: string | null;
  fertSummer: string | null;
  fertAutumn: string | null;
  diseases: string | null;
  pests: string | null;
  treatmentTime: string | null;
  treatmentMethod: string | null;
  winterCover: string | null;
  coverTime: string | null;
  uncoverTime: string | null;
  mulching: string | null;
  funFact: string | null;
  companions: string | null;
  photoSource: string | null;
  notes: string | null;
}

export interface CatalogPlant {
  id: string;
  category: CategoryId;
  name: string;
  latinName: string;
  height: string | null;
  sun: string | null;
  water: string | null;
  bloomMonths: string | null;
  hardiness: string | null;
  flowerColor: string | null;
  companions: string | null;
}

export interface Category {
  id: CategoryId;
  label: string;
}

export interface CatalogData {
  categories: Category[];
  plants: CatalogPlant[];
}

export interface CategoryConfig {
  label: string;
  gridColor: string;
  bgColor: string;
  cardColor: string;
  accent: string;
  pinColor: string;
  tabColor: string;
}

export const CATEGORY_CONFIG: Record<CategoryId | 'all', CategoryConfig> = {
  all: {
    label: 'Усі',
    gridColor: '#BBFFD8',
    bgColor: '#FAFFFE',
    cardColor: '#E8FFF2',
    accent: '#1E3A5F',
    pinColor: '#1E3A5F',
    tabColor: '#DCFCE7',
  },
  kvity: {
    label: 'Квіти',
    gridColor: '#FFDCF6',
    bgColor: '#FEFAF8',
    cardColor: '#FFF0FB',
    accent: '#34552B',
    pinColor: '#34552B',
    tabColor: '#FFDCF6',
  },
  kushchi: {
    label: 'Кущі',
    gridColor: '#BBFFD8',
    bgColor: '#FAFFFE',
    cardColor: '#E8FFF2',
    accent: '#1E3A5F',
    pinColor: '#1E3A5F',
    tabColor: '#DCFCE7',
  },
  plodovi: {
    label: 'Плодові',
    gridColor: '#FFD4A8',
    bgColor: '#FEFAF8',
    cardColor: '#FFF3E8',
    accent: '#7C2D12',
    pinColor: '#7C2D12',
    tabColor: '#FFE4CC',
  },
  dekoratyvni: {
    label: 'Декоративні',
    gridColor: '#E9D8FD',
    bgColor: '#FEFAF8',
    cardColor: '#F5F0FF',
    accent: '#5B21B6',
    pinColor: '#5B21B6',
    tabColor: '#EDE9FE',
  },
};
