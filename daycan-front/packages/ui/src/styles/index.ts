/**
 * 디자인 시스템으로 정의되어있는 Colors Token들을 내보내는 파일입니다.
 * colors 내에서는 색상 토큰을 정의하고, theme.css 내에서는 테마를 정의합니다.
 * 해당 테마는 프로젝트에서 import 해와서 className을 통해 주입합니다.
 * @author 홍규진
 */
export * from "./colors";
export { THEME, COLOR_VARS } from "./theme.css";
