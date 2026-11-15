'use client';

import {useState} from 'react';
import Image from 'next/image';
import {BookOpen, Compass, Landmark, Sparkles} from 'lucide-react';
import type {UnitData} from '@/lib/curriculum';
import {UNIT_IMAGES} from '@/lib/unit-images';

interface SummaryModeProps {
  unit: UnitData;
  onStartQuiz: () => void;
  onOpenTutorWithQuestion: (question: string) => void;
}

export default function SummaryMode({
  unit,
  onStartQuiz,
  onOpenTutorWithQuestion,
}: SummaryModeProps) {
  const [readingView, setReadingView] = useState<'parallel' | 'verse'>('parallel');
  const [selectedArchId, setSelectedArchId] = useState<string>(
    unit.mimariOgeler?.[0]?.id ?? ''
  );

  const unitImage = UNIT_IMAGES[unit.id];
  const activeArch =
    unit.mimariOgeler?.find((item) => item.id === selectedArchId) ??
    unit.mimariOgeler?.[0];

  return (
    <div className="space-y-10">
      {/* Hero Split: Left Learning Objectives, Right Bespoke Unit Visual */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 md:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-800">
              <span>{unit.numara}. Ünite</span>
              <span aria-hidden="true">·</span>
              <span>MEB 5. Sınıf Din Kültürü ve Ahlak Bilgisi</span>
              <span aria-hidden="true">·</span>
              <span>{unit.sureDua.ad}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight text-balance">
              {unit.kisaAd}
            </h1>

            <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
              {unit.altBaslik}
            </p>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Bu Ünitede Neler Öğreneceğiz?
              </h2>
              <ul className="space-y-2.5">
                {unit.kazanimlar.map((kazanim, index) => (
                  <li
                    key={kazanim}
                    className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed"
                  >
                    <span className="font-mono text-xs font-medium text-teal-800 pt-0.5 tabular-nums shrink-0">
                      0{index + 1}.
                    </span>
                    <span>{kazanim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStartQuiz}
              className="px-4 py-2.5 text-sm font-medium text-white bg-[#0F4C52] hover:bg-[#0B3B40] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
            >
              Ünite Testini Çöz
            </button>
            <button
              type="button"
              onClick={() =>
                onOpenTutorWithQuestion(
                  unit.rehberSorulari[0] ?? `${unit.kisaAd} ünitesini bana özetler misin?`
                )
              }
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
            >
              Akıllı Rehbere Sor
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-800 via-teal-950 to-slate-900">
          <Image
            src={unitImage.src}
            alt={unitImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
            referrerPolicy="no-referrer"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"
          />
          <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1">
            <p className="text-xs font-medium text-teal-200">
              {unit.numara}. Ünite Görseli · {unit.sureDua.ad}
            </p>
            <p className="font-display text-lg font-semibold leading-snug">
              {unit.kisaAd}
            </p>
          </div>
        </div>
      </section>

      {/* Core Curriculum Topics */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl font-semibold text-slate-900">
            Temel Konu Özeti
          </h2>
          <span className="text-xs text-slate-500">
            3 Ana Başlık · Günlük Hayat Bağlantıları
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {unit.konular.map((konu, index) => (
            <article
              key={konu.baslik}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="font-mono text-teal-800 tabular-nums">
                    0{index + 1}.
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Konu Başlığı</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900 leading-snug">
                  {konu.baslik}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {konu.ozet}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1.5">
                <p className="text-xs font-semibold text-amber-800">
                  Günlük Hayat Örneği
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {konu.ornek}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Unit 5 Interactive Architectural Explorer */}
      {unit.mimariOgeler && activeArch && (
        <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
                <Landmark className="w-4 h-4" aria-hidden="true" />
                <span>Etkileşimli Mimari Keşif Panosu</span>
              </div>
              <h2 className="font-display text-xl font-semibold text-slate-900">
                Cami ve Külliye Bölümlerini Keşfet
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              İncelemek için bir mimari öğe seçin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
              {unit.mimariOgeler.map((oge) => {
                const isSelected = oge.id === activeArch.id;
                return (
                  <button
                    key={oge.id}
                    type="button"
                    onClick={() => setSelectedArchId(oge.id)}
                    className={`text-left px-3.5 py-3 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${
                      isSelected
                        ? 'bg-[#0F4C52] text-white border-[#0F4C52]'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <p className="text-sm font-semibold truncate">{oge.ad}</p>
                    <p
                      className={`text-xs mt-0.5 truncate ${
                        isSelected ? 'text-teal-100' : 'text-slate-500'
                      }`}
                    >
                      {oge.kategori}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-800">
                <Compass className="w-4 h-4" aria-hidden="true" />
                <span>{activeArch.kategori}</span>
                <span aria-hidden="true">·</span>
                <span>Mimari Öğe İncelemesi</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {activeArch.ad}
              </h3>
              <div className="space-y-3 text-sm leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900 mb-1">Nedir?</p>
                  <p className="text-slate-700">{activeArch.tanim}</p>
                </div>
                <div className="pt-3 border-t border-slate-200/80">
                  <p className="font-semibold text-slate-900 mb-1">
                    İşlevi ve Önemi
                  </p>
                  <p className="text-slate-700">{activeArch.islev}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Surah / Prayer Section */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Ünite {unit.sureDua.tur}si</span>
              <span aria-hidden="true">·</span>
              <span>Okunuş ve Türkçe Anlam</span>
            </div>
            <h2 className="font-display text-2xl font-semibold text-slate-900">
              {unit.sureDua.ad}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              {unit.sureDua.ozellik}
            </p>
          </div>

          <div
            className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 self-start"
            role="group"
            aria-label="Görünüm biçimi"
          >
            <button
              type="button"
              onClick={() => setReadingView('parallel')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                readingView === 'parallel'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              İki Sütun
            </button>
            <button
              type="button"
              onClick={() => setReadingView('verse')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                readingView === 'verse'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satır Satır
            </button>
          </div>
        </div>

        {readingView === 'parallel' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-semibold text-slate-500">
                Okunuşu
              </h3>
              <ol className="space-y-3">
                {unit.sureDua.okunusu.map((line) => (
                  <li
                    key={line}
                    className="font-display text-base sm:text-lg text-slate-900 leading-relaxed"
                  >
                    {line}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-semibold text-slate-500">
                Türkçe Anlamı
              </h3>
              <ol className="space-y-3">
                {unit.sureDua.anlami.map((line) => (
                  <li
                    key={line}
                    className="text-sm sm:text-base text-slate-700 leading-relaxed"
                  >
                    {line}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {unit.sureDua.okunusu.map((line, idx) => (
              <div
                key={line}
                className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-3 items-baseline"
              >
                <p className="font-display text-base sm:text-lg text-slate-900 leading-relaxed">
                  {line}
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {unit.sureDua.anlami[idx] ?? ''}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="bg-teal-950/[0.03] border border-teal-900/15 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-teal-900">
              {unit.sureDua.ad} — Ana Mesajı
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {unit.sureDua.mesaj}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onOpenTutorWithQuestion(
                `${unit.sureDua.ad} bize günlük hayatımızda hangi mesajı veriyor? 5. sınıf düzeyinde anlatır mısın?`
              )
            }
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-teal-900 bg-white border border-teal-900/20 hover:bg-teal-50 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Rehberle Yorumla</span>
          </button>
        </div>
      </section>
    </div>
  );
}
