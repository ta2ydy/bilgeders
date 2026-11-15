import {NextRequest, NextResponse} from 'next/server';
import {ThinkingLevel} from '@google/genai';
import {getUnitById, type UnitId} from '@/lib/curriculum';
import {buildTutorSystemInstruction, buildTutorTaskPrompt} from '@/lib/prompts';
import {GEMINI_MODEL, getErrorStatusAndMessage, getGeminiClient} from '@/lib/gemini';

interface ChatHistoryMessage {
  role: 'user' | 'model';
  text: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      unitId?: UnitId;
      message?: string;
      history?: ChatHistoryMessage[];
    };

    const message = body.message?.trim();
    if (!message) {
      return NextResponse.json(
        {error: 'Lütfen sormak istediğiniz soruyu yazın.'},
        {status: 400}
      );
    }

    const unit = getUnitById(body.unitId ?? 'allah-inanci');
    const systemInstruction = buildTutorSystemInstruction(unit);
    const taskPrompt = buildTutorTaskPrompt(unit, message);

    const ai = getGeminiClient();

    const priorHistory = Array.isArray(body.history)
      ? body.history
          .filter(
            (item): item is ChatHistoryMessage =>
              (item.role === 'user' || item.role === 'model') &&
              typeof item.text === 'string' &&
              item.text.trim().length > 0
          )
          .slice(-8)
          .map((item) => ({
            role: item.role,
            parts: [{text: item.text}],
          }))
      : [];

    const chat = ai.chats.create({
      model: GEMINI_MODEL,
      history: priorHistory,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      },
    });

    const response = await chat.sendMessage({
      message: taskPrompt,
    });

    const replyText = response.text?.trim();
    if (!replyText) {
      return NextResponse.json(
        {error: 'Rehberden boş yanıt döndü. Lütfen soruyu yeniden deneyin.'},
        {status: 502}
      );
    }

    return NextResponse.json({
      reply: replyText,
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
