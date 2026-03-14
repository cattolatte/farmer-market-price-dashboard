import { HiOutlineFilter, HiOutlineX } from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';

export default function FilterBar({ crops, mandis, filters, onFilterChange }) {
  const { t } = useLanguage();
  const hasFilters = filters.crop_id || filters.mandi_id;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 text-themed-muted mr-1">
        <HiOutlineFilter className="w-3.5 h-3.5" />
        <span className="text-xs font-bold uppercase tracking-wide hidden sm:inline">{t('filter')}</span>
      </div>

      <select
        value={filters.crop_id}
        onChange={(e) => onFilterChange({ ...filters, crop_id: e.target.value })}
        className="px-3 py-2 rounded-xl glass text-xs sm:text-sm text-themed font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all cursor-pointer"
      >
        <option value="">{t('allCrops')}</option>
        {crops.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <select
        value={filters.mandi_id}
        onChange={(e) => onFilterChange({ ...filters, mandi_id: e.target.value })}
        className="px-3 py-2 rounded-xl glass text-xs sm:text-sm text-themed font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all cursor-pointer"
      >
        <option value="">{t('allMandis')}</option>
        {mandis.map(m => (
          <option key={m._id} value={m._id}>{m.name}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={() => onFilterChange({ crop_id: '', mandi_id: '' })}
          className="btn-press flex items-center gap-1 px-2.5 py-2 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all cursor-pointer"
        >
          <HiOutlineX className="w-3.5 h-3.5" />
          {t('clear')}
        </button>
      )}
    </div>
  );
}
