import { PETAL_SHAPES, STEM_STYLES } from '../data/flowerParts';

export default function FlowerSVG({ config, size = 200, animate = false }) {
  const {
    petalShape = 'round',
    petalCount = 6,
    petalColor = '#f4a7b9',
    centerColor = '#f9e07a',
    stemStyle = 'straight',
    stemColor = '#7ab87a',
    leafStyle = 'simple',
  } = config;

  const shape = PETAL_SHAPES.find(p => p.id === petalShape) || PETAL_SHAPES[0];
  const cx = size / 2;
  const cy = size / 2 - 20;
  const petalOffset = 28;
  const angles = Array.from({ length: petalCount }, (_, i) => (360 / petalCount) * i);

  const stemPath = (() => {
    const bx = cx, by = cy + 18;
    const ex = cx, ey = size - 10;
    if (stemStyle === 'curved') return `M${bx},${by} Q${bx + 18},${(by + ey) / 2} ${ex},${ey}`;
    if (stemStyle === 'wiggly') return `M${bx},${by} C${bx - 14},${by + 30} ${bx + 14},${by + 60} ${bx},${by + 90}`;
    return `M${bx},${by} L${ex},${ey}`;
  })();

  const leaves = (() => {
    if (leafStyle === 'none') return null;
    const midY = cy + (size - 10 - cy) / 2;
    const leaf = `M${cx},${midY} Q${cx + 22},${midY - 18} ${cx + 10},${midY + 16} Q${cx},${midY + 8} ${cx},${midY}Z`;
    if (leafStyle === 'pair') {
      const leaf2 = `M${cx},${midY - 14} Q${cx - 22},${midY - 32} ${cx - 10},${midY + 2} Q${cx},${midY - 6} ${cx},${midY - 14}Z`;
      return <><path d={leaf} fill={stemColor} opacity="0.9" /><path d={leaf2} fill={stemColor} opacity="0.9" /></>;
    }
    return <path d={leaf} fill={stemColor} opacity="0.9" />;
  })();

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* stem */}
      <path d={stemPath} stroke={stemColor} strokeWidth="4" fill="none" strokeLinecap="round" />
      {leaves}

      {/* petals */}
      <g>
        {angles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const tx = cx + Math.sin(rad) * petalOffset;
          const ty = cy - Math.cos(rad) * petalOffset;
          return (
            <path
              key={i}
              d={shape.path}
              fill={petalColor}
              opacity="0.92"
              transform={`translate(${tx},${ty}) rotate(${angle})`}
              style={animate ? { transformOrigin: `${tx}px ${ty}px`, animation: `petalWiggle 3s ease-in-out ${i * 0.15}s infinite alternate` } : {}}
            />
          );
        })}
      </g>

      {/* center */}
      <circle cx={cx} cy={cy} r={12} fill={centerColor} />
      <circle cx={cx} cy={cy} r={6} fill={centerColor} opacity="0.6" />

      {animate && (
        <style>{`
          @keyframes petalWiggle {
            from { transform: rotate(0deg) scale(1); }
            to { transform: rotate(4deg) scale(1.04); }
          }
        `}</style>
      )}
    </svg>
  );
}
