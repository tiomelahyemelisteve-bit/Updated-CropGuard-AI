interface ConfidenceGaugeProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ConfidenceGauge({ value, size = 'md' }: ConfidenceGaugeProps) {
  const dims = {
    sm: { w: 80, h: 80, label: 'text-sm' },
    md: { w: 120, h: 120, label: 'text-2xl' },
    lg: { w: 160, h: 160, label: 'text-3xl' },
  }[size];

  const radius = dims.w / 2 - 8;
  const circumference = Math.PI * radius;
  const progress = Math.min(100, Math.max(0, value));
  const dashOffset = circumference - (progress / 100) * circumference;

  const color =
    value >= 80
      ? '#34d399'
      : value >= 60
        ? '#fbbf24'
        : '#f87171';

  return (
    <div className="relative flex items-center justify-center" style={{ width: dims.w, height: dims.h }}>
      <svg width={dims.w} height={dims.h} className="transform rotate-0">
        <path
          d={describeArc(dims.w / 2, dims.h / 2, radius, 180, 360)}
          fill="none"
          stroke="#1c472b"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d={describeArc(dims.w / 2, dims.h / 2, radius, 180, 360)}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`font-display font-extrabold ${dims.label} text-white`}>
          {value}%
        </span>
        <span className="text-[10px] uppercase tracking-widest text-forest-400">
          Confidence
        </span>
      </div>
    </div>
  );
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}
