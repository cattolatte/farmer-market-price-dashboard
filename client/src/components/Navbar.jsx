import { HiOutlineScale, HiOutlinePlusCircle } from 'react-icons/hi';

export default function Navbar({ onOpenForm }) {
  return (
    <nav className="sticky top-0 z-50 glass-strong shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 float">
              <HiOutlineScale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                <span className="gradient-text">Mandi</span><span className="text-gray-900">Share</span>
              </h1>
              <p className="text-[10px] text-gray-400 -mt-0.5 font-semibold tracking-widest uppercase">
                Price Transparency
              </p>
            </div>
          </div>

          {/* Live indicator + Submit button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/60">
              <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-glow"></span>
              <span className="text-xs font-bold text-emerald-700 tracking-wide">LIVE</span>
            </div>
            <button
              onClick={onOpenForm}
              className="btn-press flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-emerald-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <HiOutlinePlusCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Report Price</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
