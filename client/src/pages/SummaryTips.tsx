import React, { useEffect, useState } from 'react';
import { Play, Sparkles, Wand2, TrendingUp, Table, Calculator, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Tip {
  id: number;
  title: string;
  type: 'graph' | 'matrix' | 'formula';
  concept: string;
  caption: string;
  duration: string;
  videoUrl?: string;
  startTime?: number;
  data?: any;
  formula?: string;
  details?: string;
}

const SummaryTips: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingTipId, setPlayingTipId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const token = localStorage.getItem('eco-token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tips`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTips(res.data);
      } catch (err) {
        console.error('Failed to fetch tips:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTips();
  }, []);

  if (loading) return <div className="p-10 text-center uppercase font-black opacity-20 animate-pulse">Analyzing Visual Data...</div>;

  return (
    <div className="max-w-6xl mx-auto py-6">
      <header className="mb-12">
        <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">
          Exam <span className="text-focus-accent">Insights</span>
        </h2>
        <div className="flex items-center gap-2 opacity-50">
           <Wand2 size={14} />
           <p className="text-xs font-bold uppercase tracking-widest leading-none">Visual concepts extracted from source</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {tips.map((tip, i) => (
          <motion.div 
            key={tip.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="deep-card overflow-hidden border-2 border-transparent hover:border-focus-accent transition-all flex flex-col"
          >
            {/* Visual Section */}
            <div className="p-1 bg-focus-surface dark:bg-black/20">
              <div className="aspect-[16/10] dark:bg-black/40 rounded-2xl overflow-hidden relative flex items-center justify-center border border-focus-border dark:border-focus-borderdark">
                <AnimatePresence mode="wait">
                  {playingTipId === tip.id ? (
                    <motion.div 
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full relative"
                    >
                      <button 
                        onClick={(e) => { e.stopPropagation(); setPlayingTipId(null); }}
                        className="absolute top-2 right-2 z-30 p-1.5 bg-black/60 hover:bg-black text-white rounded-lg transition-all"
                      >
                        <X size={14} />
                      </button>
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`${tip.videoUrl}?start=${tip.startTime}&autoplay=1`} 
                        title="Video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="visual"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {tip.type === 'graph' && <KinkedDemandGraph />}
                      {tip.type === 'matrix' && <PayoffMatrix data={tip.data} />}
                      {tip.type === 'formula' && <FormulaView formula={tip.formula || ''} details={tip.details || ''} />}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="absolute top-4 right-4 z-20">
                   <span className="bg-black/50 backdrop-blur-md text-[8px] font-black uppercase px-2 py-1 rounded-full text-white tracking-widest flex items-center gap-1">
                      <Sparkles size={8} className="text-focus-accent" /> Concept Visualizer
                   </span>
                </div>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
               <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-black uppercase leading-tight tracking-tight">{tip.title}</h4>
                    <span className="text-[10px] font-bold text-focus-accent uppercase tracking-widest">{tip.concept}</span>
                  </div>
                  <div className="p-3 bg-focus-surface dark:bg-white/5 rounded-2xl">
                     {tip.type === 'graph' && <TrendingUp size={20} className="text-orange-500" />}
                     {tip.type === 'matrix' && <Table size={20} className="text-blue-500" />}
                     {tip.type === 'formula' && <Calculator size={20} className="text-emerald-500" />}
                  </div>
               </div>
               
               <p className="text-sm leading-relaxed opacity-70 font-medium mb-8">
                  {tip.caption}
               </p>

               <div className="mt-auto flex items-center justify-between pt-6 border-t border-focus-border dark:border-focus-borderdark">
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black opacity-30 flex items-center gap-1">
                        CONTENT DURATION: <span className="opacity-100 text-focus-accent">{tip.duration}</span>
                     </span>
                  </div>
                  <button 
                    onClick={() => tip.videoUrl && setPlayingTipId(tip.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-focus-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-teal-500/20"
                  >
                     <Play size={10} fill="currentColor" /> {playingTipId === tip.id ? 'Playing...' : 'Play Reference'}
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const KinkedDemandGraph = () => (
  <div className="w-full h-full p-8 flex items-center justify-center">
    <svg viewBox="0 0 200 150" className="w-full h-full max-w-xs drop-shadow-xl">
      {/* Axes */}
      <line x1="20" y1="130" x2="180" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <line x1="20" y1="130" x2="20" y2="20" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <text x="5" y="25" fontSize="8" className="font-bold opacity-30">P</text>
      <text x="175" y="145" fontSize="8" className="font-bold opacity-30">Q</text>
      
      {/* Demand Curve */}
      <motion.path 
        d="M 40 40 L 100 80 L 120 120" 
        fill="none" 
        stroke="#10b981" 
        strokeWidth="3" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      {/* Elastic Label */}
      <text x="45" y="55" fontSize="6" className="font-bold text-focus-accent fill-current">ELASTIC (Flat)</text>
      {/* Inelastic Label */}
      <text x="110" y="105" fontSize="6" className="font-bold text-focus-accent fill-current">INELASTIC (Steep)</text>
      
      {/* Equilibrium Point */}
      <circle cx="100" cy="80" r="4" fill="#10b981" className="animate-pulse" />
      <text x="105" y="78" fontSize="6" className="font-black italic">P* / Q*</text>
    </svg>
  </div>
);

const PayoffMatrix = ({ data }: { data: any }) => (
  <div className="w-full h-full p-6 flex flex-col items-center justify-center">
    <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
      <div className="col-span-1"></div>
      <div className="col-span-2 text-center text-[10px] font-black uppercase tracking-widest text-focus-accent pb-2">{data.firmB}</div>
      
      <div className="flex items-center justify-center [writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-widest text-focus-accent rotate-180">{data.firmA}</div>
      <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-2">
        {data.cells.map((cell: any, i: number) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-1 ${
              i === 3 ? 'bg-focus-accent/10 border-focus-accent/30' : 'bg-focus-surface dark:bg-white/5 border-focus-border dark:border-focus-borderdark'
            }`}
          >
            <div className="text-[7px] font-bold opacity-40 uppercase truncate w-full text-center">{cell.a} | {cell.b}</div>
            <div className="flex gap-2">
              <span className="text-xs font-black">{cell.valA}</span>
              <span className="text-[10px] opacity-20">/</span>
              <span className="text-xs font-black text-focus-accent">{cell.valB}</span>
            </div>
            {i === 3 && <div className="text-[6px] font-black text-focus-accent uppercase">Nash Equil.</div>}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const FormulaView = ({ formula, details }: { formula: string, details: string }) => (
  <div className="w-full h-full p-8 flex flex-col items-center justify-center">
    <motion.div 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl text-center shadow-2xl shadow-emerald-500/5"
    >
      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4 block">Concentration Ratio (CR)</span>
      <div className="text-4xl font-black mb-4 tracking-tighter text-emerald-500">{formula}</div>
      <p className="text-[10px] font-bold opacity-50 uppercase tracking-tight">{details}</p>
    </motion.div>
  </div>
);

export default SummaryTips;
