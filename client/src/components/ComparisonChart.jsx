import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  baseline: '#94a3b8',
  reported: '#059669'
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-2xl p-4 shadow-xl !border-gray-100" style={{ minWidth: 180 }}>
      <p className="text-sm font-extrabold text-gray-900 mb-2">{label}</p>
      {payload.map((entry, i) => {
        const isBaseline = entry.dataKey === 'Official Baseline';
        return (
          <div key={i} className="flex items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md shadow-sm" style={{ background: entry.color }} />
              <span className="text-xs text-gray-500 font-medium">{isBaseline ? 'Official' : 'Crowdsourced'}</span>
            </div>
            <span className="text-sm font-bold text-gray-900">₹{entry.value?.toLocaleString()}</span>
          </div>
        );
      })}
      {payload.length === 2 && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Difference</span>
            <span className={`text-xs font-bold ${payload[1].value >= payload[0].value ? 'text-emerald-600' : 'text-red-500'}`}>
              {payload[1].value >= payload[0].value ? '+' : ''}
              {((payload[1].value - payload[0].value) / payload[0].value * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparisonChart({ reports, crops }) {
  const cropMap = {};
  crops.forEach(c => {
    cropMap[c._id] = { name: c.name, baseline: c.baseline_price, total: 0, count: 0 };
  });

  reports.forEach(r => {
    const id = r.crop_id?._id;
    if (cropMap[id]) {
      cropMap[id].total += r.reported_price;
      cropMap[id].count += 1;
    }
  });

  const data = Object.values(cropMap)
    .filter(c => c.count > 0)
    .map(c => ({
      name: c.name,
      'Official Baseline': c.baseline,
      'Crowd Average': Math.round(c.total / c.count)
    }));

  if (!data.length) return null;

  return (
    <div className="glass rounded-2xl p-6 fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">Price Comparison</h2>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">Official APMC baseline vs crowdsourced farmer average</p>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md shadow-sm" style={{ background: COLORS.baseline }} />
            <span className="text-xs text-gray-500 font-semibold">Official</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md shadow-sm" style={{ background: COLORS.reported }} />
            <span className="text-xs text-gray-500 font-semibold">Crowdsourced</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={6} barCategoryGap="20%">
          <defs>
            <linearGradient id="gradientGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity={1} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="gradientGray" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity={1} />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13, fontWeight: 700, fill: '#475569' }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
            tickFormatter={(v) => `₹${v.toLocaleString()}`}
            width={72}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)', radius: 12 }} />
          <Bar dataKey="Official Baseline" fill="url(#gradientGray)" radius={[10, 10, 0, 0]} maxBarSize={52} />
          <Bar dataKey="Crowd Average" fill="url(#gradientGreen)" radius={[10, 10, 0, 0]} maxBarSize={52} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
