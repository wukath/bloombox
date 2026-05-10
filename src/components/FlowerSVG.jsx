import { PETAL_SHAPES } from '../data/flowerParts';

// All coordinates are in a fixed 100×100 viewBox.
// Flower head center: (50, 32). Stem runs from (50, 42) → (50, 95).
const CX = 50;
const CY = 32;
const PETAL_OFFSET = 16; // distance from flower center to petal center

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
  const angles = Array.from({ length: petalCount }, (_, i) => (360 / petalCount) * i);

  const stemPath = (() => {
    if (stemStyle === 'curved')  return `M${CX},42 Q${CX + 10},65 ${CX},95`;
    if (stemStyle === 'wiggly')  return `M${CX},42 C${CX - 8},55 ${CX + 8},68 ${CX},81 C${CX - 8},88 ${CX + 4},92 ${CX},95`;
    return `M${CX},42 L${CX},95`;
  })();

  const leafMidY = 68;
  const leaves = (() => {
    if (leafStyle === 'none') return null;
    const r = `M${CX},${leafMidY} Q${CX + 12},${leafMidY - 10} ${CX + 6},${leafMidY + 9} Q${CX},${leafMidY + 4} ${CX},${leafMidY}Z`;
    if (leafStyle === 'pair') {
      const l = `M${CX},${leafMidY - 8} Q${CX - 12},${leafMidY - 18} ${CX - 6},${leafMidY + 1} Q${CX},${leafMidY - 4} ${CX},${leafMidY - 8}Z`;
      return <><path d={r} fill={stemColor} opacity="0.9" /><path d={l} fill={stemColor} opacity="0.9" /></>;
    }
    return <path d={r} fill={stemColor} opacity="0.9" />;
  })();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <path d={stemPath} stroke={stemColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {leaves}

      {/* Petals: each petal path is centered at (0,0), translated to (CX, CY-PETAL_OFFSET),
          then the whole group is rotated around the flower center (CX, CY). */}
      {angles.map((angle, i) => (
        <g key={i} transform={`rotate(${angle}, ${CX}, ${CY})`}>
          <path
            d={shape.path}
            fill={petalColor}
            stroke={petalColor}
            strokeWidth="0.5"
            opacity="0.95"
            transform={`translate(${CX}, ${CY - PETAL_OFFSET})`}
            style={animate ? {
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: `petalPulse 3s ease-in-out ${i * 0.2}s infinite alternate`,
            } : {}}
          />
        </g>
      ))}

      <circle cx={CX} cy={CY} r={7} fill={centerColor} />
      <circle cx={CX} cy={CY} r={3.5} fill={centerColor} opacity="0.5" />

      {animate && (
        <style>{`
          @keyframes petalPulse {
            from { transform: scale(1); }
            to   { transform: scale(1.08); }
          }
        `}</style>
      )}
    </svg>
  );
}
