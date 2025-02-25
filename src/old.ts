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
