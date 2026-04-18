// Root layout — minimal, just sets html/body
import type { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
