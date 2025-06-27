
import React from 'react';

const PoolLayoutView = ({ className = "" }: { className?: string }) => {
  const cx = 160, cy = 160;
  const arcs = [
    { start: 210, end: 330, radius: 120, count: 16, color: "#b3dafe" },
    { start: 330, end: 390, radius: 120, count: 8, color: "#7ec3f7" },
    { start: 390, end: 510, radius: 120, count: 16, color: "#4fa3e3" },
    { start: 510, end: 570, radius: 120, count: 8, color: "#7ec3f7" },
    { start: 210, end: 330, radius: 90, count: 14, color: "#b3dafe" },
    { start: 330, end: 390, radius: 90, count: 7, color: "#7ec3f7" },
    { start: 390, end: 510, radius: 90, count: 14, color: "#4fa3e3" },
    { start: 510, end: 570, radius: 90, count: 7, color: "#7ec3f7" },
    { start: 210, end: 330, radius: 60, count: 12, color: "#b3dafe" },
    { start: 330, end: 390, radius: 60, count: 6, color: "#7ec3f7" },
    { start: 390, end: 510, radius: 60, count: 12, color: "#4fa3e3" },
    { start: 510, end: 570, radius: 60, count: 6, color: "#7ec3f7" },
  ];

  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <svg width={450} height={450}>
        <path
          d={`
            M ${cx - 35},${cy}
            Q ${cx - 40},${cy - 28} ${cx},${cy - 32}
            Q ${cx + 50},${cy - 28} ${cx + 28},${cy}
            Q ${cx + 40},${cy + 28} ${cx},${cy + 30}
            Q ${cx - 40},${cy + 28} ${cx - 35},${cy}
            Z
          `}
          fill="#b3e0fc"
          opacity={0.7}
        />
        <text x={cx} y={cy} textAnchor="middle" dy="0.3em" fontSize={20} fill="#223">Pool</text>
        {arcs.map((arc, i) => {
          const dots = [];
          const step = (arc.end - arc.start) / (arc.count - 1);
          for (let j = 0; j < arc.count; j++) {
            const angle = arc.start + j * step;
            const { x, y } = polarToCartesian(cx, cy, arc.radius, angle);
            dots.push(
              <circle key={`${i}-${j}`} cx={x} cy={y} r={6} fill={arc.color} opacity={0.9} />
            );
          }
          return dots;
        })}
        <text x={cx-100} y={cy - 110} textAnchor="middle" fontSize={14} fill="#A7CCF1">Sun Area</text>
        <text x={cx + 70} y={cy - 110} textAnchor="start" fontSize={14} fill="#A7CCF1">VIP Poolside</text>
        <text x={cx - 80} y={cy + 120} textAnchor="end" fontSize={14} fill="#A7CCF1">Family Area</text>
        <text x={cx + 100} y={cy + 120} textAnchor="start" fontSize={14} fill="#A7CCF1">Pool</text>
      </svg>
    </div>
  );
};

export default PoolLayoutView;
