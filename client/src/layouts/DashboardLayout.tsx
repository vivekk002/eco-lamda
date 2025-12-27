import React, { useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, MessageSquare, Mic, Lightbulb, UserCircle } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const userName = localStorage.getItem('eco-user') || 'Student';

  useEffect(() => {
    if (!localStorage.getItem('eco-token')) {
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('eco-token');
    localStorage.removeItem('eco-user');
    navigate('/auth');
  };

  const navItems = [
    { name: 'AI Chat', path: '/dashboard/chat', icon: <MessageSquare size={18}/> },
    { name: 'Audio Chat', path: '/dashboard/audio', icon: <Mic size={18}/> },
    { name: 'Summary & Tips', path: '/dashboard/tips', icon: <Lightbulb size={18}/> }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-focus-bg dark:bg-focus-dark transition-colors duration-300">
      {/* Header */}
      <header className="h-20 bg-white dark:bg-focus-surfacedark border-b border-focus-border dark:border-focus-borderdark px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-10">
          <Link to="/dashboard" className="flex items-center gap-2 group">
             <div className="w-8 h-8 bg-focus-accent rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">E</span>
             </div>
             <h1 className="text-xl font-black tracking-tight group-hover:text-focus-accent transition-colors">EcoStudy</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  location.pathname === item.path 
                  ? 'bg-focus-accent text-white shadow-lg shadow-teal-500/20' 
                  : 'hover:bg-focus-surface dark:hover:bg-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={toggleTheme}
             className="w-10 h-10 rounded-xl bg-focus-surface dark:bg-white/5 border border-focus-border dark:border-focus-borderdark flex items-center justify-center hover:scale-105 transition-all"
           >
             {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
           </button>

           <div className="h-8 w-[1px] bg-focus-border dark:bg-focus-borderdark mx-2"></div>

           <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                 <p className="text-xs font-black uppercase">{userName}</p>
                 <button onClick={handleLogout} className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-1">
                    <LogOut size={10} /> Logout
                 </button>
              </div>
              <UserCircle size={32} className="opacity-20" />
           </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
