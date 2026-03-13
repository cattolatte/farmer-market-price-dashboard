import { HiOutlineFilter, HiOutlineX } from 'react-icons/hi';

export default function FilterBar({ crops, mandis, filters, onFilterChange }) {
  const hasFilters = filters.crop_id || filters.mandi_id;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 text-gray-400 mr-1">
        <HiOutlineFilter className="w-3.5 h-3.5" />
        <span className="text-xs font-bold uppercase tracking-wide hidden sm:inline">Filter</span>
      </div>

      <select
        value={filters.crop_id}
        onChange={(e) => onFilterChange({ ...filters, crop_id: e.target.value })}
        className="px-3 py-2 rounded-xl bg-white/80 border border-gray-200/60 text-xs sm:text-sm text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all cursor-pointer hover:border-gray-300"
      >
        <option value="">All Crops</option>
        {crops.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <select
        value={filters.mandi_id}
        onChange={(e) => onFilterChange({ ...filters, mandi_id: e.target.value })}
        className="px-3 py-2 rounded-xl bg-white/80 border border-gray-200/60 text-xs sm:text-sm text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all cursor-pointer hover:border-gray-300"
      >
        <option value="">All Mandis</option>
        {mandis.map(m => (
          <option key={m._id} value={m._id}>{m.name}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={() => onFilterChange({ crop_id: '', mandi_id: '' })}
          className="btn-press flex items-center gap-1 px-2.5 py-2 rounded-xl bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition-all cursor-pointer"
        >
          <HiOutlineX className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  );
}
