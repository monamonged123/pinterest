export type ThemeColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentSoft: string;
  coral: string;
  purple: string;
  white: string;
};

export const appColors: Record<'light' | 'dark', ThemeColors> = {
  light: {
    background: '#FFFAF4',
    surface: '#FFFEFD',
    surfaceAlt: '#FCE1E8',
    text: '#30243B',
    muted: '#817486',
    border: '#EFE7E8',
    accent: '#E74465',
    accentSoft: '#F9DCE5',
    coral: '#F07170',
    purple: '#8C76D8',
    white: '#FFFFFF',
  },
  dark: {
    background: '#17151D',
    surface: '#24212C',
    surfaceAlt: '#342631',
    text: '#F7F0F6',
    muted: '#B7AEBB',
    border: '#3C3543',
    accent: '#FF7694',
    accentSoft: '#482D3B',
    coral: '#FF8580',
    purple: '#B5A2FF',
    white: '#FFFFFF',
  },
};
