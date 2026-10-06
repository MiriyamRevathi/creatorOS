import React from 'react';
import PieChart from '../../components/charts/PieChart';
import BarChart from '../../components/charts/BarChart';
import Heatmap from '../../components/charts/Heatmap';

export function AudienceAnalytics({ data }) {
  if (!data || !data.full_demographics) return null;

  const demo = data.full_demographics;

  const ageData = (demo.age_groups || []).map(a => ({
    label: a.range,
    value: a.percentage
  }));

  const genderData = (demo.gender_distribution || []).map(g => ({
    label: g.gender,
    value: g.percentage
  }));

  const countryData = (demo.top_countries || []).map(c => ({
    label: c.country,
    value: c.followers
  }));

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
        <h2 className="font-bold text-brand-purple text-xl">Audience Demographics & Behavior</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Top Geographic Audience</span>
            <div className="text-lg font-bold text-brand-purple mt-1">{data.top_country?.country} ({data.top_country?.percentage}%)</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Primary Age Bracket</span>
            <div className="text-lg font-bold text-brand-purple mt-1">{data.primary_age_group?.range} Years ({data.primary_age_group?.percentage}%)</div>
          </div>
          <div className="bg-brand-muted p-4 rounded-lg">
            <span className="text-xs text-gray-500 font-medium">Peak Activity Window</span>
            <div className="text-lg font-bold text-brand-coral mt-1">{data.peak_active_hour?.hour} UTC</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
          <h3 className="font-bold text-brand-purple text-base">Age Distribution (%)</h3>
          <BarChart data={ageData} xKey="label" yKey="value" color="#412653" label="Age %" />
        </div>

        <div className="bg-white p-6 rounded-xl border border-brand-border space-y-4">
          <h3 className="font-bold text-brand-purple text-base">Gender Split</h3>
          <PieChart data={genderData} nameKey="label" valueKey="value" size={200} />
        </div>
      </div>

      {/* Country Breakdown & Active Hours Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-brand-border space-y-4">
          <h3 className="font-bold text-brand-purple text-base">Top Geographic Regions</h3>
          <div className="space-y-3">
            {(demo.top_countries || []).map((c, i) => (
              <div key={i} className="flex justify-between items-center text-xs border-b border-gray-100 pb-2">
                <span className="font-medium text-gray-800">{c.country}</span>
                <div className="text-right">
                  <div className="font-bold text-brand-purple">{c.followers.toLocaleString()} followers</div>
                  <div className="text-[10px] text-gray-500">{c.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-brand-border space-y-4">
          <div>
            <h3 className="font-bold text-brand-purple text-base">Audience Peak Active Hours</h3>
            <p className="text-xs text-gray-500">Optimal publishing hours based on viewer activity index</p>
          </div>
          <Heatmap data={demo.peak_active_hours || []} />
        </div>
      </div>
    </div>
  );
}

export default AudienceAnalytics;
