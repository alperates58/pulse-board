import React from 'react';
import { Activity, Plus, Sun, Moon, Database, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenNewModal: () => void;
  onOpenDataModal: () => void;
  totalTransactionsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewModal,
  onOpenDataModal,
  totalTransactionsCount,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/25 flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-slate-950/20 rounded-[6px] sm:rounded-[10px] flex items-center justify-center">
                <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-white stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <h1 className="text-base sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent tracking-tight">
                  PulseBoard
                </h1>
                <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  Lite
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Modern Finansal Analitik ve Gelir-Gider Takibi
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Quick stats indicator badge */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{totalTransactionsCount} Kayıt</span>
            </div>

            {/* Data Management Modal Trigger */}
            <button
              id="btn-data-management"
              onClick={onOpenDataModal}
              title="Veri İçe/Dışa Aktar ve Yedekle"
              className="p-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Database className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline">Veri Yönetimi</span>
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Açık Temaya Geç' : 'Karanlık Temaya Geç'}
              className="p-1.5 sm:p-2.5 rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Tema Değiştir"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* New Transaction Button */}
            <button
              id="btn-new-transaction"
              onClick={onOpenNewModal}
              className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md shadow-indigo-500/25 flex items-center space-x-1 transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Yeni Kayıt</span>
              <span className="sm:hidden">Kayıt</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
