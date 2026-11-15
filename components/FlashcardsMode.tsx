'use client';

import {useCallback, useEffect, useState} from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shuffle,
} from 'lucide-react';
import type {FlashcardItem, UnitData} from '@/lib/curriculum';

interface FlashcardsModeProps {
  unit: UnitData;
  masteredIds: Record<string, boolean>;
  onToggleMastered: (cardId: string) => void;
  onResetUnitMastered: (cardIds: string[]) => void;
}

export default function FlashcardsMode({
  unit,
  masteredIds,
  onToggleMastered,
  onResetUnitMastered,
}: FlashcardsModeProps) {
  const [cards, setCards] = useState<FlashcardItem[]>(unit.kavramlar);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex] ?? cards[0];
  const masteredCount = cards.filter((c) => masteredIds[c.id]).length;

  const goPrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  }, [cards.length]);

  const goNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  }, [cards.length]);

  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const toggleMastered = () => {
    if (!currentCard) return;
    onToggleMastered(currentCard.id);
  };

  const shuffleDeck = () => {
    const copy = [...cards];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setCards(copy);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const resetProgress = () => {
    onResetUnitMastered(cards.map((c) => c.id));
    setCards(unit.kavramlar);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.code === 'ArrowRight') {
        event.preventDefault();
        goNext();
      } else if (event.code === 'Space') {
        event.preventDefault();
        toggleFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext, toggleFlip]);

  if (!currentCard) return null;

  const isCurrentMastered = Boolean(masteredIds[currentCard.id]);

  return (
    <div className="space-y-8">
      {/* Top Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>{unit.tamAd}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums font-medium text-slate-700">
              Kart {currentIndex + 1} / {cards.length}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums font-medium text-teal-800">
              Öğrenildi: {masteredCount} / {cards.length}
            </span>
          </div>
          <h2 className="font-display text-xl font-semibold text-slate-900">
            3 Boyutlu Kavram Kartları
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={shuffleDeck}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
          >
            <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Karıştır</span>
          </button>
          <button
            type="button"
            onClick={resetProgress}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* 3D Flip Card Stage */}
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="perspective-1200">
          <button
            type="button"
            onClick={toggleFlip}
            aria-label={
              isFlipped
                ? `${currentCard.kavram} kavramının ön yüzüne dön`
                : `${currentCard.kavram} kavramının tanımını görmek için kartı çevir`
            }
            className={`relative w-full min-h-[320px] sm:min-h-[340px] text-left preserve-3d transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-4 rounded-2xl ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front Face */}
            <div className="absolute inset-0 backface-hidden bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
                <span>Kavram · Ön Yüz</span>
                {isCurrentMastered ? (
                  <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Öğrenildi</span>
                  </span>
                ) : (
                  <span>Çalışılıyor</span>
                )}
              </div>

              <div className="space-y-3 text-center my-auto py-4">
                <h3 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight text-balance">
                  {currentCard.kavram}
                </h3>
                <p className="text-sm text-slate-500">
                  İpucu: {currentCard.ipucu}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Tanımı görmek için karta tıkla</span>
                <span className="font-mono">Boşluk Tuşu</span>
              </div>
            </div>

            {/* Back Face */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0F4C52] text-white border border-[#0B3B40] rounded-2xl p-6 sm:p-10 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between gap-4 text-xs text-teal-100">
                <span>Tanım ve Örnek · Arka Yüz</span>
                <span className="font-semibold text-white">{currentCard.kavram}</span>
              </div>

              <div className="space-y-4 my-auto py-4">
                <p className="text-base sm:text-lg font-medium leading-relaxed text-white">
                  {currentCard.tanim}
                </p>
                <div className="pt-3 border-t border-white/15">
                  <p className="text-xs font-semibold text-amber-200 mb-1">
                    Örnek Bağlantı
                  </p>
                  <p className="text-sm text-teal-50 leading-relaxed">
                    {currentCard.ornek}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-teal-100">
                <span>Ön yüze dönmek için tıkla</span>
                <span className="font-mono">Boşluk Tuşu</span>
              </div>
            </div>
          </button>
        </div>

        {/* Navigation & Mastery Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Önceki</span>
          </button>

          <button
            type="button"
            onClick={toggleMastered}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${
              isCurrentMastered
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>
              {isCurrentMastered ? 'Öğrenildi Olarak İşaretli' : 'Öğrendim İşaretle'}
            </span>
          </button>

          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#0F4C52] hover:bg-[#0B3B40] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
          >
            <span>Sonraki</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Quick-Jump Concept Index */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
        <p className="text-xs font-semibold text-slate-500">
          Ünite Kavramları Dizini ({cards.length} Kavram)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {cards.map((card, index) => {
            const isActive = index === currentIndex;
            const isDone = Boolean(masteredIds[card.id]);
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => {
                  setIsFlipped(false);
                  setCurrentIndex(index);
                }}
                className={`text-left px-3 py-2.5 rounded-lg border text-xs font-medium transition-colors flex items-center justify-between gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${
                  isActive
                    ? 'bg-[#0F4C52] text-white border-[#0F4C52]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{card.kavram}</span>
                {isDone && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? 'text-teal-200' : 'text-emerald-600'
                    }`}
                    aria-label="Öğrenildi"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
