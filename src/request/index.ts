import { randomRgb } from '../utils/randomRgbValue'

export interface arrMap {
  background: string
}

export function backgroundColorRequest(num = 10): Promise<arrMap[]>{
  return new Promise((resolve) => {
    const arr: arrMap[] = [{ background: 'rgb(233,32,38)' }]
    for (let i = 1; i < num; i++) {
      arr.push({ background: randomRgb() })
    }
    
    // 模拟延迟0.5秒响应
    const timeOut = setTimeout(() => {
      resolve(arr)
      clearTimeout(timeOut)
    }, 500)
  })
}
