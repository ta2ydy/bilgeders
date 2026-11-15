import {NextRequest, NextResponse} from 'next/server';
import {ThinkingLevel, Type} from '@google/genai';
import {getUnitById, type QuizQuestion, type UnitId} from '@/lib/curriculum';
import {
  buildQuizSystemInstruction,
  buildQuizTaskPrompt,
  type QuizDifficulty,
} from '@/lib/prompts';
import {GEMINI_MODEL, getErrorStatusAndMessage, getGeminiClient} from '@/lib/gemini';

interface GeneratedQuizPayload {
  soru: string;
  secenekler: string[];
  dogruIndex: number;
  aciklama: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      unitId?: UnitId;
      difficulty?: QuizDifficulty;
      existingQuestions?: string[];
    };

    const unit = getUnitById(body.unitId ?? 'allah-inanci');
    const difficulty: QuizDifficulty =
      body.difficulty === 'Temel' ||
      body.difficulty === 'Orta' ||
      body.difficulty === 'İleri'
        ? body.difficulty
        : 'Orta';
    const existingQuestions = Array.isArray(body.existingQuestions)
      ? body.existingQuestions.filter((q): q is string => typeof q === 'string')
      : [];

    const systemInstruction = buildQuizSystemInstruction(unit);
    const taskPrompt = buildQuizTaskPrompt(unit, difficulty, existingQuestions);

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: taskPrompt,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            soru: {
              type: Type.STRING,
              description: 'The 5th-grade quiz question stem in Turkish.',
            },
            secenekler: {
              type: Type.ARRAY,
              items: {type: Type.STRING},
              description: 'Exactly 4 distinct multiple-choice options in Turkish.',
            },
            dogruIndex: {
              type: Type.INTEGER,
              description: '0-based index (0, 1, 2, or 3) of the single correct option.',
            },
            aciklama: {
              type: Type.STRING,
              description:
                'A clear 1-2 sentence Turkish explanation of why the correct option is right.',
            },
          },
          required: ['soru', 'secenekler', 'dogruIndex', 'aciklama'],
        },
      },
    });

    const rawText = response.text?.trim();
    if (!rawText) {
      return NextResponse.json(
        {error: 'Soru üretilemedi. Lütfen tekrar deneyin.'},
        {status: 502}
      );
    }

    const parsed = JSON.parse(rawText) as GeneratedQuizPayload;

    if (
      !parsed.soru ||
      !Array.isArray(parsed.secenekler) ||
      parsed.secenekler.length !== 4 ||
      typeof parsed.dogruIndex !== 'number' ||
      parsed.dogruIndex < 0 ||
      parsed.dogruIndex > 3 ||
      !parsed.aciklama
    ) {
      return NextResponse.json(
        {error: 'Üretilen soru formatı doğrulanamadı. Lütfen tekrar deneyin.'},
        {status: 502}
      );
    }

    const question: QuizQuestion = {
      id: `ai-${unit.id}-${Date.now()}`,
      soru: parsed.soru.trim(),
      secenekler: [
        parsed.secenekler[0].trim(),
        parsed.secenekler[1].trim(),
        parsed.secenekler[2].trim(),
        parsed.secenekler[3].trim(),
      ],
      dogruIndex: parsed.dogruIndex,
      aciklama: parsed.aciklama.trim(),
      aiGenerated: true,
    };

    return NextResponse.json({
      question,
      model: GEMINI_MODEL,
      promptsUsed: {
        systemInstruction,
        taskPrompt,
      },
    });
  } catch (error) {
    const mapped = getErrorStatusAndMessage(error);
    return NextResponse.json({error: mapped.message}, {status: mapped.status});
  }
}
