import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'HUGGINGFACE_API_KEY is not set in .env' }, { status: 500 });
    }
    
    const hf = new HfInference(apiKey);
    const formData = await req.formData();
    const file = formData.get('audio') as File;

    if (!file) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // The HF fal-ai provider strictly checks the MIME type string and rejects 'audio/webm',
    // but the underlying decoder (ffmpeg) can usually handle webm bytes just fine. 
    // We spoof the MIME type here to bypass the strict provider check.
    const audioBlob = new Blob([buffer], { type: 'audio/wav' });

    // We use distil-whisper instead of whisper-large-v3 because the latter 
    // is routed to fal-ai, which strictly rejects WebM magic bytes. 
    // distil-whisper runs on HF native infrastructure and handles WebM correctly.
    const transcription = await hf.automaticSpeechRecognition({
      data: audioBlob,
      model: 'distil-whisper/distil-large-v3',
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error: any) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}
