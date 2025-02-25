import './style.css'
import * as PIXI from 'pixi.js'
import * as HEX from './hex.ts'
import { animate_between_hexes, draw_map } from './render.ts';
import { APP_HEIGHT, APP_WIDTH, HEX_SIZE } from "./settings"

// Get the app div element
const appDiv = document.querySelector<HTMLDivElement>('#app')!;

const app = new PIXI.Application()
await app.init({ width: APP_WIDTH, height: APP_HEIGHT })
appDiv.appendChild(app.canvas)

const hexes = HEX.hex_map_hex(6)

draw_map(app.stage, hexes, true)

let point = new PIXI.Graphics().circle(HEX_SIZE, HEX_SIZE, 10).fill('red')
// const { x, y } = HEX.pointy_hex_to_pixel(hexes["00"], HEX_SIZE, APP_WIDTH, APP_HEIGHT)
// point.position.set(x, y)
app.stage.addChild(point)

const shared_ticker = PIXI.Ticker.shared;
shared_ticker.autoStart = false;
shared_ticker.stop(); // Just incase

let elapsed = 0.0;
let elapsed_callback = (ticker: PIXI.Ticker) => {
  elapsed += ticker.deltaTime;
  if ( elapsed >= 50 ) {
    shared_ticker.stop()
  }
};
shared_ticker.add(elapsed_callback)


animate_between_hexes(point, hexes["00"], hexes["1-1"], shared_ticker)

let point2 = new PIXI.Graphics().circle(HEX_SIZE, HEX_SIZE, 10).fill('red')
app.stage.addChild(point2)

animate_between_hexes(point2, hexes["00"], hexes["-10"], shared_ticker)

 // Call this when you are ready for a running shared ticker.
 shared_ticker.start();

