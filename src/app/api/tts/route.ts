import { NextRequest, NextResponse } from "next/server";
import * as googleTTS from 'google-tts-api';

export async function GET(req: NextRequest) {
    const text = req.nextUrl.searchParams.get('text');
    const lang = req.nextUrl.searchParams.get('lang') || 'en';

    if (!text) {
        return new Response('Text is required', { status: 400 });
    }

    try {
        const base64Audio = await googleTTS.getAudioBase64(text, {
            lang: lang,
            slow: false,
            host: 'https://translate.google.com',
        });
        
        const buffer = Buffer.from(base64Audio, 'base64');
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': buffer.byteLength.toString(),
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (error: any) {
        console.error("TTS API Route Error:", error);
        return new Response(error.message, { status: 500 });
    }
}
