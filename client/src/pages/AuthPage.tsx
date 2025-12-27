                                                                                          import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const res = await axios.post(`http://localhost:5000${endpoint}`, form);
      
      if (isLogin) {
        localStorage.setItem('eco-token', res.data.token);
        localStorage.setItem('eco-user', res.data.name);
        window.location.href = '/dashboard';
      } else {
        setIsLogin(true);
        alert('Signup successful! Please login.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-focus-bg dark:bg-focus-dark">
      <div className="w-full max-w-md deep-card p-10 bg-white dark:bg-focus-surfacedark">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-focus-accent rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
             <ShieldCheck className="text-white w-8 h-8" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-center mb-2 tracking-tight">
          EcoStudy <span className="text-focus-accent text-lg align-top uppercase">AI</span>
        </h1>
        <p className="text-center text-sm opacity-50 mb-10">
          {isLogin ? 'Sign in to your Study Lab' : 'Create your student account'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-focus-surface dark:bg-black/20 border border-focus-border dark:border-focus-borderdark focus:outline-none focus:ring-2 focus:ring-focus-accent/50 transition-all"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-focus-surface dark:bg-black/20 border border-focus-border dark:border-focus-borderdark focus:outline-none focus:ring-2 focus:ring-focus-accent/50 transition-all"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-focus-surface dark:bg-black/20 border border-focus-border dark:border-focus-borderdark focus:outline-none focus:ring-2 focus:ring-focus-accent/50 transition-all"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              required
            />
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-pulse-subtle"
              >
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                   <Lock size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-red-500 text-[10px] uppercase font-black tracking-widest leading-none mb-1">Access Denied</p>
                  <p className="text-red-500/80 text-xs font-bold leading-tight">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button className="w-full py-4 bg-focus-accent text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20 active:scale-[0.98]">
            {isLogin ? 'Login' : 'Create Account'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-focus-accent hover:underline decoration-2 underline-offset-4"
          >
            {isLogin ? 'New here? Join the Lab' : 'Already a student? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
