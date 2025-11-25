import { Platform } from 'react-native';

const neonBackground = '#050816';
const neonCard = '#0B1120';
const neonBorder = '#22D3EE';
const neonCyan = '#00FFF6';
const neonPink = '#FF00FF';
const neonMuted = '#6B7280';

export const Colors = {
  light: {
    text: '#E5E7EB',
    background: neonBackground,
    tint: neonCyan,
    tabIconDefault: neonMuted,
    tabIconSelected: neonCyan,
    card: neonCard,
    border: neonBorder,
    accentPink: neonPink,
    accentCyan: neonCyan,
    muted: neonMuted,
  },
  dark: {
    text: '#E5E7EB',
    background: neonBackground,
    tint: neonCyan,
    tabIconDefault: neonMuted,
    tabIconSelected: neonCyan,
    card: neonCard,
    border: neonBorder,
    accentPink: neonPink,
    accentCyan: neonCyan,
    muted: neonMuted,
  },
};

export const Fonts = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  heading: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
};
