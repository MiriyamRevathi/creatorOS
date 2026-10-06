import React, { useState } from 'react';

export default function PieChart({ data = [], nameKey = 'label', valueKey = 'value', size = 220 }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data available</div>;
  }

  const palette = ['#412653', '#3F567F', '#D174D2', '#E0563F', '#6366F1', '#10B981'];
  const total = data.reduce((acc, curr) => acc + (Number(curr[valueKey]) || 0), 0);

  let cumulativeAngle = 0;
  const radius = size / 2 - 10;
  const center = size / 2;

  const slices = data.map((item, idx) => {
    const val = Number(item[valueKey]) || 0;
    const percentage = total > 0 ? (val / total) * 100 : 0;
    const angle = total > 0 ? (val / total) * 360 : 0;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    const x1 = center + radius * Math.cos((Math.PI * (startAngle - 90)) / 180);
    const y1 = center + radius * Math.sin((Math.PI * (startAngle - 90)) / 180);
    const x2 = center + radius * Math.cos((Math.PI * (endAngle - 90)) / 180);
    const y2 = center + radius * Math.sin((Math.PI * (endAngle - 90)) / 180);

    const largeArc = angle > 180 ? 1 : 0;
    const pathD = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return {
      pathD,
      color: palette[idx % palette.length],
      item,
      percentage: percentage.toFixed(1),
      idx
    };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map((slice) => (
            <path
              key={slice.idx}
              d={slice.pathD}
              fill={slice.color}
              opacity={hoveredIdx === null || hoveredIdx === slice.idx ? 1 : 0.6}
              onMouseEnter={() => setHoveredIdx(slice.idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer transition-opacity duration-200"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          ))}
          {/* Inner cutout for donut aesthetic */}
          <circle cx={center} cy={center} r={radius * 0.55} fill="#FFFFFF" />
        </svg>
      </div>

      <div className="space-y-2 text-xs">
        {slices.map((slice) => (
          <div
            key={slice.idx}
            onMouseEnter={() => setHoveredIdx(slice.idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`flex items-center gap-2.5 p-1.5 rounded cursor-pointer transition-colors ${
              hoveredIdx === slice.idx ? 'bg-gray-100 font-semibold' : ''
            }`}
          >
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: slice.color }} />
            <span className="text-gray-700">{slice.item[nameKey]}</span>
            <span className="font-bold text-gray-900 ml-auto">{slice.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
