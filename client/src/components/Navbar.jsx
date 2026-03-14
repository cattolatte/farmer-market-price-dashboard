import { HiOutlineScale, HiOutlinePlusCircle, HiOutlineTranslate } from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onOpenForm }) {
  const { t, toggleLang } = useLanguage();
  const { dark, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 float">
              <HiOutlineScale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                <span className="gradient-text">Mandi</span><span className="text-themed">Share</span>
              </h1>
              <p className="text-[10px] text-themed-muted -mt-0.5 font-semibold tracking-widest uppercase">
                {t('brandTagline')}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title={dark ? t('lightMode') : t('darkMode')}
            >
              <span className="theme-toggle-knob">
                {dark ? '🌙' : '☀️'}
              </span>
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="btn-press flex items-center gap-1.5 px-3 py-2 rounded-xl glass text-xs font-bold text-themed-secondary hover:text-themed transition-all cursor-pointer"
              title="Switch language"
            >
              <HiOutlineTranslate className="w-4 h-4" />
              <span className="hidden sm:inline">{t('language')}</span>
            </button>

            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-glow"></span>
              <span className="text-xs font-bold text-emerald-500 tracking-wide">{t('live')}</span>
            </div>

            {/* Report Price button */}
            <button
              onClick={onOpenForm}
              className="btn-press flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-emerald-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <HiOutlinePlusCircle className="w-5 h-5" />
              <span className="hidden sm:inline">{t('reportPrice')}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
