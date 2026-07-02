import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const text = req.nextUrl.searchParams.get('text');
    const lang = req.nextUrl.searchParams.get('lang') || 'en';

    if (!text) {
        return new Response('Text is required', { status: 400 });
    }

    try {
        const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=${lang}&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(url, {
            headers: {
                // Mimic a real browser to prevent Google from blocking the request
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://translate.google.com/'
            }
        });

        if (!response.ok) {
            throw new Error(`Google TTS failed with status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        return new Response(arrayBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': arrayBuffer.byteLength.toString(),
                'Cache-Control': 'public, max-age=3600',
            },
        });
    } catch (error: any) {
        console.error("TTS API Route Error:", error);
        return new Response(error.message, { status: 500 });
    }
}
