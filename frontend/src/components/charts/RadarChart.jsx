import React from 'react';

export default function RadarChart({ data = [], keyName = 'axis', valName = 'value', size = 260 }) {
  if (!data || data.length < 3) {
    return <div className="h-48 flex items-center justify-center text-gray-400 text-sm">Requires at least 3 axes</div>;
  }

  const center = size / 2;
  const radius = size / 2 - 35;
  const numAxes = data.length;
  const angleStep = (Math.PI * 2) / numAxes;

  const maxVal = Math.max(...data.map(d => Number(d[valName]) || 0), 100);

  // Axis lines & Polygon points
  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (Number(d[valName]) / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    const labelX = center + (radius + 20) * Math.cos(angle);
    const labelY = center + (radius + 20) * Math.sin(angle);
    return { x, y, labelX, labelY, item: d };
  });

  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="flex justify-center items-center py-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Concentric rings */}
        {[0.25, 0.5, 0.75, 1].map((rRatio, idx) => (
          <circle
            key={idx}
            cx={center}
            cy={center}
            r={radius * rRatio}
            fill="none"
            stroke="#E2E8F0"
            strokeDasharray="3 3"
          />
        ))}

        {/* Spokes */}
        {points.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(i * angleStep - Math.PI / 2)}
            y2={center + radius * Math.sin(i * angleStep - Math.PI / 2)}
            stroke="#CBD5E1"
          />
        ))}

        {/* Radar Polygon */}
        <path d={polygonPath} fill="#D174D2" fillOpacity="0.3" stroke="#412653" strokeWidth="2.5" />

        {/* Radar Nodes & Labels */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#E0563F" stroke="#FFFFFF" strokeWidth="1.5" />
            <text
              x={p.labelX}
              y={p.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fontWeight="600"
              fill="#3F567F"
            >
              {p.item[keyName]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
