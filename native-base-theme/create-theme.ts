
// 新增 黑夜模式
import {extendTheme, Theme} from "native-base";
import {defaultConfig} from "@/native-base-theme/color-scheme-script";
import {fontConfig,components} from "@/native-base-theme/core";
import COLORS from '@/native-base-theme/core/colors.json';
export function createTheme(): Theme {
  const initialTheme = {
    colors:COLORS,
    components,
    ...fontConfig,
    ...defaultConfig,
  };

  return {
    ...extendTheme(initialTheme)
  };
}
