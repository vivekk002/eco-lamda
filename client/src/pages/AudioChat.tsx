                                                                                                                                                                                                                                                                                                                            import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, User, Bot, Loader2, Waves, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

type Transcript = {
  question: string;
  answer: string;
  createdAt: string;
};

const AudioChat: React.FC = () => {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHistory();                                                                                     
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.onresult = (e: any) => handleVoiceInput(e.results[0][0].transcript);
      recognitionRef.current.onend = () => setIsListening(false);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts, isLoading]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('eco-token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/chat/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTranscripts(res.data.filter((c: any) => c.type === 'audio').reverse());
    } catch (err) { console.error(err); }
  };

  const handleVoiceInput = async (text: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('eco-token');
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, { question: text, type: 'audio' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const answer = res.data.answer;
      setTranscripts(prev => [...prev, { question: text, answer, createdAt: new Date().toISOString() }]);
      speak(answer);
    } catch (err) { console.error(err); }
    finally { setIsLoading(false); }
  };

  const toggleListening = () => {
    if (isListening) recognitionRef.current.stop();
    else {
      stopSpeaking();
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col max-w-4xl mx-auto">
      {/* Visual Overlay */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-6">
        <AnimatePresence>
          {transcripts.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="deep-card p-4 bg-focus-surface dark:bg-black/10 border-dashed">
               <div className="flex gap-4 items-start border-b border-focus-border dark:border-focus-borderdark pb-3 mb-3">
                  <User size={14} className="opacity-40" />
                  <p className="text-xs font-bold italic opacity-60">Guest: "{t.question}"</p>
               </div>
               <div className="flex gap-4 items-start">
                  <Bot size={14} className="text-focus-accent" />
                  <p className="text-sm leading-relaxed opacity-80">{t.answer}</p>
               </div>
            </motion.div>
          ))}
          {isLoading && <Loader2 size={16} className="animate-spin mx-auto opacity-20" />}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      <div className="deep-card p-12 bg-white dark:bg-focus-surfacedark flex flex-col items-center justify-center border-2 border-dashed border-focus-accent/30 relative">
        {isSpeaking && (
          <button 
            onClick={stopSpeaking}
            className="absolute top-4 right-4 p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all group flex items-center gap-2"
          >
            <VolumeX size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden group-hover:block">Stop AI Audio</span>
          </button>
        )}

        <div className="mb-8 relative">
           {(isListening || isSpeaking) && (
             <motion.div 
               animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className={`absolute inset-0 rounded-full -z-10 ${isSpeaking ? 'bg-orange-500' : 'bg-focus-accent'}`}
             />
           )}
           <button 
             onClick={toggleListening}
             className={`w-28 h-28 rounded-full flex items-center justify-center transition-all shadow-2xl ${
               isListening ? 'bg-red-500 text-white' : 'bg-focus-accent text-white hover:scale-105'
             }`}
           >
             {isListening ? <MicOff size={32} /> : <Mic size={32} />}
           </button>
        </div>

        <div className="text-center">
           <h3 className="text-xl font-black mb-2">
             {isListening ? 'Listening to you...' : isSpeaking ? 'AI is responding...' : 'Click to start conversation'}
           </h3>
           <div className="flex items-center gap-2 justify-center opacity-40">
              <Waves size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Two-Way Voice Dialogue</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AudioChat;
