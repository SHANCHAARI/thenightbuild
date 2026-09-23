import { NextRequest, NextResponse } from 'next/server';

/**
 * ==============================================================================
 * Nightbuild Studio — Gemini API Gateway
 * Route: /api/gemini
 * ==============================================================================
 */

export interface ChatHistoryItem {
  sender: 'user' | 'agent';
  text: string;
}

export interface GeminiRequestBody {
  prompt?: string;
  history?: ChatHistoryItem[];
  projectContext?: Record<string, any>;
}

export interface GeminiResponseBody {
  status: 'stubbed' | 'success' | 'error';
  message: string;
  data?: any;
  timestamp: string;
}

const SYSTEM_INSTRUCTION = `You are "The Night Agent", the nocturnal AI Creative Technologist and technical lead for Nightbuild Studio.
Nightbuild Studio is an independent creative web development & engineering agency founded by a collective of computer science students (do NOT refer to them as "final-year", they are simply computer science students).

STUDIO DETAILS:
- Founders & Core Engineers:
  1. Nirmal Kumar — Co-Founder & Systems / Full-Stack Engineer (Next.js 14 App Router, edge runtimes, API architecture, Supabase integration). LinkedIn: https://www.linkedin.com/in/nirmal-kumar-a43a56392
  2. Pusarla Aakash — Co-Founder & Creative Technologist (Apple-grade Framer Motion choreography, fluid typography, responsive layout physics, frontend craft). LinkedIn: https://www.linkedin.com/in/pusarla-aakash-79b9a9392
  3. Vidya Sagar — Co-Founder & Backend / Platform Engineer (Cloud architectures, distributed systems, database schemas, algorithmic systems). LinkedIn: https://www.linkedin.com/in/vidyasagarcodes/
  4. Pusarla Manoj Kumar — Co-Founder & Cloud Infrastructure / Security Lead (Cloud security protocols, edge deployment automation, infrastructure hardening, CI/CD pipelines). LinkedIn: https://www.linkedin.com/in/pusarla-manoj-kumar-b3454a3b3
- Flagship Artifacts & Case Studies:
  1. Chronos: Distributed Kernel Visualizer — CS Capstone visual debugger for multi-core memory barrier races and Raft consensus.
  2. Vesperal Atelier — High-performance commercial platform with sub-second edge rendering and zero templates.
  3. Aetherform — In-browser Web Audio DSP synthesis engine with zero-jank Canvas shaders.
- Studio Tools:
  - "The Midnight Architect" (/blueprint): An interactive scope and architecture blueprint estimator that calculates sprint timelines and investment brackets in real time.
- Communication & Channels:
  - Official Email: nigthbulid@gmail.com
  - Instant WhatsApp Channel: Direct communication with Nirmal, Aakash, Vidya, and Manoj (https://wa.me/?text=Hi%20Nightbuild%20Studio!%20I%20would%20like%20to%20discuss%20a%20project%20with%20your%20team.)
  - Commission Form: /contact

VOICE & TONE:
- Crisp, technically sophisticated, confident, nocturnal, helpful, and concise.
- Use markdown formatting with bullet points when enumerating details.
- When asked about the developers or team, always proudly highlight all four co-founders: Nirmal Kumar, Pusarla Aakash, Vidya Sagar, and Pusarla Manoj Kumar.
- When asked for email or contact, supply nigthbulid@gmail.com and WhatsApp.
- When asked about WhatsApp, invite them to use the WhatsApp button in the chat header or connect directly.`;

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

    const userPrompt = body.prompt?.trim();
    if (!userPrompt) {
      return NextResponse.json<GeminiResponseBody>(
        {
          status: 'error',
          message: 'Prompt is required.',
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Build multi-turn contents for Gemini
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // System guidance as the premier context turn
    contents.push({
      role: 'user',
      parts: [
        {
          text: `[SYSTEM INSTRUCTION]\n${SYSTEM_INSTRUCTION}\n\n[CURRENT CONTEXT]\n${JSON.stringify(
            body.projectContext || {}
          )}`,
        },
      ],
    });
    contents.push({
      role: 'model',
      parts: [
        {
          text: 'Understood. I am The Night Agent for Nightbuild Studio. I will assist visitors with technical depth, knowledge of our team (Nirmal Kumar, Pusarla Aakash, Vidya Sagar, Pusarla Manoj Kumar), our portfolio works, sprint architecture, and direct WhatsApp / contact options.',
        },
      ],
    });

    // Append conversation history if provided
    if (body.history && Array.isArray(body.history)) {
      body.history.slice(-6).forEach((h) => {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      });
    }

    // Append the active user prompt
    contents.push({
      role: 'user',
      parts: [{ text: userPrompt }],
    });

    // Try Gemini models in priority order
    const candidateModels = ['gemini-3.6-flash', 'gemini-flash-latest', 'gemini-3.8-flash'];
    let lastError: any = null;
    let generatedText: string | null = null;
    let modelUsed: string = candidateModels[0];

    for (const model of candidateModels) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                maxOutputTokens: 800,
              },
            }),
          }
        );

        const result = await response.json();

        if (response.ok && result.candidates?.[0]?.content?.parts?.[0]?.text) {
          generatedText = result.candidates[0].content.parts[0].text;
          modelUsed = model;
          break;
        } else {
          lastError = result.error || { message: `Failed with status ${response.status}` };
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    if (!generatedText) {
      return NextResponse.json<GeminiResponseBody>(
        {
          status: 'error',
          message: lastError?.message || 'Gemini inference failed across models.',
          data: lastError,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json<GeminiResponseBody>({
      status: 'success',
      message: `${modelUsed} generated response successfully.`,
      data: {
        prompt: userPrompt,
        result: generatedText,
        model: modelUsed,
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
    version: '2.0.0',
    geminiActive: isKeyActive,
    primaryModel: 'gemini-3.6-flash',
    documentation: 'Send POST requests with { prompt: string, history?: array, projectContext?: object }',
  });
}
