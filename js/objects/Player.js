import ConvexPoly from '../ConvexPoly.js'
import { drawLife, strokeConvexPoly } from '../RenderUtils.js'

const draw = function({ ctx }) {
  drawLife(ctx, this.x, this.y, this.rot, '#b42', '#9299')

  ctx.lineWidth = 2
  ctx.strokeStyle = this.collides ? 'green' : 'orange'
  strokeConvexPoly(ctx, this.collider)
  this.collides = false // TODO: hack, needs a postUpdate() or postDraw() function...
}

const update = function(eng) {
  this.rot += this.rotSpeed
  this.x += this.speed * Math.cos(this.rot)
  this.y += this.speed * Math.sin(this.rot)

  ConvexPoly.translate(this.collider, this.x, this.y)
}

const onMouseMove = function(x, y) {
  this.rot = Math.atan2(y - this.y, x - this.x)
}

const setSpeed = function(speed) {
  this.speed = speed
}

const setRotSpeed = function(speed) {
  this.rotSpeed = speed
}

const onCollision = function(what) {
  this.collides = true // TODO remove
}

export default (x, y) => ({
  x,
  y,
  collider: ConvexPoly.regular(x, y, 20, 10),
  rot: Math.random() * Math.PI * 2,
  speed: 0,
  rotSpeed: 0,
  draw,
  update,
  onMouseMove,
  setSpeed,
  setRotSpeed,
  onCollision
})
