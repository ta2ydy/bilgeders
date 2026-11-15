import {GoogleGenAI} from '@google/genai';

export const GEMINI_MODEL = 'gemini-4-hydrogen';

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export function getErrorStatusAndMessage(error: unknown): {
  status: number;
  message: string;
} {
  const raw = error instanceof Error ? error.message : String(error);

  if (raw.includes('GEMINI_API_KEY')) {
    return {
      status: 500,
      message:
        'Sunucuda GEMINI_API_KEY tanımlı değil. Lütfen AI Studio Secrets panelinden anahtarı kontrol edin.',
    };
  }
  if (raw.includes('429') || raw.includes('RESOURCE_EXHAUSTED')) {
    return {
      status: 429,
      message:
        'Yapay zeka servisi şu anda yoğun. Lütfen birkaç saniye bekleyip tekrar deneyin.',
    };
  }
  if (raw.includes('403') || raw.includes('PERMISSION_DENIED') || raw.includes('API_KEY_INVALID')) {
    return {
      status: 403,
      message:
        'Gemini API anahtarı doğrulanamadı. Lütfen Ayarlar > Secrets bölümünü kontrol edin.',
    };
  }

  return {
    status: 500,
    message:
      'Yapay zeka yanıtı oluşturulurken geçici bir sorun oluştu. Lütfen tekrar deneyin.',
  };
}
