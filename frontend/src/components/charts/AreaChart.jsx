import React, { useState } from 'react';

export default function AreaChart({ data = [], xKey = 'label', yKey = 'value', height = 240, color = '#D174D2', label = 'Metric' }) {
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

  const lineD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${lineD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path d={areaD} fill="url(#areaGradient)" />

        {/* Line stroke */}
        <path d={lineD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Nodes */}
        {points.map((p) => (
          <g key={p.idx} onMouseEnter={() => setHoveredIdx(p.idx)} onMouseLeave={() => setHoveredIdx(null)}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hoveredIdx === p.idx ? "6" : "3.5"}
              fill={hoveredIdx === p.idx ? "#E0563F" : color}
              stroke="#FFFFFF"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
            />
            <text x={p.x} y={height - 12} textAnchor="middle" fontSize="11" fill="#64748B">
              {p.item[xKey]}
            </text>
          </g>
        ))}
      </svg>

      {hoveredIdx !== null && (
        <div
          className="absolute bg-brand-purple text-white text-xs py-1 px-3 rounded shadow pointer-events-none z-10 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(points[hoveredIdx].x / width) * 100}%`,
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
