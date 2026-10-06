import React from 'react';

export default function Heatmap({ data = [] }) {
  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No heatmap data</div>;
  }

  const getColor = (val) => {
    if (val > 80) return 'bg-brand-purple text-white';
    if (val > 60) return 'bg-brand-slate text-white';
    if (val > 40) return 'bg-brand-lavender text-white';
    if (val > 20) return 'bg-purple-100 text-purple-900';
    return 'bg-gray-100 text-gray-400';
  };

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="min-w-[480px]">
        <div className="grid grid-cols-8 gap-2 text-center text-xs">
          {data.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                className={`w-full py-4 rounded-md font-semibold text-xs transition-transform transform hover:scale-105 cursor-pointer shadow-sm ${getColor(
                  item.activity_index || item.value
                )}`}
              >
                {item.activity_index || item.value}
              </div>
              <span className="text-[10px] text-gray-500 mt-1.5 font-medium">{item.hour || item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
