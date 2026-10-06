import React, { useState } from 'react';

export default function BarChart({ data = [], xKey = 'label', yKey = 'value', height = 240, color = '#3F567F', label = 'Value' }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data available</div>;
  }

  const values = data.map(d => Number(d[yKey]) || 0);
  const maxVal = Math.max(...values, 1);

  const width = 600;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  const barWidth = Math.max(12, (graphWidth / data.length) * 0.55);

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Horizontal grid */}
        {[0, 0.5, 1].map((ratio, i) => {
          const y = height - padding - ratio * graphHeight;
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#F1F5F9" strokeDasharray="4 4" />
              <text x={padding - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#94A3B8">
                {Math.round(ratio * maxVal).toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((item, idx) => {
          const val = Number(item[yKey]) || 0;
          const barHeight = (val / maxVal) * graphHeight;
          const x = padding + (idx / data.length) * graphWidth + (graphWidth / data.length - barWidth) / 2;
          const y = height - padding - barHeight;
          const isHovered = hoveredIdx === idx;

          return (
            <g key={idx} onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barHeight, 2)}
                rx="4"
                fill={isHovered ? "#E0563F" : color}
                className="transition-colors duration-200 cursor-pointer"
              />
              <text x={x + barWidth / 2} y={height - 12} textAnchor="middle" fontSize="11" fill="#64748B">
                {item[xKey]}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredIdx !== null && (
        <div
          className="absolute bg-brand-purple text-white text-xs py-1 px-2.5 rounded shadow pointer-events-none z-10 transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${((padding + (hoveredIdx / data.length) * graphWidth + (graphWidth / data.length) / 2) / width) * 100}%`,
            top: '20%'
          }}
        >
          <div className="font-semibold">{data[hoveredIdx][xKey]}</div>
          <div className="text-brand-lavender">{label}: {data[hoveredIdx][yKey].toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}
