'use client';

// SEO standalone page wrapper for /diseases/[id]
import type { Disease } from '@/lib/data';
import { useLocale } from 'next-intl';
import Link from 'next/link';

const URGENCY_COLORS: Record<string, string> = {
  low: '#16A34A',
  medium: '#D97706',
  high: '#DC2626',
  critical: '#7C2D12',
};

const URGENCY_LABELS: Record<string, string> = {
  low: 'Низька',
  medium: 'Середня',
  high: 'Висока',
  critical: 'Критична',
};

interface Props {
  disease: Disease;
}

export function DiseaseDetailPage({ disease }: Props) {
  const locale = useLocale();

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 20px', fontFamily: 'DM Sans, sans-serif' }}>
      <Link
        href={`/${locale}`}
        style={{ color: '#2D6A4F', textDecoration: 'none', fontSize: 14, display: 'inline-block', marginBottom: 20 }}
      >
        ← My Garden
      </Link>

      <div style={{ fontSize: 48, marginBottom: 12 }}>{disease.emoji}</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{disease.name}</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        <span style={{ background: '#F0FFF4', color: '#2D6A4F', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>
          {disease.typeLabel}
        </span>
        <span style={{ background: '#FFF', border: `1px solid ${URGENCY_COLORS[disease.urgency]}`, color: URGENCY_COLORS[disease.urgency], padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>
          Небезпека: {URGENCY_LABELS[disease.urgency]}
        </span>
      </div>

      {[
        { label: '🔍 Симптоми', value: disease.symptoms },
        { label: '⚠️ Причини', value: disease.causes },
        { label: '💊 Лікування', value: disease.treatment },
        { label: '🛡️ Профілактика', value: disease.prevention },
      ].map(({ label, value }) => (
        <div key={label} style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{label}</h2>
          <p style={{ color: '#444', lineHeight: 1.6 }}>{value}</p>
        </div>
      ))}

      {disease.affectedPlantsLabels.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>🌱 Уражає рослини</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {disease.affectedPlantsLabels.map((label) => (
              <span key={label} style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>
                {label}
              </span>
            ))}
          </div>
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
          Відкрити каталог хвороб →
        </Link>
      </div>
    </div>
  );
}
