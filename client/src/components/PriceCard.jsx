import { HiOutlineBadgeCheck, HiOutlineLocationMarker, HiOutlineClock, HiOutlineTrendingUp, HiOutlineTrendingDown } from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';

const CROP_CONFIG = {
  Onion:  { emoji: '🧅', gradient: 'from-purple-50 to-fuchsia-50 dark:from-purple-950/40 dark:to-fuchsia-950/30', ring: 'ring-purple-100 dark:ring-purple-800/40' },
  Tomato: { emoji: '🍅', gradient: 'from-red-50 to-orange-50 dark:from-red-950/40 dark:to-orange-950/30', ring: 'ring-red-100 dark:ring-red-800/40' },
  Potato: { emoji: '🥔', gradient: 'from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/30', ring: 'ring-amber-100 dark:ring-amber-800/40' },
  Rice:   { emoji: '🌾', gradient: 'from-lime-50 to-green-50 dark:from-lime-950/40 dark:to-green-950/30', ring: 'ring-lime-100 dark:ring-lime-800/40' },
  Wheat:  { emoji: '🌿', gradient: 'from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-amber-950/30', ring: 'ring-orange-100 dark:ring-orange-800/40' },
};

function timeAgo(dateStr, justNowLabel) {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60) return justNowLabel;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function PriceCard({ report, index = 0 }) {
  const { t } = useLanguage();
  const { crop_id: crop, mandi_id: mandi, reported_price, quantity, has_receipt, timestamp } = report;
  const baseline = crop?.baseline_price || 0;
  const diff = baseline > 0 ? ((reported_price - baseline) / baseline) * 100 : 0;
  const isAbove = diff > 0;
  const config = CROP_CONFIG[crop?.name] || CROP_CONFIG.Potato;

  return (
    <div
      className="fade-in glass glow-border card-shine hover-lift rounded-2xl p-5 group cursor-default"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${config.gradient} ring-1 ${config.ring} flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
            {config.emoji}
          </div>
          <div>
            <h3 className="font-bold text-themed text-[15px] leading-tight">{crop?.name}</h3>
            <div className="flex items-center gap-1 text-themed-muted text-xs mt-0.5">
              <HiOutlineLocationMarker className="w-3 h-3 shrink-0" />
              <span className="truncate max-w-[140px]">{mandi?.name}</span>
            </div>
          </div>
        </div>
        {has_receipt && (
          <div className="badge-shine flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20 border border-amber-200/60 dark:border-amber-700/40 shadow-sm shadow-amber-100/50 dark:shadow-none">
            <HiOutlineBadgeCheck className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{t('verifiedBadge')}</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[28px] font-black text-themed tracking-tight">₹{reported_price.toLocaleString()}</span>
          <span className="text-xs text-themed-muted font-semibold">{t('perQuintal')}</span>
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold ${
            isAbove
              ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400'
          }`}>
            {isAbove ? <HiOutlineTrendingUp className="w-3.5 h-3.5" /> : <HiOutlineTrendingDown className="w-3.5 h-3.5" />}
            <span>{isAbove ? '+' : ''}{diff.toFixed(1)}%</span>
          </div>
          <span className="text-[11px] text-themed-muted font-medium">{t('vsOfficial')} ₹{baseline.toLocaleString()} {t('officialLabel')}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t divider-themed">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-themed-faint"></span>
          <span className="text-xs text-themed-secondary font-semibold">{quantity} {t('quintals')}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-themed-muted font-medium">
          <HiOutlineClock className="w-3 h-3" />
          <span>{timeAgo(timestamp, t('justNow'))}</span>
        </div>
      </div>
    </div>
  );
}
