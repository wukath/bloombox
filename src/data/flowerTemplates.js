// All coordinates are in a 100×100 viewBox.
// Flower head center: (50, 34). Stem runs (50,46) → (50,95).
// Petal paths are centered at (0,0) — placed via translate in the SVG.

export const TEMPLATES = [
  {
    id: 'daisy',
    name: 'Daisy',
    petalCount: 7,
    petalOffset: 17,
    petalPath: 'M0,-11 C5,-11 8,-6 8,0 C8,6 5,11 0,11 C-5,11 -8,6 -8,0 C-8,-6 -5,-11 0,-11Z',
    centerR: 8,
    stem: 'straight',
    leaves: 'simple',
    defaultColors: {
      center: '#f9e07a',
      stem: '#7ab87a',
      leaf_0: '#7ab87a',
    },
  },
  {
    id: 'bloom',
    name: 'Bloom',
    petalCount: 5,
    petalOffset: 16,
    petalPath: 'M0,-14 C7,-14 12,-7 12,0 C12,7 7,14 0,14 C-7,14 -12,7 -12,0 C-12,-7 -7,-14 0,-14Z',
    centerR: 9,
    stem: 'curved',
    leaves: 'pair',
    defaultColors: {
      center: '#f4c04a',
      stem: '#5a9a5a',
      leaf_0: '#5a9a5a',
      leaf_1: '#5a9a5a',
    },
  },
  {
    id: 'star',
    name: 'Star',
    petalCount: 8,
    petalOffset: 18,
    petalPath: 'M0,-14 C3,-9 6,-3 6,0 C6,3 3,9 0,14 C-3,9 -6,3 -6,0 C-6,-3 -3,-9 0,-14Z',
    centerR: 7,
    stem: 'straight',
    leaves: 'pair',
    defaultColors: {
      center: '#ffffff',
      stem: '#7ab87a',
      leaf_0: '#7ab87a',
      leaf_1: '#7ab87a',
    },
  },
];

export const PALETTE = [
  // pinks & reds
  '#ffb3c6', '#ff8fab', '#ff6b6b', '#ff9a8b', '#ffb347',
  // purples & blues
  '#d4a5f5', '#c9b8e8', '#a8c8f0', '#74b9e8', '#6bcbd4',
  // greens & teals
  '#b8e0a0', '#8fce8f', '#a8d8b4', '#c8f0d8', '#d4f0a0',
  // yellows & oranges
  '#ffd166', '#f9e07a', '#ffca70', '#f4a97a', '#f08060',
  // neutrals & whites
  '#ffffff', '#fdf6ee', '#e8d4c8', '#d4b8a0', '#a08070',
];

export const ERASER_COLOR = '#fdf6ee';
