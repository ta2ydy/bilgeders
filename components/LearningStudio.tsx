'use client';

import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Terminal} from 'lucide-react';
import {
  getUnitById,
  MEB_UNITS,
  type LearningMode,
  type UnitId,
} from '@/lib/curriculum';
import SummaryMode from './SummaryMode';
import FlashcardsMode from './FlashcardsMode';
import QuizMode from './QuizMode';
import TutorMode, {type TutorMessage} from './TutorMode';
import PromptInspectorModal from './PromptInspectorModal';

const LEARNING_MODES: {id: LearningMode; label: string}[] = [
  {id: 'ozet', label: 'Konu Özeti'},
  {id: 'kartlar', label: 'Kavram Kartları'},
  {id: 'yarisma', label: 'Bilgi Yarışması'},
  {id: 'rehber', label: 'Akıllı Rehber'},
];

export default function LearningStudio() {
  const [activeUnitId, setActiveUnitId] = useState<UnitId>('allah-inanci');
  const [activeMode, setActiveMode] = useState<LearningMode>('ozet');
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);

  const [masteredIds, setMasteredIds] = useState<Record<string, boolean>>({});
  const [tutorMessagesByUnit, setTutorMessagesByUnit] = useState<
    Partial<Record<UnitId, TutorMessage[]>>
  >({});
  const [tutorLoadingUnit, setTutorLoadingUnit] = useState<UnitId | null>(null);
  const [tutorErrorByUnit, setTutorErrorByUnit] = useState<
    Partial<Record<UnitId, string | null>>
  >({});
  const [lastTutorQuestion, setLastTutorQuestion] = useState('');

  const activeUnit = getUnitById(activeUnitId);
  const activeTutorMessages = tutorMessagesByUnit[activeUnitId] ?? [];

  const handleToggleMastered = (cardId: string) => {
    setMasteredIds((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handleResetUnitMastered = (cardIds: string[]) => {
    setMasteredIds((prev) => {
      const next = {...prev};
      for (const id of cardIds) {
        delete next[id];
      }
      return next;
    });
  };

  const handleSendTutorMessage = async (
    targetUnitId: UnitId,
    questionText: string
  ) => {
    const trimmed = questionText.trim();
    if (!trimmed || tutorLoadingUnit === targetUnitId) return;

    setLastTutorQuestion(trimmed);
    setTutorErrorByUnit((prev) => ({...prev, [targetUnitId]: null}));

    const existingHistory = tutorMessagesByUnit[targetUnitId] ?? [];
    const userMsg: TutorMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setTutorMessagesByUnit((prev) => ({
      ...prev,
      [targetUnitId]: [...(prev[targetUnitId] ?? []), userMsg],
    }));
    setTutorLoadingUnit(targetUnitId);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          unitId: targetUnitId,
          message: trimmed,
          history: existingHistory.map((m) => ({role: m.role, text: m.text})),
        }),
      });

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || 'Rehber yanıtı alınamadı.');
      }

      const modelMsg: TutorMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
      };

      setTutorMessagesByUnit((prev) => ({
        ...prev,
        [targetUnitId]: [...(prev[targetUnitId] ?? []), modelMsg],
      }));
    } catch (err) {
      setTutorErrorByUnit((prev) => ({
        ...prev,
        [targetUnitId]:
          err instanceof Error
            ? err.message
            : 'Bağlantı sırasında bir hata oluştu. Lütfen tekrar deneyin.',
      }));
    } finally {
      setTutorLoadingUnit((prev) => (prev === targetUnitId ? null : prev));
    }
  };

  const handleOpenTutorWithQuestion = (question: string) => {
    setActiveMode('rehber');
    void handleSendTutorMessage(activeUnitId, question);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => setActiveMode('ozet')}
            className="font-display text-lg sm:text-xl font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded"
          >
            Din Kültürü 5
          </button>

          {/* Zone 2: 4 Single-line Mode Links */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Öğrenme modları"
          >
            {LEARNING_MODES.map((mode) => {
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActiveMode(mode.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded ${
                    isActive
                      ? 'text-[#0F4C52]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{mode.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-[#0F4C52] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsPromptModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#0F4C52] hover:bg-[#0B3B40] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
            >
              <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>AI Studio Prompt</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* 5 MEB 5th-Grade Unit Selector */}
        <section aria-label="MEB 5. Sınıf Üniteleri" className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>MEB 5. Sınıf Din Kültürü ve Ahlak Bilgisi Üniteleri</span>
            <span className="hidden sm:inline font-mono tabular-nums">
              {activeUnit.numara} / {MEB_UNITS.length} Ünite
            </span>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5"
            role="tablist"
            aria-label="Ünite seçimi"
          >
            {MEB_UNITS.map((unit) => {
              const isSelected = unit.id === activeUnitId;
              return (
                <button
                  key={unit.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveUnitId(unit.id)}
                  className={`text-left px-3.5 py-3 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${
                    isSelected
                      ? 'bg-[#0F4C52] text-white border-[#0F4C52]'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`block font-mono text-[11px] font-medium tabular-nums ${
                      isSelected ? 'text-teal-200' : 'text-slate-500'
                    }`}
                  >
                    {unit.numara}. Ünite
                  </span>
                  <span className="block text-sm font-semibold truncate mt-0.5">
                    {unit.kisaAd}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Mobile Mode Switcher (Hidden on desktop where top bar handles modes) */}
        <div
          className="md:hidden grid grid-cols-2 gap-1.5 p-1 bg-slate-200/70 rounded-xl"
          role="tablist"
          aria-label="Öğrenme modu"
        >
          {LEARNING_MODES.map((mode) => {
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveMode(mode.id)}
                className={`py-2.5 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Learning Mode Viewport */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeUnit.id}-${activeMode}`}
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -6}}
            transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
          >
            {activeMode === 'ozet' && (
              <SummaryMode
                unit={activeUnit}
                onStartQuiz={() => setActiveMode('yarisma')}
                onOpenTutorWithQuestion={handleOpenTutorWithQuestion}
              />
            )}
            {activeMode === 'kartlar' && (
              <FlashcardsMode
                unit={activeUnit}
                masteredIds={masteredIds}
                onToggleMastered={handleToggleMastered}
                onResetUnitMastered={handleResetUnitMastered}
              />
            )}
            {activeMode === 'yarisma' && <QuizMode unit={activeUnit} />}
            {activeMode === 'rehber' && (
              <TutorMode
                unit={activeUnit}
                messages={activeTutorMessages}
                isLoading={tutorLoadingUnit === activeUnitId}
                errorMsg={tutorErrorByUnit[activeUnitId] ?? null}
                onSendMessage={(q) => void handleSendTutorMessage(activeUnitId, q)}
                onClearChat={() => {
                  setTutorMessagesByUnit((prev) => ({
                    ...prev,
                    [activeUnitId]: [],
                  }));
                  setTutorErrorByUnit((prev) => ({
                    ...prev,
                    [activeUnitId]: null,
                  }));
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            5. Sınıf Din Kültürü ve Ahlak Bilgisi · MEB Müfredatı Öğrenme
            Atölyesi
          </span>
          <button
            type="button"
            onClick={() => setIsPromptModalOpen(true)}
            className="text-teal-800 hover:underline font-medium cursor-pointer"
          >
            Aktif İngilizce Gemini İstemlerini İncele
          </button>
        </div>
      </footer>

      {/* AI Studio English Prompt Inspector Modal */}
      {isPromptModalOpen && (
        <PromptInspectorModal
          onClose={() => setIsPromptModalOpen(false)}
          unit={activeUnit}
          activeMode={activeMode}
          lastTutorQuestion={lastTutorQuestion}
        />
      )}
    </div>
  );
}
