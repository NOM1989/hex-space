const SIZE: number = 50

export class Hex {
  q: number
  r: number
  s: number

  constructor(q: number, r: number) {
    // q + r + s must = 0
    this.q = q
    this.r = r
    this.s = -q-r
  }
}

export class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export function pointy_hex_to_pixel(hex: Hex) {
  const x = SIZE * (Math.sqrt(3) * hex.q  +  Math.sqrt(3)/2 * hex.r)
  const y = SIZE * (3./2 * hex.r)
  // return new Point(x, y)
  return {x, y}
}

export * from "./hex.ts"
