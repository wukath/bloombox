import { useState } from 'react';
import { TEMPLATES, ERASER_COLOR } from '../data/flowerTemplates';
import styles from './ColoringCanvas.module.css';

const CX = 50;
const CY = 34;
const OUTLINE = '#6b4c36';
const STROKE_W = 1.4;
const UNFILLED = '#fdf6ee';

export default function ColoringCanvas({
  templateId = 'daisy',
  colors = {},
  selectedColor = null,
  onColor = null,
  size = 200,
}) {
  const [hovered, setHovered] = useState(null);
  const template = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];
  const interactive = !!onColor;

  const regionFill = (id) => {
    if (interactive && hovered === id && selectedColor) return selectedColor;
    return colors[id] ?? template.defaultColors?.[id] ?? UNFILLED;
  };

  const click = (id) => {
    if (interactive && selectedColor) onColor(id, selectedColor);
  };

  const hover = (id) => interactive && selectedColor && setHovered(id);
  const leave = () => setHovered(null);

  const angles = Array.from(
    { length: template.petalCount },
    (_, i) => (360 / template.petalCount) * i
  );

  const stemPath = template.stem === 'curved'
    ? `M${CX},${CY + 12} Q${CX + 10},65 ${CX},95`
    : `M${CX},${CY + 12} L${CX},95`;

  const leafMidY = 68;
  const leafR = `M${CX},${leafMidY} Q${CX+13},${leafMidY-11} ${CX+7},${leafMidY+10} Q${CX},${leafMidY+4} ${CX},${leafMidY}Z`;
  const leafL = `M${CX},${leafMidY-8} Q${CX-13},${leafMidY-19} ${CX-7},${leafMidY+2} Q${CX},${leafMidY-4} ${CX},${leafMidY-8}Z`;

  const regionProps = (id) => ({
    onClick: () => click(id),
    onMouseEnter: () => hover(id),
    onMouseLeave: leave,
    className: interactive
      ? `${styles.region} ${hovered === id ? styles.hovered : ''} ${selectedColor ? styles.paintMode : ''}`
      : '',
    style: { cursor: interactive && selectedColor ? 'crosshair' : 'default' },
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* stem */}
      <path
        d={stemPath}
        stroke={regionFill('stem') === UNFILLED ? OUTLINE : regionFill('stem')}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        {...regionProps('stem')}
        style={{ cursor: interactive && selectedColor ? 'crosshair' : 'default' }}
      />

      {/* leaves */}
      {template.leaves !== 'none' && (
        <path
          d={leafR}
          fill={regionFill('leaf_0')}
          stroke={OUTLINE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
          {...regionProps('leaf_0')}
        />
      )}
      {template.leaves === 'pair' && (
        <path
          d={leafL}
          fill={regionFill('leaf_1')}
          stroke={OUTLINE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
          {...regionProps('leaf_1')}
        />
      )}

      {/* petals */}
      {angles.map((angle, i) => {
        const id = `petal_${i}`;
        return (
          <g key={i} transform={`rotate(${angle}, ${CX}, ${CY})`}>
            <path
              d={template.petalPath}
              fill={regionFill(id)}
              stroke={OUTLINE}
              strokeWidth={STROKE_W}
              strokeLinejoin="round"
              transform={`translate(${CX}, ${CY - template.petalOffset})`}
              {...regionProps(id)}
            />
          </g>
        );
      })}

      {/* center */}
      <circle
        cx={CX}
        cy={CY}
        r={template.centerR}
        fill={regionFill('center')}
        stroke={OUTLINE}
        strokeWidth={STROKE_W}
        {...regionProps('center')}
      />
      {/* center inner dot for detail */}
      <circle
        cx={CX}
        cy={CY}
        r={template.centerR * 0.45}
        fill={regionFill('center')}
        stroke={OUTLINE}
        strokeWidth={0.7}
        opacity={0.6}
        style={{ pointerEvents: 'none' }}
      />
    </svg>
  );
}
