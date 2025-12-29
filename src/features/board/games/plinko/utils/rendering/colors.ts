export const COLORS = {
  blue100: '#8EC5FF',
  blue200: '#51A2FF',
  blue300: '#2B7FFF',
  blue500: '#155DFC',
  green100: '#00BC7D',
  green200: '#00D492',
  green600: '#05DF72',
  purple100: '#C27AFF',
  purple200: '#9810FA',
  red100: '#FF6467',
  red200: '#D4183D',
  gold200: '#edc34e',
  gold300: '#F0B100',
  gray700: '#1D293D',
  gray900: '#0F172B',
} as const;

export const NEON_BLUE = 'rgba(43, 127, 255, 0.8)';
export const NEON_BLUE_SOFT = 'rgba(81, 162, 255, 0.5)';
export const NEON_CYAN = 'rgba(0, 212, 146, 0.8)';

export function shadeColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

export const getMultiplierColors = (m: number): { bg: string; glow: string } => {
  if (m === 0) return { bg: '#1a1a2e', glow: 'rgba(100, 100, 100, 0.3)' };
  if (m >= 50) return { bg: COLORS.purple200, glow: 'rgba(152, 16, 250, 0.6)' };
  if (m >= 10) return { bg: COLORS.red200, glow: 'rgba(212, 24, 61, 0.5)' };
  if (m >= 5) return { bg: COLORS.gold300, glow: 'rgba(240, 177, 0, 0.5)' };
  if (m >= 2) return { bg: COLORS.blue300, glow: 'rgba(43, 127, 255, 0.4)' };
  if (m >= 1) return { bg: COLORS.green100, glow: 'rgba(0, 188, 125, 0.4)' };
  return { bg: '#2d3748', glow: 'rgba(100, 100, 100, 0.2)' };
};
