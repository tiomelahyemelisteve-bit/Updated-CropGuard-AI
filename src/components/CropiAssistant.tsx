import { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles, Leaf, MessageCircle } from 'lucide-react';
import type { ChatMessage } from '@/types';
import { findResponse } from '@/lib/cropiKnowledge';

function makeId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function CropiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedFollowUps, setSuggestedFollowUps] = useState<string[]>([
    'What can you do?',
    'How do I analyze a leaf?',
    'What crops do you support?',
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: "Hi! I'm Cropi, your CropGuard AI assistant. I can answer questions about crop diseases, pest identification, nutrient deficiencies, environmental stress, and guide you through leaf analysis. How can I help you today?",
        timestamp: Date.now(),
      };
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  function handleSend(text?: string) {
    const message = (text ?? input).trim();
    if (!message) return;

    const userMsg: ChatMessage = {
      id: makeId(),
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setSuggestedFollowUps([]);

    setTimeout(() => {
      const { response, followUp } = findResponse(message);
      const aiMsg: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      if (followUp) setSuggestedFollowUps(followUp);
    }, 700 + Math.random() * 500);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open Cropi assistant"
      >
        <div className="absolute inset-0 rounded-2xl bg-natural-500/40 blur-lg group-hover:blur-xl transition-all animate-pulse" />
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-natural-400 to-natural-600 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-accent-500 border-2 border-forest-950 flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">AI</span>
        </div>
        <div className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg glass whitespace-nowrap text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with Cropi
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 animate-fade-in-up">
      <div className="card overflow-hidden flex flex-col" style={{ maxHeight: '70vh', height: '70vh' }}>
        <div className="flex items-center justify-between p-4 border-b border-forest-700/50 bg-forest-900/80">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-natural-400 to-natural-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success-500 border-2 border-forest-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-white text-sm">Cropi</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-natural-500/20 text-natural-300 font-medium">AI</span>
              </div>
              <p className="text-[11px] text-forest-400">CropGuard AI Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-forest-800 flex items-center justify-center text-forest-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-natural-400 to-natural-600 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-natural-500/20 text-white rounded-tr-sm'
                    : 'bg-forest-800/60 text-forest-100 rounded-tl-sm border border-forest-700/30'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start animate-fade-in">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-natural-400 to-natural-600 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="px-4 py-3 rounded-xl bg-forest-800/60 border border-forest-700/30 rounded-tl-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-natural-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-natural-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-natural-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {!isTyping && suggestedFollowUps.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 animate-fade-in">
              {suggestedFollowUps.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-forest-800/60 border border-forest-700/40 text-natural-300 hover:bg-natural-500/15 hover:border-natural-600/40 transition-all"
                >
                  <MessageCircle className="w-3 h-3" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-forest-700/50 bg-forest-900/60">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Cropi anything..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-forest-950 border border-forest-700/50 text-sm text-white placeholder-forest-500 focus:outline-none focus:border-natural-500 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-natural-400 to-natural-600 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-glow transition-all active:scale-95 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-forest-600 mt-2 text-center flex items-center justify-center gap-1">
            <Leaf className="w-2.5 h-2.5" />
            Cropi provides general guidance -- not certified agricultural advice
          </p>
        </div>
      </div>
    </div>
  );
}
