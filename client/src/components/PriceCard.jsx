import { HiOutlineBadgeCheck, HiOutlineLocationMarker, HiOutlineClock, HiOutlineTrendingUp, HiOutlineTrendingDown } from 'react-icons/hi';

const CROP_CONFIG = {
  Onion:  { emoji: '🧅', gradient: 'from-purple-50 to-fuchsia-50', ring: 'ring-purple-100' },
  Tomato: { emoji: '🍅', gradient: 'from-red-50 to-orange-50', ring: 'ring-red-100' },
  Potato: { emoji: '🥔', gradient: 'from-amber-50 to-yellow-50', ring: 'ring-amber-100' },
};

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function PriceCard({ report, index = 0 }) {
  const { crop_id: crop, mandi_id: mandi, reported_price, quantity, has_receipt, timestamp } = report;
  const baseline = crop?.baseline_price || 0;
  const diff = baseline > 0 ? ((reported_price - baseline) / baseline) * 100 : 0;
  const isAbove = diff > 0;
  const config = CROP_CONFIG[crop?.name] || CROP_CONFIG.Potato;

  return (
    <div
      className="fade-in glass glow-border rounded-2xl p-5 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 group cursor-default"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${config.gradient} ring-1 ${config.ring} flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
            {config.emoji}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-[15px] leading-tight">{crop?.name}</h3>
            <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
              <HiOutlineLocationMarker className="w-3 h-3 shrink-0" />
              <span className="truncate max-w-[140px]">{mandi?.name}</span>
            </div>
          </div>
        </div>
        {has_receipt && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 shadow-sm shadow-amber-100/50">
            <HiOutlineBadgeCheck className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider">Verified</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[28px] font-black text-gray-900 tracking-tight">₹{reported_price.toLocaleString()}</span>
          <span className="text-xs text-gray-400 font-semibold">/qtl</span>
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold ${
            isAbove ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
          }`}>
            {isAbove ? <HiOutlineTrendingUp className="w-3.5 h-3.5" /> : <HiOutlineTrendingDown className="w-3.5 h-3.5" />}
            <span>{isAbove ? '+' : ''}{diff.toFixed(1)}%</span>
          </div>
          <span className="text-[11px] text-gray-400 font-medium">vs ₹{baseline.toLocaleString()} official</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100/80">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span className="text-xs text-gray-500 font-semibold">{quantity} quintals</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
          <HiOutlineClock className="w-3 h-3" />
          <span>{timeAgo(timestamp)}</span>
        </div>
      </div>
    </div>
  );
}
