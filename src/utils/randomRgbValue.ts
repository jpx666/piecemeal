/**
 * 生成随机rgb数值
 */

export function randomRgb(): string {
    // 最高白色数值 255 向下取整 256
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
  
    return `rgb(${r}, ${g}, ${b})`
  }
  