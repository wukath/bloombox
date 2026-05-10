// Petal paths are in a local coordinate system centered at (0,0).
// They should fit within roughly ±10 x ±14 units.
// The FlowerSVG renders these in a viewBox="0 0 100 100" space,
// placing each petal's center at (50, 50 - PETAL_OFFSET) then rotating around (50, 50).
export const PETAL_SHAPES = [
  {
    id: 'round',
    label: 'Round',
    emoji: '🌸',
    path: 'M0,-12 C5,-12 9,-7 9,0 C9,7 5,12 0,12 C-5,12 -9,7 -9,0 C-9,-7 -5,-12 0,-12Z',
  },
  {
    id: 'pointy',
    label: 'Pointy',
    emoji: '✨',
    path: 'M0,-14 C3,-9 7,-4 7,0 C7,4 3,9 0,14 C-3,9 -7,4 -7,0 C-7,-4 -3,-9 0,-14Z',
  },
  {
    id: 'heart',
    label: 'Heart',
    emoji: '💗',
    path: 'M0,11 C-1,8 -10,3 -10,-3 C-10,-8 -6,-11 0,-7 C6,-11 10,-8 10,-3 C10,3 1,8 0,11Z',
  },
  {
    id: 'tulip',
    label: 'Tulip',
    emoji: '🌷',
    path: 'M0,-13 C2,-13 7,-9 8,-4 C9,2 5,10 0,12 C-5,10 -9,2 -8,-4 C-7,-9 -2,-13 0,-13Z',
  },
  {
    id: 'frilly',
    label: 'Frilly',
    emoji: '🌼',
    path: 'M0,-13 C2,-10 5,-12 4,-8 C8,-9 9,-5 7,-3 C10,-1 9,4 6,5 C7,8 4,11 2,10 C2,13 0,14 0,14 C0,14 -2,13 -2,10 C-4,11 -7,8 -6,5 C-9,4 -10,-1 -7,-3 C-9,-5 -8,-9 -4,-8 C-5,-12 -2,-10 0,-13Z',
  },
];

export const PETAL_COUNTS = [5, 6, 7, 8];

export const STEM_STYLES = [
  { id: 'straight', label: 'Straight' },
  { id: 'curved', label: 'Curved' },
  { id: 'wiggly', label: 'Wiggly' },
];

export const LEAF_STYLES = [
  { id: 'none', label: 'None' },
  { id: 'simple', label: 'Simple' },
  { id: 'pair', label: 'Pair' },
];

export const PETAL_COLORS = [
  '#f4a7b9', '#f4c7d0', '#e8a0d0', '#c9b8e8',
  '#a8c8f0', '#b8e0d4', '#f4d49a', '#f4a97a',
  '#ffffff', '#ffe0f0', '#d4f0e0', '#ffd4a0',
];

export const CENTER_COLORS = [
  '#f9e07a', '#f4c04a', '#f4a97a', '#e8c8a0',
  '#ffffff', '#f4d4b8', '#c8e8a0', '#f0b8d0',
];

export const STEM_COLORS = [
  '#7ab87a', '#5a9a5a', '#4a7a4a', '#8ab88a',
  '#a0c890', '#c8a870',
];
