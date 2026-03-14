import PriceCard from './PriceCard';
import { HiOutlineInbox } from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';

export default function PriceFeed({ reports, loading }) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass rounded-2xl p-5 fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl shimmer" />
              <div className="flex-1">
                <div className="h-4 w-20 shimmer rounded-lg mb-1.5" />
                <div className="h-3 w-28 shimmer rounded-lg" />
              </div>
            </div>
            <div className="h-8 w-28 shimmer rounded-lg mb-2" />
            <div className="h-4 w-36 shimmer rounded-lg mb-4" />
            <div className="pt-3 border-t divider-themed">
              <div className="h-3 w-full shimmer rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!reports.length) {
    return (
      <div className="glass rounded-2xl p-16 text-center scale-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center">
          <HiOutlineInbox className="w-8 h-8 text-themed-faint" />
        </div>
        <p className="text-themed-secondary font-bold text-lg">{t('noReports')}</p>
        <p className="text-themed-muted text-sm mt-1.5 max-w-xs mx-auto">{t('noReportsHint')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reports.map((report, i) => (
        <PriceCard key={report._id} report={report} index={i} />
      ))}
    </div>
  );
}
