import './style.css'
import * as PIXI from 'pixi.js'
import * as HEX from './hex.ts'

// Get the app div element
const appDiv = document.querySelector<HTMLDivElement>('#app')!;

const APP_WIDTH = 1000
const APP_HEIGHT = 1000
const HEX_SIZE = 40

const app = new PIXI.Application()
await app.init({ width: APP_WIDTH, height: APP_HEIGHT })
appDiv.appendChild(app.canvas)

let hexContext = new PIXI.GraphicsContext()
  .regularPoly(HEX_SIZE, HEX_SIZE, HEX_SIZE-(Math.round(HEX_SIZE*0.08)), 6)
  // .circle(100, 100, 50)
  .fill('pink')

// const hexes = HEX.hex_map_rect(-3, 3, -2, 2)
const hexes = HEX.hex_map_hex(6)

function draw_map(show_coords: boolean) {
  Object.values(hexes).forEach(hex => {
    let duplicate = new PIXI.Graphics(hexContext);
    const { x, y } = HEX.pointy_hex_to_pixel(hex, HEX_SIZE, APP_WIDTH, APP_HEIGHT);
    duplicate.position.set(x, y)
    app.stage.addChild(duplicate)

    // Optionally draw coordinates at the base of each hex
    if ( show_coords ) {
      const text = new PIXI.Text({
        text: `${hex.q}.${hex.r}`,
        style: {
          fontFamily: 'Arial',
          fontSize: 12,
          fill: 0xff0000,
          align: 'center',
        }
      })
      text.position.set(
        x + HEX_SIZE-Math.round(text.width/2),
        y + Math.round(HEX_SIZE*1.5) -Math.round(text.height/2)
      )
      app.stage.addChild(text)
    }
  })
}

draw_map(true)

let point = new PIXI.Graphics().circle(HEX_SIZE, HEX_SIZE, 10).fill('red')
// const { x, y } = HEX.pointy_hex_to_pixel(hexes["00"], HEX_SIZE, APP_WIDTH, APP_HEIGHT)
// point.position.set(x, y)
app.stage.addChild(point)


function animate_between_hexes(graphics: PIXI.Graphics, start_hex: HEX.Hex, end_hex: HEX.Hex) {
  const elapsed_target = 50 // What duration to animate over

  let start = HEX.pointy_hex_to_pixel_POINT(start_hex)
  const end = HEX.pointy_hex_to_pixel_POINT(end_hex)

  const x_diff = end.x - start.x
  const y_diff = end.y - start.y

  let elapsed = 0.0;

  const animation_callback = (ticker: PIXI.Ticker) => {
    elapsed += ticker.deltaTime;
    graphics.x = start.x + (x_diff/elapsed_target)*Math.round(elapsed);
    graphics.y = start.y + (y_diff/elapsed_target)*Math.round(elapsed);
    if (elapsed >= elapsed_target) {
      app.ticker.remove(animation_callback)
    }
  };

  app.ticker.add(animation_callback)
}

animate_between_hexes(point, hexes["00"], hexes["1-1"])

let point2 = new PIXI.Graphics().circle(HEX_SIZE, HEX_SIZE, 10).fill('red')
// const { x, y } = HEX.pointy_hex_to_pixel(hexes["00"], HEX_SIZE, APP_WIDTH, APP_HEIGHT)
// point.position.set(x, y)
app.stage.addChild(point2)

animate_between_hexes(point2, hexes["00"], hexes["-10"])
