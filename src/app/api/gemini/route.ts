import { NextRequest, NextResponse } from 'next/server';

/**
 * ==============================================================================
 * Nightbuild Studio — Gemini API Gateway
 * Route: /api/gemini
 * ==============================================================================
 */

export interface GeminiRequestBody {
  prompt?: string;
  projectContext?: {
    title?: string;
    techStack?: string[];
    scope?: string;
  };
}

export interface GeminiResponseBody {
  status: 'stubbed' | 'success' | 'error';
  message: string;
  data?: any;
  timestamp: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: GeminiRequestBody = await req.json().catch(() => ({}));
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json<GeminiResponseBody>(
        {
          status: 'stubbed',
          message: 'Gemini API key is not configured. Add GEMINI_API_KEY to .env.local to activate.',
          data: {
            endpoint: '/api/gemini',
            receivedPrompt: body.prompt || null,
          },
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    const userPrompt =
      body.prompt ||
      'Suggest three unconventional web project ideas that computer science students and creative studios could build together.';

    // Invoke Gemini 3.6 Flash
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are the AI Creative Technologist for Nightbuild Studio — a nocturnal, student-run creative web development agency known for bespoke, unconventional websites and high-impact CS capstones. Answer concisely with crisp, authorial tone. Context: ${JSON.stringify(
                    body.projectContext || {}
                  )}. Prompt: ${userPrompt}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const result = await response.json();

    if (result.error) {
      return NextResponse.json<GeminiResponseBody>(
        {
          status: 'error',
          message: result.error.message || 'Gemini inference failed.',
          data: result.error,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    const generatedText =
      result.candidates?.[0]?.content?.parts?.[0]?.text || 'No text output returned.';

    return NextResponse.json<GeminiResponseBody>({
      status: 'success',
      message: 'Gemini 3.6 Flash generated response successfully.',
      data: {
        prompt: userPrompt,
        result: generatedText,
        model: 'gemini-3.6-flash',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json<GeminiResponseBody>(
      {
        status: 'error',
        message: error?.message || 'Internal server error while processing Gemini route.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const isKeyActive = Boolean(process.env.GEMINI_API_KEY);
  return NextResponse.json({
    service: 'Nightbuild Studio Gemini Integration Gateway',
    status: 'online',
    version: '1.0.0',
    geminiActive: isKeyActive,
    model: 'gemini-3.6-flash',
    documentation: 'Send POST requests with { prompt: string, projectContext?: object }',
  });
}
