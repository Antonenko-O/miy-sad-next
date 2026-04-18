import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllDiseases, getDiseaseById } from '@/lib/data';
import { DiseaseDetailPage } from '@/components/screens/DiseaseDetailPage';

type Props = { params: Promise<{ locale: string; id: string }> };

export async function generateStaticParams() {
  const diseases = getAllDiseases();
  const locales = ['uk', 'en'];
  return locales.flatMap((locale) =>
    diseases.map((d) => ({ locale, id: d.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const disease = getDiseaseById(id);
  if (!disease) return {};

  return {
    title: disease.name,
    description: disease.symptoms.slice(0, 155),
    openGraph: {
      title: `${disease.emoji} ${disease.name}`,
    },
  };
}

export default async function DiseasePage({ params }: Props) {
  const { id } = await params;
  const disease = getDiseaseById(id);
  if (!disease) notFound();

  return <DiseaseDetailPage disease={disease} />;
}
