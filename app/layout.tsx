import type {Metadata} from 'next';
import {Fraunces, Plus_Jakarta_Sans, JetBrains_Mono} from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Din Kültürü 5 · Etkileşimli Öğrenme Atölyesi',
  description:
    'MEB 5. sınıf Din Kültürü ve Ahlak Bilgisi müfredatına uygun konu özetleri, 3 boyutlu kavram kartları, yapay zeka destekli bilgi yarışması ve akıllı rehber.',
  openGraph: {
    title: 'Din Kültürü 5 · Etkileşimli Öğrenme Atölyesi',
    description:
      'MEB 5. sınıf Din Kültürü ve Ahlak Bilgisi müfredatına uygun konu özetleri, 3 boyutlu kavram kartları, yapay zeka destekli bilgi yarışması ve akıllı rehber.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Din Kültürü 5 · Etkileşimli Öğrenme Atölyesi',
    description:
      'MEB 5. sınıf Din Kültürü ve Ahlak Bilgisi müfredatına uygun konu özetleri, 3 boyutlu kavram kartları, yapay zeka destekli bilgi yarışması ve akıllı rehber.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body
        className="font-sans bg-[#F8FAFC] text-slate-900 antialiased selection:bg-teal-900/15 selection:text-teal-950"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
