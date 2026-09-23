'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Loader2,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Users,
  Code2,
  Phone,
  RefreshCw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

const WHATSAPP_URL = 'https://wa.me/?text=Hi%20Nightbuild%20Studio!%20I%20would%20like%20to%20discuss%20a%20project%20with%20your%20team.';

const QUICK_PROMPTS = [
  'Who are your developers?',
  'What works have you built?',
  'Can we talk on WhatsApp?',
  'What is your tech stack & pricing?',
];

// =============================================================================
// OFFLINE REPLY ENGINE — keyword-matched but rotated per topic so the same
// question never gets the same sentence twice in a session.
// =============================================================================
const OFFLINE_REPLIES: Record<string, string[]> = {
  team: [
    "Nightbuild Studio is founded by a collective of four passionate computer science students:\n\n• **Nirmal Kumar** — Systems & Full-Stack Engineer (Next.js App Router, edge services, API integration)\n• **Pusarla Aakash** — Creative Technologist (tactile UI choreography, motion systems, front-end craft)\n• **Vidya Sagar** — Backend & Platform Engineer (cloud architectures, database schemas, distributed workflows)\n• **Pusarla Manoj Kumar** — Cloud Infrastructure & Security Lead (cloud security, edge networking, CI/CD pipelines)\n\nEach of them is reachable on LinkedIn via the Studio page.",
    "Four computer science students run this studio, each owning a different layer of the stack:\n\n• **Nirmal Kumar** handles systems and full-stack engineering\n• **Pusarla Aakash** owns creative technology and motion design\n• **Vidya Sagar** builds the backend and platform architecture\n• **Pusarla Manoj Kumar** leads cloud infrastructure and security\n\nWant me to point you to their LinkedIn profiles or WhatsApp?",
    "The collective is Nirmal Kumar (systems/full-stack), Pusarla Aakash (creative technologist), Vidya Sagar (backend/platform), and Pusarla Manoj Kumar (cloud infra & security).\n\nThey review every build together before anything ships — you can meet them properly on the Studio page.",
    "Team roster, quick scan:\n\n1. **Nirmal Kumar** — the systems & full-stack backbone (Next.js, edge, APIs)\n2. **Pusarla Aakash** — the design-physics brain (motion, typography, layout)\n3. **Vidya Sagar** — the platform architect (cloud, databases, distributed systems)\n4. **Pusarla Manoj Kumar** — the infrastructure guardian (security, networking, CI/CD)\n\nAll four take client calls directly — WhatsApp is the fastest channel.",
    "Curious about the humans behind the builds? Four CS students:\n\n• Nirmal Kumar ships the full-stack systems\n• Pusarla Aakash choreographs the UI motion\n• Vidya Sagar designs the data layer\n• Pusarla Manoj Kumar hardens the cloud\n\nTheir LinkedIn links are on the Studio page if you want the full track record.",
  ],
  contact: [
    "Yes! You can connect with our developers directly on WhatsApp for real-time discussions, project questions, or quick scoping. Use the WhatsApp button in the chat header, or write to **nigthbulid@gmail.com**.",
    "Direct line it is — the WhatsApp button in the chat header opens a chat with all four engineers, and email (**nigthbulid@gmail.com**) works for detailed briefs. Commission triage runs 23:00–03:00 UTC.",
    "Fastest route is WhatsApp (button in the header of this chat). Prefer writing? Email nigthbulid@gmail.com and someone from the team will reply the same night.",
    "Two channels, both direct to engineers:\n\n• **WhatsApp** — instant, best for quick scoping (button in the chat header)\n• **Email** — nigthbulid@gmail.com, best for detailed briefs and attachments\n\nNo sales middlemen, you talk to the people who write the code.",
    "Ping us on WhatsApp and you'll reach Nirmal, Aakash, Vidya, or Manoj directly — whoever is on workshop duty. Email nigthbulid@gmail.com also works if you prefer async.",
  ],
  works: [
    "We craft both commercial platforms and landmark CS capstones with zero templates:\n\n1. **Chronos** — Distributed Kernel Visualizer for memory barrier races and Raft consensus.\n2. **Vesperal Atelier** — bespoke showcase with fluid typography and sub-second edge rendering.\n3. **Aetherform** — Web Audio DSP synthesis engine with zero-jank Canvas shaders.\n\nFull archive lives under `/projects`, or scope your own build on `/blueprint`.",
    "Recent builds include **Chronos** (a kernel visualizer for multicore races), **Vesperal Atelier** (an edge-rendered commercial platform), and **Aetherform** (an in-browser audio synthesis engine).\n\nEach one is documented in `/projects` with the full technical breakdown.",
    "Three flagship artifacts to look at:\n\n• **Chronos** — distributed systems debugger for CS research\n• **Vesperal Atelier** — commercial platform, zero templates, sub-second loads\n• **Aetherform** — real-time Web Audio + Canvas shaders\n\nOr spin up your own estimate on `/blueprint` in about a minute.",
    "Our portfolio splits into two tracks:\n\n**CS research tools** — like Chronos, which visualizes memory barrier races in distributed kernels.\n**Commercial platforms** — like Vesperal Atelier (Tokyo ceramics e-commerce at sub-second edge speeds) and Aetherform (a generative audio canvas).\n\nCase studies with architecture diagrams are in `/projects`.",
    "Depends what you want to see:\n\n• Distributed systems? → **Chronos**\n• Edge-rendered commerce? → **Vesperal Atelier**\n• Real-time audio/DSP? → **Aetherform**\n\nAll three have full write-ups under `/projects`, and `/blueprint` can estimate a build like them for you.",
  ],
  pricing: [
    "We offer transparent, fixed-bracket sprint pricing without hidden agency markup. CS capstones typically land between **$1,800–$3,400**, while commercial MVPs run **$4,200–$9,600**. The interactive estimator on `/blueprint` gives you a real number in real time.",
    "Pricing is bracketed, not hourly: capstones around $1,800–$3,400, commercial MVPs around $4,200–$9,600, depending on complexity score and sprint velocity. Feed your feature list into `/blueprint` for an instant quote.",
    "Two fixed brackets: **CS capstones $1,800–$3,400** and **commercial MVPs $4,200–$9,600**. Complexity, stack toggles, and velocity all shift the final number — the `/blueprint` tool calculates it live.",
    "No hourly billing, no surprise invoices — fixed sprint brackets only. Capstones sit in the $1,800–$3,400 band, commercial MVPs in the $4,200–$9,600 band. Want precision? The Midnight Architect at `/blueprint` prices your exact feature list.",
    "Short answer: capstones $1,800–$3,400, MVPs $4,200–$9,600.\n\nLonger answer: it depends on complexity score (1–5), stack choices (Postgres, AI gateway, WebSockets), and sprint velocity. All three are adjustable in the live calculator at `/blueprint`.",
  ],
  general: [
    "We are an independent creative engineering agency run by computer science students — bespoke web platforms, research dashboards, and capstones with sub-second execution. Want the project archive, the team, or a direct WhatsApp line?",
    "In short: four CS students building zero-template web platforms and research tools at night. Ask me about our works, our developers, or pricing — or hit WhatsApp to talk to a human engineer right now.",
    "Think of us as a nocturnal studio: no templates, no sales decks — just engineered web artifacts. Where should we go from here: portfolio, team, or scoping your own build?",
    "We build things agencies won't touch: kernel visualizers, DSP engines, edge-rendered storefronts — all from scratch, all shipped with full source ownership. What would you like to dig into?",
    "Nightbuild = a four-student collective that prototypes in 48 hours and ships zero-template web platforms. Ask me about specific builds, the team, or get a live price estimate at `/blueprint`.",
  ],
};

function classifyQuery(query: string): keyof typeof OFFLINE_REPLIES {
  const lower = query.toLowerCase();
  if (/(developer|team|who|nirmal|aakash|vidya|manoj|founder)/.test(lower)) return 'team';
  if (/(whatsapp|chat|phone|call|email|contact|reach)/.test(lower)) return 'contact';
  if (/(work|project|portfolio|capstone|chronos|vesperal|aetherform|built|build)/.test(lower)) return 'works';
  if (/(price|cost|quote|rate|pricing|budget|invest|charge)/.test(lower)) return 'pricing';
  return 'general';
}

function buildOfflineReply(query: string, usage: Record<string, number>): string {
  const topic = classifyQuery(query);
  const pool = OFFLINE_REPLIES[topic];
  // Deterministic round-robin per topic: cycle through ALL variations before any repeats
  const index = (usage[topic] ?? 0) % pool.length;
  usage[topic] = (usage[topic] ?? 0) + 1;
  let pick = pool[index];
  // If the query is completely off-topic, append a gentle steer
  const words = query.toLowerCase().split(/\s+/);
  const knownWords = [
    'platform', 'build', 'design', 'service', 'agency', 'studio', 'web', 'app', 'site',
    'developer', 'team', 'nirmal', 'aakash', 'vidya', 'manoj',
    'whatsapp', 'chat', 'phone', 'call', 'email', 'contact', 'reach',
    'work', 'project', 'portfolio', 'capstone', 'chronos', 'vesperal', 'aetherform',
    'price', 'cost', 'quote', 'rate', 'pricing', 'budget', 'invest', 'charge',
    'who', 'what', 'how', 'can', 'tell', 'more',
  ];
  const isOffTopic = !words.some((w) => knownWords.includes(w));
  if (isOffTopic) {
    pick = `${pick}\n\n(Offline mode: answering from my built-in brief — add GEMINI_API_KEY to .env.local for full conversational depth.)`;
  }
  return pick;
}

// Premium bat emblem — layered wings, sharp silhouette, theme-aware gradient fill
function BatmanBatLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 66"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="batWingGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#EAEFEA" />
          <stop offset="100%" stopColor="#B9C9BD" />
        </linearGradient>
      </defs>
      {/* Main bat silhouette with sharper wings + head tufts */}
      <path
        d="M60 8
           C57.5 16, 53.5 20.5, 47 22
           C42 16.5, 34.5 13.5, 24 12.5
           C29 20, 29.5 27.5, 25.5 34.5
           C15.5 34, 6 29, 0 21
           C2.5 38, 12 49.5, 28.5 54.5
           C24 60.5, 25 64.5, 30.5 66
           C37.5 57.5, 44.5 53, 51.5 52
           C55 54.5, 57.5 58.5, 60 63
           C62.5 58.5, 65 54.5, 68.5 52
           C75.5 53, 82.5 57.5, 89.5 66
           C95 64.5, 96 60.5, 91.5 54.5
           C108 49.5, 117.5 38, 120 21
           C114 29, 104.5 34, 94.5 34.5
           C90.5 27.5, 91 20, 96 12.5
           C85.5 13.5, 78 16.5, 73 22
           C66.5 20.5, 62.5 16, 60 8 Z"
        fill="url(#batWingGrad)"
      />
      {/* Center crest accent — subtle green core glow */}
      <path
        d="M60 30 C58.6 33.8, 56.4 36.2, 53 37.2 C56 39.2, 58 41.6, 60 44.8 C62 41.6, 64 39.2, 67 37.2 C63.6 36.2, 61.4 33.8, 60 30 Z"
        fill="#3FA35F"
        opacity="0.9"
      />
    </svg>
  );
}

// WhatsApp Vector Icon
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function FloatingAgent() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const fallbackUsageRef = useRef<Record<string, number>>({});
  const isLoadingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: "I am the Night Sentinel. Ask me anything about our client platforms, CS capstone builds, technical stack (Next.js, Supabase, Gemini), or our developers: Nirmal Kumar, Pusarla Aakash, Vidya Sagar, and Pusarla Manoj Kumar.",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isLoadingRef.current) return;
    isLoadingRef.current = true;

    const userMessage: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query.trim(),
          history: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
          variationSeed: Date.now() % 1000,
          projectContext: {
            agency: 'Nightbuild Studio',
            creators: 'Computer Science students Nirmal Kumar, Pusarla Aakash, Vidya Sagar, Pusarla Manoj Kumar',
            roles: 'Nirmal Kumar (Systems / Full-Stack), Pusarla Aakash (Creative Technologist / UI), Vidya Sagar (Backend / Platform Architecture), Pusarla Manoj Kumar (Cloud Infrastructure / Security)',
            links: 'Nirmal: linkedin.com/in/nirmal-kumar-a43a56392, Aakash: linkedin.com/in/pusarla-aakash-79b9a9392, Vidya: linkedin.com/in/vidyasagarcodes/, Manoj: linkedin.com/in/pusarla-manoj-kumar-b3454a3b3',
            email: 'nigthbulid@gmail.com',
            services: 'Bespoke commercial web platforms, CS capstones, interactive WebGL/Canvas tools, zero templates',
            whatsapp: WHATSAPP_URL,
            tool: 'The Midnight Architect (/blueprint)',
          },
        }),
      });

      const data = await res.json();
      let reply = '';

      if (data.status === 'success' && data.data?.result) {
        reply = data.data.result;
      } else {
        // Offline mode: deterministic round-robin — every answer in a topic is shown before any repeats
        reply = buildOfflineReply(query.trim(), fallbackUsageRef.current);
      }

      const agentMessage: ChatMessage = {
        id: 'agent-' + Date.now(),
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch {
      // Offline fallback on network failure too — still rotated, never repeated
      const reply = buildOfflineReply(query.trim(), fallbackUsageRef.current);
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'agent',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  // SSR-safe: render markup on the server too (chat logic activates after hydration)
  // so exported static HTML still contains the floating agent UI.
  if (!mounted && typeof window === 'undefined') {
    // Server render: emit the trigger button statically
    return (
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }} className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open Night Agent chat"
          className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group overflow-hidden"
          style={{
            background: 'radial-gradient(120% 120% at 30% 20%, #1F2A22 0%, #0B0F0C 55%, #050705 100%)',
            border: '1.5px solid rgba(63, 163, 95, 0.55)',
            boxShadow: '0 10px 34px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 24px rgba(63, 163, 95, 0.4)',
          }}
        >
          <div className="relative z-10">
            <BatmanBatLogo className="w-9 h-9 drop-shadow-[0_3px_6px_rgba(0,0,0,0.75)]" />
          </div>
        </button>
      </div>
    );
  }
  if (!mounted) return null;

  return (
    <>
      {/* ===================================================================
          FLOATING TRIGGER BUTTON (ROUND WIDGET WITH BATMAN LOGO)
          =================================================================== */}
      <div
        style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
        className="flex items-center gap-3"
      >
        {/* Nocturnal Pulse Ring */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass text-xs font-mono text-[var(--ink)] shadow-lg hairline-all pointer-events-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-ping" />
            <span>The Night Agent</span>
          </motion.div>
        )}

        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isOpen ? 'Close Night Agent chat' : 'Open Night Agent chat'}
          className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group overflow-hidden"
          style={{
            background: 'radial-gradient(120% 120% at 30% 20%, #1F2A22 0%, #0B0F0C 55%, #050705 100%)',
            border: '1.5px solid rgba(63, 163, 95, 0.55)',
            boxShadow: '0 10px 34px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 24px rgba(63, 163, 95, 0.4)',
          }}
        >
          {/* Orbiting signal ring */}
          <span
            aria-hidden="true"
            className="absolute inset-[-5px] rounded-full border border-dashed border-[var(--green)]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ animation: 'bat-orbit 9s linear infinite' }}
          />
          {/* Signal sweep glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute inset-0"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(63,163,95,0.35) 40deg, transparent 80deg)',
                animation: 'bat-sweep 2.6s linear infinite',
              }}
            />
          </div>
          {/* Ambient green bloom */}
          <div className="absolute -inset-3 rounded-full bg-[var(--green)]/25 blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 -z-10" />

          {isOpen ? (
            <X className="w-6 h-6 text-white stroke-[2.5] relative z-10" />
          ) : (
            <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
              <BatmanBatLogo className="w-9 h-9 drop-shadow-[0_3px_6px_rgba(0,0,0,0.75)]" />
            </div>
          )}
        </motion.button>
      </div>

      {/* ===================================================================
          FLOATING AI CHATBOX
          =================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', bottom: '90px', right: '24px', zIndex: 9999 }}
            className="w-[calc(100vw-2rem)] sm:w-[420px] h-[550px] max-h-[80vh] flex flex-col rounded-3xl liquid-glass shadow-2xl overflow-hidden border border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div
              className="p-4 sm:p-5 border-b border-[var(--line)] flex items-center justify-between"
              style={{
                background: 'linear-gradient(135deg, rgba(63,163,95,0.14) 0%, rgba(10,10,10,0.04) 45%, transparent 100%)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden"
                  style={{
                    background: 'radial-gradient(120% 120% at 30% 20%, #1F2A22 0%, #0B0F0C 60%, #050705 100%)',
                    border: '1px solid rgba(63,163,95,0.5)',
                    boxShadow: '0 0 14px rgba(63,163,95,0.28)',
                  }}
                >
                  <BatmanBatLogo className="w-6.5 h-6.5 w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-sm text-[var(--ink)]">
                      The Night Agent
                    </h3>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
                  </div>
                  <p className="text-[11px] text-[var(--ink-soft)]">
                    Direct AI Technologist & Team Dispatch
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Quick Connect in Header */}
              <div className="flex items-center gap-1.5">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 text-xs font-semibold hairline-all transition-all duration-200 hover:scale-105"
                  title="Connect directly on WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-emerald-400" />
                  <span className="text-[11px]">WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs font-sans">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[var(--green)] text-white font-medium rounded-tr-sm shadow-md'
                        : 'bg-[var(--surface)] text-[var(--ink)] hairline-all rounded-tl-sm shadow-inner'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[var(--ink-soft)] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-[var(--surface)] hairline-all text-[var(--ink-soft)] text-xs w-fit">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--green)]" />
                  <span>Synthesizing answer...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 py-2 border-t border-[var(--line)] bg-[var(--surface)]/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-3 py-1 rounded-full bg-[var(--bg)] hover:bg-[var(--surface)] text-[11px] text-[var(--ink-soft)] hover:text-[var(--ink)] hairline-all transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 border-t border-[var(--line)] bg-[var(--bg)]/90">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about developers, projects, or WhatsApp..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-[var(--surface)] hairline-all text-xs text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none focus:border-[var(--green)] transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className="p-2.5 rounded-full bg-[var(--green)] text-white hover:opacity-90 disabled:opacity-40 transition-all shadow-md shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Footer WhatsApp Banner */}
              <div className="mt-2 pt-2 border-t border-[var(--line)]/50 flex items-center justify-between text-[10px] text-[var(--ink-soft)]">
                <span>Direct dev dispatch active</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
