import { extendTheme } from "native-base";

/**
 * Trong cac component co the dung useTheme
 */

export const colorTheme = {
  primary: {
    50: "#F8D1D1", // Đỏ nhạt
    100: "#F1A3A3", // Đỏ sáng
    200: "#EB7575", // Đỏ dịu
    300: "#E34747", // Đỏ tươi
    400: "#BC2727", // Màu đỏ chính
    500: "#A61E1E", // Đỏ đậm
    600: "#9A1A1A", // Đỏ đậm hơn
    700: "#8E1616", // Đỏ tối
    800: "#820C0C", // Đỏ rất tối
    900: "#740B0B", // Đỏ gần như đen
  },
};
const appTheme = extendTheme({ colors: colorTheme });
export type AppThemeType = typeof appTheme;
declare module "native-base" {
  interface ICustomTheme extends AppThemeType {}
}
export default appTheme;
