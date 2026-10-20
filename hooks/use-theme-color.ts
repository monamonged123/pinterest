/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppContext } from '@/app/store/context';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const systemTheme = useColorScheme() ?? 'light';
  const { isDark, colors } = useAppContext();
  const theme = isDark ? 'dark' : systemTheme;
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  return {
    text: colors.text,
    background: colors.background,
    tint: colors.accent,
    icon: colors.muted,
    tabIconDefault: colors.muted,
    tabIconSelected: colors.accent,
  }[colorName] ?? Colors[theme][colorName];
}
