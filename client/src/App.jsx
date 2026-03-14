import { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import PriceFeed from './components/PriceFeed';
import FilterBar from './components/FilterBar';
import ComparisonChart from './components/ComparisonChart';
import ReportForm from './components/ReportForm';
import { fetchCrops, fetchMandis, fetchReports } from './api';
import { useLanguage } from './i18n/LanguageContext';
import { useTheme } from './context/ThemeContext';
import { HiOutlineTrendingUp, HiOutlineBadgeCheck, HiOutlineCollection, HiOutlineOfficeBuilding } from 'react-icons/hi';

function App() {
  const { t } = useLanguage();
  const { dark } = useTheme();
  const [reports, setReports] = useState([]);
  const [crops, setCrops] = useState([]);
  const [mandis, setMandis] = useState([]);
  const [filters, setFilters] = useState({ crop_id: '', mandi_id: '' });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadReports = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.crop_id) params.crop_id = filters.crop_id;
      if (filters.mandi_id) params.mandi_id = filters.mandi_id;
      const data = await fetchReports(params);
      setReports(data);
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    Promise.all([fetchCrops(), fetchMandis()])
      .then(([cropsData, mandisData]) => {
        setCrops(cropsData);
        setMandis(mandisData);
      })
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  useEffect(() => {
    document.body.style.overflow = showForm ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showForm]);

  const verifiedCount = reports.filter(r => r.has_receipt).length;

  return (
    <div className="min-h-screen pb-12 relative">
      {/* Floating orbs background */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: 600,
            padding: '12px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            background: dark ? '#1e293b' : '#ffffff',
            color: dark ? '#f1f5f9' : '#111827',
            border: dark ? '1px solid #334155' : '1px solid #e5e7eb',
          }
        }}
      />

      <Navbar onOpenForm={() => setShowForm(true)} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 stagger">
          <StatCard label={t('totalReports')} value={reports.length} icon={<HiOutlineCollection className="w-5 h-5" />} gradient="from-blue-500 to-indigo-600" delay={0} />
          <StatCard label={t('verified')} value={verifiedCount} icon={<HiOutlineBadgeCheck className="w-5 h-5" />} gradient="from-emerald-500 to-teal-600" delay={1} />
          <StatCard label={t('cropsTracked')} value={crops.length} icon={<HiOutlineTrendingUp className="w-5 h-5" />} gradient="from-amber-500 to-orange-600" delay={2} />
          <StatCard label={t('activeMandis')} value={mandis.length} icon={<HiOutlineOfficeBuilding className="w-5 h-5" />} gradient="from-purple-500 to-pink-600" delay={3} />
        </div>

        {/* Chart */}
        <ComparisonChart reports={reports} crops={crops} />

        {/* Feed Section */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-themed">{t('recentReports')}</h2>
              <p className="text-xs text-themed-muted font-medium mt-0.5">
                {reports.length} {t('reportsFrom')}
              </p>
            </div>
            <FilterBar crops={crops} mandis={mandis} filters={filters} onFilterChange={setFilters} />
          </div>
          <PriceFeed reports={reports} loading={loading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-6 text-center">
            <p className="text-sm font-bold text-themed-secondary">{t('footerTagline')}</p>
            <p className="text-xs text-themed-muted mt-1">{t('footerPowered')}</p>
          </div>
        </div>
      </footer>

      {showForm && (
        <ReportForm
          crops={crops}
          mandis={mandis}
          onClose={() => setShowForm(false)}
          onSuccess={loadReports}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, icon, gradient, delay = 0 }) {
  return (
    <div
      className="fade-in glass glow-border card-shine hover-lift rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 cursor-default"
      style={{ animationDelay: `${delay * 80}ms` }}
    >
      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-black text-themed tracking-tight number-pop">{value}</p>
        <p className="text-[11px] sm:text-xs text-themed-muted font-semibold tracking-wide">{label}</p>
      </div>
    </div>
  );
}

export default App;
