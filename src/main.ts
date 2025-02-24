import './style.css'
import * as PIXI from 'pixi.js'
import * as HEX from './hex.ts'

// Get the app div element
const appDiv = document.querySelector<HTMLDivElement>('#app')!;

const app = new PIXI.Application()
await app.init({ width: 1000, height: 1000 })
appDiv.appendChild(app.canvas)

let hexContext = new PIXI.GraphicsContext()
  .regularPoly(100, 100, 46, 6)
  // .circle(100, 100, 50)
  .fill('pink')

for (let i = 0; i < 30; i++) {
  let duplicate = new PIXI.Graphics(hexContext);
  const index = Math.floor(i/5)
  const hex = new HEX.Hex(Math.floor(i/10)-index+(i%5), index)
  const { x, y } = HEX.pointy_hex_to_pixel(hex);
  console.log("Drawing at: ", x, y)
  duplicate.position.set(x, y)
  app.stage.addChild(duplicate)
}

