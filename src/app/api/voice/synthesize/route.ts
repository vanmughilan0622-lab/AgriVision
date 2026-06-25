import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'HUGGINGFACE_API_KEY is not set in .env' }, { status: 500 });
    }
    
    const hf = new HfInference(apiKey);
    const { text, language = 'en' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const modelMap: Record<string, string> = {
      en: 'facebook/mms-tts-eng',
      hi: 'facebook/mms-tts-hin',
      ta: 'facebook/mms-tts-tam',
      te: 'facebook/mms-tts-tel',
      kn: 'facebook/mms-tts-kan',
      mr: 'facebook/mms-tts-mar',
      pa: 'facebook/mms-tts-pan',
      gu: 'facebook/mms-tts-guj',
    };

    const modelToUse = modelMap[language] || 'facebook/mms-tts-eng';

    const audioBlob = await hf.textToSpeech({
      inputs: text,
      model: modelToUse,
    });

    const arrayBuffer = await audioBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Disposition': 'attachment; filename="speech.wav"',
      },
    });
  } catch (error: any) {
    console.error('Synthesis error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to synthesize audio' },
      { status: 500 }
    );
  }
}
