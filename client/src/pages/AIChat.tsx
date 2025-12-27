import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { User, Bot, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  _id?: string;
  question: string;
  answer: string;
  createdAt: string;
};

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('eco-token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const q = input;
    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('eco-token');
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, { question: q }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(prev => [...prev, { question: q, answer: res.data.answer, createdAt: new Date().toISOString() }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col max-w-5xl mx-auto">
      <div className="flex-1 overflow-y-auto pr-4 space-y-8 pb-10">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg._id || i} className="space-y-6">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="flex gap-4 max-w-[80%] flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-focus-accent flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-white" />
                  </div>
                  <div className="deep-card p-5 bg-focus-surface dark:bg-black/20 rounded-tr-none">
                    <p className="text-sm font-medium">{msg.question}</p>
                  </div>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="flex gap-4 max-w-[90%]">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-focus-borderdark border border-focus-border dark:border-focus-borderdark flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-focus-accent" />
                  </div>
                  <div className="deep-card p-6 bg-white dark:bg-focus-surfacedark rounded-tl-none border-focus-accent/20">
                    <div className="text-sm leading-relaxed opacity-90 prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/10 prose-pre:p-4 prose-pre:rounded-xl">
                      <ReactMarkdown>{msg.answer}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-focus-borderdark border border-focus-border dark:border-focus-borderdark flex items-center justify-center animate-pulse">
                 <Sparkles size={14} className="text-focus-accent" />
              </div>
              <div className="flex items-center gap-3">
                 <Loader2 size={16} className="animate-spin opacity-40" />
                 <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Gemini 1.5 is thinking...</span>
              </div>
            </div>
          )}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      <div className="mt-6">
        <div className="deep-card p-2 bg-white dark:bg-focus-surfacedark flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Discuss Oligopoly concepts with your AI Tutor..."
            className="flex-1 bg-transparent px-6 py-4 focus:outline-none text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-8 bg-focus-accent text-white rounded-2xl font-bold hover:bg-teal-600 transition-all disabled:opacity-20 active:scale-95"
          >
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
