
// 新增 黑夜模式
import {extendTheme, Theme} from "native-base";
import {initConfig} from "@/native-base-theme/color-scheme-script";
import {fontConfig} from "@/native-base-theme/core";
import COLORS from '@/native-base-theme/core/colors.json';
import {components} from "@/native-base-theme/core/components";
export function createTheme(): Theme {
  const initialTheme = {
    colors:COLORS,
    components,
    ...fontConfig,
    ...initConfig,
  };

  return {
    ...extendTheme(initialTheme)
  };
}
