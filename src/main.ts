import './style.css'
import * as PIXI from 'pixi.js'
import * as HEX from './hex.ts'

// Get the app div element
const appDiv = document.querySelector<HTMLDivElement>('#app')!;

const APP_WIDTH = 1000
const APP_HEIGHT = 1000
const HEX_SIZE = 50

const app = new PIXI.Application()
await app.init({ width: APP_WIDTH, height: APP_HEIGHT })
appDiv.appendChild(app.canvas)

let hexContext = new PIXI.GraphicsContext()
  .regularPoly(HEX_SIZE, HEX_SIZE, HEX_SIZE-(Math.round(HEX_SIZE*0.08)), 6)
  // .circle(100, 100, 50)
  .fill('pink')

// const hexes = HEX.hex_map_rect(-3, 3, -2, 2)
const hexes = HEX.hex_map_hex(3)

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
const { x, y } = HEX.pointy_hex_to_pixel(hexes["00"], HEX_SIZE, APP_WIDTH, APP_HEIGHT)
point.position.set(x, y)
app.stage.addChild(point)


function animate_between_hexes(start_hex: HEX.Hex, end_hex: HEX.Hex) {
  const elapsed_target = 50 // What duration to animate over

  let start = HEX.pointy_hex_to_pixel_POINT(start_hex)
  const end = HEX.pointy_hex_to_pixel_POINT(end_hex)

  const x_diff = end.x - start.x
  const y_diff = end.y - start.y

  let elapsed = 0.0;

  const animation_callback = (ticker: PIXI.Ticker) => {
     elapsed += ticker.deltaTime;
    point.x = x + (x_diff/elapsed_target)*Math.round(elapsed);
    point.y = y + (y_diff/elapsed_target)*Math.round(elapsed);
    if (elapsed >= elapsed_target) {
      app.ticker.remove(animation_callback)
    }
  };

  app.ticker.add(animation_callback)
}

animate_between_hexes(hexes["00"], hexes["1-1"])


// function animate_between_hexes_v2(hex_path: HEX.Hex[]) {
//   const total_elapsed_target = 100 // What duration to animate over
//
//   const steps = hex_path.length // How many sub-animations
//
//   let path_stages: PIXI.Point[] = []
//
//   const hex_coords = hex_path.map(hex => HEX.pointy_hex_to_pixel_POINT(hex))
//
//   for (let step = 0; step < steps-1; step++) {
//     console.log(step)
//     const start = hex_coords[step]
//     const end = hex_coords[step+1]
//
//     const x_diff = end.x - start.x
//     const y_diff = end.y - start.y
//
//     path_stages.push(new PIXI.Point(x_diff, y_diff))
//   }
//
//   console.log(path_stages)
//
//   const elapsed_per_step_target = total_elapsed_target/steps
//   
//   let total_x = 0
//   let total_y = 0
//   let elapsed = 0.0;
//   const animation_callback = (ticker: PIXI.Ticker) => {
//     elapsed += ticker.deltaTime;
//
//     console.log(elapsed, elapsed_per_step_target, Math.floor(elapsed/elapsed_per_step_target))
//
//     total_x += path_stages[Math.floor(elapsed/elapsed_per_step_target)].x/elapsed_per_step_target
//     total_y += path_stages[Math.floor(elapsed/elapsed_per_step_target)].y/elapsed_per_step_target
//
//     point.x = x + total_x
//     point.y = y + total_y
//     if (elapsed >= total_elapsed_target) {
//       app.ticker.remove(animation_callback)
//     }
//   };
//
//   app.ticker.add(animation_callback)
// }
//
// animate_between_hexes_v2([hexes["00"], hexes["1-1"], hexes["10"]])
