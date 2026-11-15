'use client';

import {useState} from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Loader2,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import type {QuizQuestion, UnitData} from '@/lib/curriculum';
import type {QuizDifficulty} from '@/lib/prompts';

interface QuizModeProps {
  unit: UnitData;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export default function QuizMode({unit}: QuizModeProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(unit.sorular);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [streak, setStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [difficulty, setDifficulty] = useState<QuizDifficulty>('Orta');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter(
    (q) => answers[q.id] !== undefined && answers[q.id] === q.dogruIndex
  ).length;

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion || selectedOption !== null) return;
    setSelectedOption(optionIndex);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
    if (optionIndex === currentQuestion.dogruIndex) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setIsCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setStreak(0);
    setIsCompleted(false);
  };

  const handleGenerateAIQuestion = async () => {
    setIsGenerating(true);
    setGenerateError(null);
    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          unitId: unit.id,
          difficulty,
          existingQuestions: questions.map((q) => q.soru),
        }),
      });

      const data = (await response.json()) as {
        question?: QuizQuestion;
        error?: string;
      };

      if (!response.ok || !data.question) {
        throw new Error(
          data.error || 'Yapay zeka sorusu oluşturulurken bir sorun oluştu.'
        );
      }

      const newQuestions = [...questions, data.question];
      setQuestions(newQuestions);
      setCurrentIndex(newQuestions.length - 1);
      setSelectedOption(null);
      setIsCompleted(false);
    } catch (err) {
      setGenerateError(
        err instanceof Error
          ? err.message
          : 'Yeni soru üretilemedi. Lütfen tekrar deneyin.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const accuracyPercent =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Quiz Control & Score Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>{unit.tamAd}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums font-medium text-slate-700">
              Soru {Math.min(currentIndex + 1, questions.length)} / {questions.length}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums font-medium text-emerald-700">
              Doğru: {correctCount}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums font-medium text-amber-700">
              Seri: {streak}
            </span>
          </div>
          <h2 className="font-display text-xl font-semibold text-slate-900">
            Bilgi Yarışması
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg"
            role="group"
            aria-label="Yapay zeka soru zorluk düzeyi"
          >
            {(['Temel', 'Orta', 'İleri'] as QuizDifficulty[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  difficulty === level
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleGenerateAIQuestion}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#0F4C52] hover:bg-[#0B3B40] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>
              {isGenerating
                ? 'Soru Üretiliyor...'
                : 'Yapay Zeka ile Yeni Soru Üret'}
            </span>
          </button>
        </div>
      </div>

      {generateError && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between gap-4 text-sm text-red-800"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{generateError}</span>
          </div>
          <button
            type="button"
            onClick={handleGenerateAIQuestion}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-red-200 hover:bg-red-100 rounded-lg shrink-0 cursor-pointer"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {isCompleted ? (
        <section className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0F4C52] flex items-center justify-center mx-auto">
            <Trophy className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-500">
              {unit.tamAd} · Yarışma Özeti
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-slate-900">
              Tebrikler! Testi Tamamladın
            </h3>
            <p className="text-sm text-slate-600">
              Toplam {questions.length} sorudan{' '}
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {correctCount}
              </span>{' '}
              tanesini doğru yanıtladın (Başarı oranı:{' '}
              <span className="font-mono font-semibold text-teal-800 tabular-nums">
                %{accuracyPercent}
              </span>
              ).
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Testi Yeniden Başlat</span>
            </button>
            <button
              type="button"
              onClick={handleGenerateAIQuestion}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#0F4C52] hover:bg-[#0B3B40] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Yapay Zeka ile Bonus Soru Üret</span>
            </button>
          </div>
        </section>
      ) : (
        currentQuestion && (
          <section className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pb-4 border-b border-slate-100">
              <span className="font-medium text-teal-800">
                {currentQuestion.aiGenerated
                  ? 'Yapay Zeka Tarafından Üretilen Soru'
                  : 'MEB Kazanım Sorusu'}
              </span>
              <span className="font-mono tabular-nums">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 leading-snug text-balance">
              {currentQuestion.soru}
            </h3>

            <div className="space-y-3" role="radiogroup" aria-label="Soru seçenekleri">
              {currentQuestion.secenekler.map((option, idx) => {
                const isAnswered = selectedOption !== null;
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.dogruIndex;

                let cardStyle =
                  'bg-[#F8FAFC] border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';
                let statusLabel: string | null = null;

                if (isAnswered) {
                  if (isCorrect) {
                    cardStyle =
                      'bg-emerald-50 border-emerald-300 text-emerald-950';
                    statusLabel = 'Doğru Cevap';
                  } else if (isSelected) {
                    cardStyle = 'bg-red-50 border-red-300 text-red-950';
                    statusLabel = 'Yanlış Seçim';
                  } else {
                    cardStyle =
                      'bg-slate-50 border-slate-200 text-slate-500 opacity-75';
                  }
                }

                return (
                  <button
                    key={`${currentQuestion.id}-${idx}`}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full min-h-[52px] text-left px-4 py-3.5 rounded-xl border transition-colors flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${cardStyle}`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="font-mono text-xs font-semibold w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                        {OPTION_LETTERS[idx]}
                      </span>
                      <span className="text-sm sm:text-base leading-relaxed">
                        {option}
                      </span>
                    </div>

                    {statusLabel && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold shrink-0">
                        {isCorrect ? (
                          <CheckCircle2
                            className="w-4 h-4 text-emerald-700"
                            aria-hidden="true"
                          />
                        ) : (
                          <XCircle
                            className="w-4 h-4 text-red-700"
                            aria-hidden="true"
                          />
                        )}
                        <span>{statusLabel}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div
                  className={`rounded-xl border p-4 space-y-1.5 ${
                    selectedOption === currentQuestion.dogruIndex
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-amber-50/70 border-amber-200'
                  }`}
                >
                  <p className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                    {selectedOption === currentQuestion.dogruIndex ? (
                      <>
                        <CheckCircle2
                          className="w-4 h-4 text-emerald-700"
                          aria-hidden="true"
                        />
                        <span>Harika! Doğru yanıtladın</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle
                          className="w-4 h-4 text-amber-700"
                          aria-hidden="true"
                        />
                        <span>
                          Doğru Seçenek: {OPTION_LETTERS[currentQuestion.dogruIndex]}
                        </span>
                      </>
                    )}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {currentQuestion.aciklama}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#0F4C52] hover:bg-[#0B3B40] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                  >
                    <span>
                      {currentIndex + 1 >= questions.length
                        ? 'Sonucu Gör'
                        : 'Sonraki Soru'}
                    </span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </section>
        )
      )}
    </div>
  );
}
