import tinycolor from "tinycolor2";

/**
 * @description 生成随机颜色
 * @returns TinyColor
 */
export function randomColor(): tinycolorInstance {
  const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16); // 生成随机十六进制颜色
  return tinycolor(randomHex); // 返回TinyColor对象
}