import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
      'default'
      | 'title'
      | 'defaultSemiBold'
      | 'subtitle'
      | 'link'
      | 'small'
      | 'middle'
      | 'large'
      | 'caption'
      | 'highlight';
};

export function ThemedText({
                             style,
                             lightColor,
                             darkColor,
                             type = 'default',
                             ...rest
                           }: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
      <Text
          style={[
            { color },
            type === 'default' ? styles.default : undefined,
            type === 'title' ? styles.title : undefined,
            type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
            type === 'subtitle' ? styles.subtitle : undefined,
            type === 'link' ? styles.link : undefined,
            type === 'small' ? styles.small : undefined,
            type === 'middle' ? styles.middle : undefined,
            type === 'large' ? styles.large : undefined,
            type === 'caption' ? styles.caption : undefined,
            type === 'highlight' ? styles.highlight : undefined,
            style,
          ]}
          {...rest}
      />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  small: {
    fontSize: 12,
    lineHeight: 18,
  },
  middle: {
    fontSize: 18,
    lineHeight: 26,
  },
  large: {
    fontSize: 24,
    lineHeight: 36,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  highlight: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    color: '#e74c3c', // Example highlight color
  },
});
