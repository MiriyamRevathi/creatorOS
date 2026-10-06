import React from 'react';
import LineChart from '../../components/charts/LineChart';

export function TrendHistory({ data }) {
  const safeData = Array.isArray(data) ? data : (data?.history || []);

  if (!safeData || safeData.length === 0) {
    return (
      <div className="p-8 bg-white rounded-xl border border-brand-border text-center text-gray-500 text-sm">
        No historical trend cycle data available.
      </div>
    );
  }

  const lineData = safeData.map(item => {
    const weekStr = item?.week || 'W0';
    return {
      label: weekStr.includes(' ') ? weekStr.split(' ')[0] : weekStr,
      value: item?.ai_interest || 0
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-brand-border space-y-2">
        <h3 className="font-bold text-brand-purple text-xl">Historical Trend Cycles & Seasonality</h3>
        <p className="text-xs text-gray-500">Track interest volume shifts across categories over consecutive weeks</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
        <h4 className="font-bold text-brand-purple text-base">Category Interest Velocity (8 Weeks)</h4>
        <LineChart data={lineData} xKey="label" yKey="value" color="#412653" label="AI Interest Index" />
      </div>

      <div className="bg-white rounded-xl border border-brand-border overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-brand-muted text-brand-purple uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">Time Period</th>
              <th className="px-4 py-3">AI & Machine Learning</th>
              <th className="px-4 py-3">UI/UX & Design</th>
              <th className="px-4 py-3">Creator Finance</th>
              <th className="px-4 py-3">Web Development</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {safeData.map((row, idx) => (
              <tr key={idx} className="hover:bg-purple-50/50 transition-colors">
                <td className="px-6 py-3.5 font-bold text-brand-purple">{row?.week || 'N/A'}</td>
                <td className="px-4 py-3.5 font-semibold text-emerald-600">{row?.ai_interest || 0} / 100</td>
                <td className="px-4 py-3.5 text-gray-700">{row?.design_interest || 0} / 100</td>
                <td className="px-4 py-3.5 text-gray-700">{row?.finance_interest || 0} / 100</td>
                <td className="px-4 py-3.5 text-brand-slate font-medium">{row?.dev_interest || 0} / 100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrendHistory;
