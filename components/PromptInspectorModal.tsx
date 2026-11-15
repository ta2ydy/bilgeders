'use client';

import {useEffect, useState} from 'react';
import {Check, Copy, Terminal, X} from 'lucide-react';
import type {LearningMode, UnitData} from '@/lib/curriculum';
import {
  buildQuizSystemInstruction,
  buildQuizTaskPrompt,
  buildTutorSystemInstruction,
  buildTutorTaskPrompt,
  type QuizDifficulty,
} from '@/lib/prompts';

interface PromptInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: UnitData;
  activeMode: LearningMode;
  lastTutorQuestion: string;
}

export default function PromptInspectorModal({
  onClose,
  unit,
  activeMode,
  lastTutorQuestion,
}: Omit<PromptInspectorModalProps, 'isOpen'>) {
  const [promptTab, setPromptTab] = useState<'tutor' | 'quiz'>(
    activeMode === 'yarisma' ? 'quiz' : 'tutor'
  );
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('Orta');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const sampleQuestion =
    lastTutorQuestion.trim() ||
    unit.rehberSorulari[0] ||
    'Bu ünitenin ana mesajını günlük hayattan bir örnekle açıklar mısın?';

  const systemInstruction =
    promptTab === 'tutor'
      ? buildTutorSystemInstruction(unit)
      : buildQuizSystemInstruction(unit);

  const taskPrompt =
    promptTab === 'tutor'
      ? buildTutorTaskPrompt(unit, sampleQuestion)
      : buildQuizTaskPrompt(
          unit,
          difficulty,
          unit.sorular.map((s) => s.soru)
        );

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Clipboard API fallback ignored if restricted
    }
  };

  const fullBundle = `=== GOOGLE AI STUDIO · ${
    promptTab === 'tutor' ? 'AI TUTOR (AKILLI REHBER)' : 'AI QUIZ GENERATOR (BİLGİ YARIŞMASI)'
  } ===
Model: gemini-4-hydrogen
Active Unit: ${unit.englishTitle}

--- SYSTEM INSTRUCTION (English) ---
${systemInstruction}

--- TASK PROMPT (English) ---
${taskPrompt}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-[2px] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-inspector-title"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[88vh] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
              <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Google AI Studio Prompt Inspector</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">gemini-4-hydrogen</span>
            </div>
            <h2
              id="prompt-inspector-title"
              className="font-display text-lg font-semibold text-slate-900"
            >
              English Prompts · {unit.tamAd}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Pencereyi kapat"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Toolbar */}
        <div className="px-6 py-3 bg-[#F8FAFC] border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div
            className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg"
            role="tablist"
            aria-label="Prompt türü"
          >
            <button
              type="button"
              role="tab"
              aria-selected={promptTab === 'tutor'}
              onClick={() => setPromptTab('tutor')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                promptTab === 'tutor'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Akıllı Rehber (Tutor)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={promptTab === 'quiz'}
              onClick={() => setPromptTab('quiz')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                promptTab === 'quiz'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bilgi Yarışması (Quiz JSON)
            </button>
          </div>

          <div className="flex items-center gap-2">
            {promptTab === 'quiz' && (
              <div className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
                {(['Temel', 'Orta', 'İleri'] as QuizDifficulty[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDifficulty(lvl)}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      difficulty === lvl
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => void copyText('all', fullBundle)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#0F4C52] hover:bg-[#0B3B40] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedKey === 'all' ? (
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{copiedKey === 'all' ? 'Kopyalandı' : 'Tümünü Kopyala'}</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed">
            Tüm Gemini API çağrıları sunucu tarafında aşağıdaki İngilizce{' '}
            <code className="font-mono text-slate-800">systemInstruction</code>{' '}
            ve görev istemleriyle yürütülür; öğrenciye dönen tüm açıklamalar,
            sorular ve yanıtlar Türkçe üretilir.
          </p>

          {/* System Instruction Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900 font-mono">
                systemInstruction (English)
              </span>
              <button
                type="button"
                onClick={() => void copyText('sys', systemInstruction)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                {copiedKey === 'sys' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === 'sys' ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed p-4 rounded-xl overflow-x-auto whitespace-pre-wrap">
              {systemInstruction}
            </pre>
          </div>

          {/* Task Prompt Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900 font-mono">
                taskPrompt (English)
              </span>
              <button
                type="button"
                onClick={() => void copyText('task', taskPrompt)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                {copiedKey === 'task' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === 'task' ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed p-4 rounded-xl overflow-x-auto whitespace-pre-wrap">
              {taskPrompt}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
