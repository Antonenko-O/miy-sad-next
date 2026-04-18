'use client';

// SEO standalone page wrapper for /plants/[id]
// Shows plant detail with a link back to the app
import type { Plant } from '@/types';
import { getPlantImageUrl } from '@/lib/plantImages';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface Props {
  plant: Plant;
}

export function PlantDetailPage({ plant }: Props) {
  const locale = useLocale();
  const imageUrl = getPlantImageUrl(plant.id);

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 20px', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Back to app */}
      <Link
        href={`/${locale}`}
        style={{ color: '#2D6A4F', textDecoration: 'none', fontSize: 14, display: 'inline-block', marginBottom: 20 }}
      >
        ← My Garden
      </Link>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={plant.name}
          style={{ width: '100%', maxHeight: 320, objectFit: 'contain', mixBlendMode: 'multiply', marginBottom: 24 }}
        />
      )}

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{plant.name}</h1>
      <p style={{ color: '#666', fontStyle: 'italic', marginBottom: 24 }}>{plant.latinName}</p>

      {plant.bloomMonths && <p><strong>Цвітіння:</strong> {plant.bloomMonths}</p>}
      {plant.height && <p><strong>Висота:</strong> {plant.height}</p>}
      {plant.sun && <p><strong>Освітлення:</strong> {plant.sun}</p>}
      {plant.water && <p><strong>Полив:</strong> {plant.water}</p>}
      {plant.hardiness && <p><strong>Морозостійкість:</strong> {plant.hardiness}</p>}

      {plant.funFact && (
        <div style={{ background: '#F0FFF4', borderRadius: 12, padding: 16, marginTop: 24 }}>
          <strong>🌿 Цікавий факт</strong>
          <p style={{ marginTop: 8 }}>{plant.funFact}</p>
        </div>
      )}

      {plant.diseases && (
        <div style={{ marginTop: 24 }}>
          <strong>🐛 Хвороби та шкідники</strong>
          <p style={{ color: '#666', marginTop: 8 }}>{plant.diseases}</p>
        </div>
      )}

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #eee' }}>
        <Link
          href={`/${locale}`}
          style={{
            display: 'inline-block',
            background: '#2D6A4F',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: 24,
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Відкрити повну картку в додатку →
        </Link>
      </div>
    </div>
  );
}
