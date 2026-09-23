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

// Clean, iconic Batman Bat Silhouette SVG
function BatmanBatLogo({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 10 C46 18, 43 21, 37 22 C33 17, 27 15, 19 14 C23 21, 23 27, 20 33 C12 33, 4 29, 0 22 C2 36, 10 45, 24 49 C20 55, 21 59, 26 60 C32 53, 38 49, 44 48 C47 50, 48 53, 50 56 C52 53, 53 50, 56 48 C62 49, 68 53, 74 60 C79 59, 80 55, 76 49 C90 45, 98 36, 100 22 C96 29, 88 33, 80 33 C77 27, 77 21, 81 14 C73 15, 67 17, 63 22 C57 21, 54 18, 50 10 Z" />
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
    if (!query.trim() || isLoading) return;

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
        // High quality intelligent response based on keywords
        const lower = query.toLowerCase();
        if (lower.includes('developer') || lower.includes('team') || lower.includes('who') || lower.includes('nirmal') || lower.includes('aakash') || lower.includes('vidya') || lower.includes('manoj')) {
          reply = "Nightbuild Studio is founded by a collective of four passionate computer science students:\n\n• **Nirmal Kumar**: Systems & Full-Stack Engineer (Next.js App Router, edge services, API integration)\n• **Pusarla Aakash**: Creative Technologist (tactile UI choreography, motion systems, and front-end craft)\n• **Vidya Sagar**: Backend & Platform Engineer (cloud architectures, database schemas, and distributed workflows)\n• **Pusarla Manoj Kumar**: Cloud Infrastructure & Security Lead (cloud security, edge networking, DevOps, and CI/CD pipelines)\n\nYou can connect directly with each of them on LinkedIn via the Studio page!";
        } else if (lower.includes('whatsapp') || lower.includes('chat') || lower.includes('phone') || lower.includes('call')) {
          reply = "Yes! You can connect with our developers directly on WhatsApp for real-time discussions, project questions, or quick scoping. Click the WhatsApp button in the top corner of this chat, or open WhatsApp directly!";
        } else if (lower.includes('work') || lower.includes('project') || lower.includes('portfolio') || lower.includes('capstone')) {
          reply = "We craft both commercial platforms and landmark CS capstones with zero templates:\n\n1. **Chronos**: Distributed Kernel Visualizer for memory barrier races and Paxos consensus.\n2. **Vesperal Atelier**: Bespoke dynamic showcase with Apple-grade fluid typography and sub-second edge rendering.\n3. **Aetherform**: Web Audio DSP synthesis engine with zero-jank Canvas shaders.\n\nCheck out the full archive under `/projects` or calculate your custom build on `/blueprint`!";
        } else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote') || lower.includes('rate')) {
          reply = "We offer transparent, fixed-bracket sprint pricing in INR without hidden agency markup. CS capstones typically range between ₹8,000–₹18,000 (delivered in ~4–7 days), while commercial MVPs range between ₹35,000–₹1,40,000. Try our interactive estimator on `/blueprint` for a real-time calculation in INR!";
        } else {
          reply = "We are an independent creative engineering agency run by computer science students. We design and build bespoke web platforms, research dashboards, and capstones with sub-second execution. Would you like to explore our works, meet our team, or connect directly on WhatsApp?";
        }
      }

      const agentMessage: ChatMessage = {
        id: 'agent-' + Date.now(),
        sender: 'agent',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'agent',
          text: "I am currently running in offline mode. Feel free to reach out to our team directly on WhatsApp or submit an inquiry on the Contact page!",
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
          className="relative w-14 h-14 rounded-full flex items-center justify-center bg-black text-white shadow-2xl border-2 border-[var(--green)]/60 hover:border-[var(--green)] transition-all duration-300 group overflow-hidden"
          style={{
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(63, 163, 95, 0.35)',
          }}
        >
          {/* Subtle Ambient Night Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--green)]/20 via-transparent to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />

          {isOpen ? (
            <X className="w-6 h-6 text-white stroke-[2.5]" />
          ) : (
            <div className="flex flex-col items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <BatmanBatLogo className="w-8 h-8 text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
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
            <div className="p-4 sm:p-5 border-b border-[var(--line)] flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-white border border-[var(--green)]/40 shadow-inner">
                  <BatmanBatLogo className="w-6 h-6 text-white" />
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
