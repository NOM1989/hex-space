import { Graphics, GraphicsContext, Ticker, Text, Container } from "pixi.js"
import { Hex, pointy_hex_to_pixel_POINT, pointy_hex_to_pixel, HashTable } from "./hex"
import { APP_HEIGHT, APP_WIDTH, HEX_SIZE } from "./settings"

export function draw_map(stage: Container, hexes: HashTable<Hex>, show_coords: boolean = false) {
  // Create the shape like a texture to reuse it
  const hexContext = new GraphicsContext()
  .regularPoly(HEX_SIZE, HEX_SIZE, HEX_SIZE-(Math.round(HEX_SIZE*0.08)), 6)
  .fill('pink')

  Object.values(hexes).forEach(hex => {
    let duplicate = new Graphics(hexContext);
    const { x, y } = pointy_hex_to_pixel(hex, HEX_SIZE, APP_WIDTH, APP_HEIGHT);
    duplicate.position.set(x, y)
    stage.addChild(duplicate)

    // Optionally draw coordinates at the base of each hex
    if ( show_coords ) {
      const text = new Text({
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
      stage.addChild(text)
    }
  })
}

export function animate_between_hexes(graphics: Graphics, start_hex: Hex, end_hex: Hex, ticker: Ticker) {
  const elapsed_target = 50 // What duration to animate over

  let start = pointy_hex_to_pixel_POINT(start_hex)
  const end = pointy_hex_to_pixel_POINT(end_hex)

  const x_diff = end.x - start.x
  const y_diff = end.y - start.y

  let elapsed = 0.0;
  ticker.add((ticker: Ticker) => {
    elapsed += ticker.deltaTime;
    graphics.x = start.x + (x_diff/elapsed_target)*Math.round(elapsed);
    graphics.y = start.y + (y_diff/elapsed_target)*Math.round(elapsed);
  })
}

