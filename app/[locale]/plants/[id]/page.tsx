import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPlants, getPlantById } from '@/lib/data';
import { PlantDetailPage } from '@/components/screens/PlantDetailPage';

type Props = { params: Promise<{ locale: string; id: string }> };

// ── Static generation ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const plants = getAllPlants();
  const locales = ['uk', 'en'];
  return locales.flatMap((locale) =>
    plants.map((plant) => ({ locale, id: plant.id }))
  );
}

// ── SEO Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const plant = getPlantById(id);
  if (!plant) return {};

  return {
    title: plant.name,
    description: [
      plant.latinName,
      plant.bloomMonths && `Цвітіння: ${plant.bloomMonths}`,
      plant.height && `Висота: ${plant.height}`,
    ]
      .filter(Boolean)
      .join(' · '),
    openGraph: {
      title: `${plant.name} (${plant.latinName})`,
      images: [`/images/plants/${plant.id}.webp`],
    },
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function PlantPage({ params }: Props) {
  const { id } = await params;
  const plant = getPlantById(id);
  if (!plant) notFound();

  return <PlantDetailPage plant={plant} />;
}
