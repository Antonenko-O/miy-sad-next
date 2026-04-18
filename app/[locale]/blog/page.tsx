import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Blog' };
}

// In Phase 3 this page will list blog articles loaded from /content/blog/*.md
// For now it's a placeholder
export default async function BlogPage() {
  const t = await getTranslations('meta');

  return (
    <main style={{ padding: '40px 20px', maxWidth: 680, margin: '0 auto', fontFamily: 'DM Sans, sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Blog</h1>
      <p style={{ color: '#666' }}>Coming soon — garden tips, plant guides and seasonal advice.</p>
    </main>
  );
}
