import React, { useState } from 'react';

export default function LineChart({ data = [], xKey = 'label', yKey = 'value', height = 240, color = '#412653', label = 'Metric' }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data available</div>;
  }

  const values = data.map(d => Number(d[yKey]) || 0);
  const maxVal = Math.max(...values, 1);
  const minVal = Math.min(...values, 0);
  const range = maxVal - minVal || 1;

  const width = 600;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const points = data.map((item, idx) => {
    const x = padding + (idx / Math.max(data.length - 1, 1)) * graphWidth;
    const y = height - padding - ((item[yKey] - minVal) / range) * graphHeight;
    return { x, y, item, idx };
  });

  const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Background Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = height - padding - ratio * graphHeight;
          const valLabel = Math.round(minVal + ratio * range);
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#F1F5F9" strokeDasharray="4 4" />
              <text x={padding - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#94A3B8">
                {valLabel.toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* Line path */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {points.map((p) => (
          <g key={p.idx} onMouseEnter={() => setHoveredIdx(p.idx)} onMouseLeave={() => setHoveredIdx(null)}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hoveredIdx === p.idx ? "6" : "4"}
              fill={hoveredIdx === p.idx ? "#E0563F" : color}
              stroke="#FFFFFF"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
            />
            {/* X Axis Labels */}
            <text x={p.x} y={height - 12} textAnchor="middle" fontSize="11" fill="#64748B">
              {p.item[xKey]}
            </text>
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredIdx !== null && (
        <div
          className="absolute bg-brand-purple text-white text-xs py-1.5 px-3 rounded shadow-lg pointer-events-none z-10 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${((points[hoveredIdx].x) / width) * 100}%`,
            top: `${(points[hoveredIdx].y / height) * 100 - 8}%`
          }}
        >
          <div className="font-semibold">{points[hoveredIdx].item[xKey]}</div>
          <div className="text-brand-lavender">{label}: {points[hoveredIdx].item[yKey].toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}

// Chart Components Version 1.0.0
