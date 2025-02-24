
const APP_WIDTH = 1000
const APP_HEIGHT = 1000
const HEX_SIZE = 50

// Credit: redblobgames.com/grids/hexagons for Hex theory

export class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  center() {
    // Offset the point to align with Hex centers
    this.x += HEX_SIZE
    this.y += HEX_SIZE
  }
}

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

// Basic hex functions
function hex_add(a: Hex, b: Hex) {
  return new Hex(a.q + b.q, a.r + b.r);
}

function hex_subtract(a: Hex, b: Hex) {
    return new Hex(a.q - b.q, a.r - b.r);
}

function hex_multiply(a: Hex, k: number) {
    return new Hex(a.q * k, a.r * k);
}
//
function hex_length(hex: Hex) {
    return Math.floor((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2);
}

export function hex_distance(a: Hex, b: Hex) {
    return hex_length(hex_subtract(a, b));
}
////


export function pointy_hex_to_pixel(hex: Hex, hex_size: number, window_w: number, window_h: number) {
  const x = hex_size * (Math.sqrt(3) * hex.q  +  Math.sqrt(3)/2 * hex.r) + ((window_w/2)-hex_size)
  const y = hex_size * (3./2 * hex.r) + ((window_h/2)-hex_size)
  return {x, y}
}

export function pointy_hex_to_pixel_POINT(hex: Hex) {
  const x = HEX_SIZE * (Math.sqrt(3) * hex.q  +  Math.sqrt(3)/2 * hex.r) + ((APP_WIDTH/2)-HEX_SIZE)
  const y = HEX_SIZE * (3./2 * hex.r) + ((APP_HEIGHT/2)-HEX_SIZE)
  return new Point(x, y)
}

interface HashTable<T> {
    [key: string]: T
}

export function hex_map_rect(left: number, right: number, top: number, bottom: number) {
  let hexes: HashTable<Hex> = {}
  for (let r = top; r <= bottom; r++) { // pointy top
      const r_offset = Math.floor(r/2);
      for (let q = left - r_offset; q <= right - r_offset; q++) {
          hexes[`${q}${r}`] = new Hex(q, r)
      }
  }
  return hexes
}

export function hex_map_hex(radius: number) {
  let hexes: HashTable<Hex> = {}
  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius)
    const r2 = Math.min(radius, -q + radius)
    for (let r = r1; r <= r2; r++) {
      hexes[`${q}${r}`] = new Hex(q, r)
    }
  }
  return hexes
}

