'use client';

import {useEffect, useRef, useState} from 'react';
import Markdown from 'react-markdown';
import {
  AlertCircle,
  Loader2,
  MessageSquare,
  Send,
  Trash2,
} from 'lucide-react';
import type {UnitData} from '@/lib/curriculum';

export interface TutorMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface TutorModeProps {
  unit: UnitData;
  messages: TutorMessage[];
  isLoading: boolean;
  errorMsg: string | null;
  onSendMessage: (questionText: string) => void;
  onClearChat: () => void;
}

export default function TutorMode({
  unit,
  messages,
  isLoading,
  errorMsg,
  onSendMessage,
  onClearChat,
}: TutorModeProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages.length, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput('');
    onSendMessage(trimmed);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Zone: Unit Context & Suggested Questions */}
      <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="space-y-1.5 pb-4 border-b border-slate-100">
          <p className="text-xs font-medium text-teal-800">
            {unit.numara}. Ünite Rehberi · {unit.sureDua.ad}
          </p>
          <h2 className="font-display text-xl font-semibold text-slate-900">
            Akıllı Rehber
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {unit.kisaAd} ünitesiyle ilgili aklına takılan her soruyu Türkçe
            sorabilir, günlük hayattan örneklerle anlatım isteyebilirsin.
          </p>
        </div>

        <div className="space-y-2.5">
          <p className="text-xs font-semibold text-slate-700">
            Hızlı Başlangıç Soruları
          </p>
          <div className="space-y-2">
            {unit.rehberSorulari.map((q) => (
              <button
                key={q}
                type="button"
                disabled={isLoading}
                onClick={() => onSendMessage(q)}
                className="w-full text-left px-3.5 py-2.5 text-xs sm:text-sm text-slate-700 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors leading-snug cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Right Zone: Interactive Q&A Chat Stage */}
      <section className="lg:col-span-8 bg-white border border-slate-200 rounded-xl flex flex-col min-h-[520px] max-h-[680px]">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <MessageSquare
              className="w-4 h-4 text-[#0F4C52] shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-slate-900 truncate">
              {unit.tamAd} · Öğretmen Sohbeti
            </span>
          </div>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={onClearChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Sohbeti Temizle</span>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-3 py-8">
              <p className="font-display text-lg font-semibold text-slate-900">
                Merhaba! Ben Akıllı Rehber.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Şu an{' '}
                <span className="font-semibold text-slate-800">
                  {unit.tamAd}
                </span>{' '}
                üzerinde çalışıyoruz. Soldaki hazır sorulardan birini seçebilir
                veya aşağıdaki kutuya kendi sorunuzu yazabilirsin.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#0F4C52] text-white'
                      : 'bg-[#F8FAFC] border border-slate-200 text-slate-800'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p>{msg.text}</p>
                  ) : (
                    <div className="prose prose-sm prose-slate max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 inline-flex items-center gap-2.5">
                <Loader2
                  className="w-4 h-4 animate-spin text-[#0F4C52]"
                  aria-hidden="true"
                />
                <span>Yanıt hazırlanıyor...</span>
              </div>
            </div>
          )}

          {errorMsg && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-center gap-2.5 text-xs sm:text-sm text-red-800"
            >
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-slate-100 flex items-center gap-2.5"
        >
          <label htmlFor="tutor-question-input" className="sr-only">
            Akıllı Rehbere sorunuzu yazın
          </label>
          <input
            id="tutor-question-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`${unit.kisaAd} hakkında bir soru yaz...`}
            disabled={isLoading}
            className="flex-1 min-h-[44px] px-4 py-2 text-sm bg-[#F8FAFC] border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-sm font-medium text-white bg-[#0F4C52] hover:bg-[#0B3B40] disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>Gönder</span>
          </button>
        </form>
      </section>
    </div>
  );
}
