import { Hex } from "./hex"

class Object {
  id: number

  constructor(id: number) {
    this.id = id
  }
}

class MovingObject extends Object {
  hex: Hex //Current location of object

  constructor(id: number, hex: Hex) {
    super(id)
    this.hex = hex
  }

  move_to(hex: Hex): void {
    this.hex = hex
  }
}

class Missile extends MovingObject {
  velocity: number

  constructor(id: number, hex: Hex) {
    super(id, hex)
    this.velocity = 0
  }

  move_to(hex: Hex): void {
    this.velocity = 1
    if ( this.hex.equals(hex) ) { //Stop the missile to drastically change direction
      this.velocity = 0
    }
    this.hex = hex
  }
}

class Laser extends MovingObject {
  power: number
  decay: number // How much power is lost per tile of travel

  constructor(id: number, hex: Hex, power: number) {
    super(id, hex)
    this.power = power
    this.decay = 1
  }

  move_to(hex: Hex): void {
    this.hex = hex
    this.power -= this.decay
  }
}

