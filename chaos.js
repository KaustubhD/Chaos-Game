const COLOR = '#2B9F48'
const TWOPI = 2 * Math.PI
const SPEED = 100 // per frame
const POINT_SIZE = 1

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let w = 500
// let h = 500

canvas.width = w
canvas.height = w

canvas.style.backgroundColor = '#000'


let p1X = w / 2
// Math.floor(Math.random() * w)
let p1Y = 0 + 2
// Math.floor(Math.random() * w)
let p2X = 0 + 2
// Math.floor(Math.random() * w)
let p2Y = w + 2
// Math.floor(Math.random() * w)
let p3X = w - 2
// Math.floor(Math.random() * w)
let p3Y = w - 2
// Math.floor(Math.random() * w)

let startX = Math.floor(Math.random() * w)
let startY = Math.floor(Math.random() * w)

ctx.fillStyle = '#fff'
ctx.beginPath()
ctx.ellipse(p1X, p1Y, POINT_SIZE, POINT_SIZE, 0, 0, TWOPI)
ctx.fill()

ctx.beginPath()
ctx.ellipse(p2X, p2Y, POINT_SIZE, POINT_SIZE, 0, 0, TWOPI)
ctx.fill()

ctx.beginPath()
ctx.ellipse(p3X, p3Y, POINT_SIZE, POINT_SIZE, 0, 0, TWOPI)
ctx.fill()

ctx.fillStyle = COLOR
ctx.beginPath()
ctx.ellipse(startX, startY, POINT_SIZE, POINT_SIZE, 0, 0, TWOPI)
ctx.fill()


let random
let col
function draw(){
  for(let i = 0; i < SPEED; i++){
    random = Math.random() * 3
    if(random <= 1){
      startX = (p1X + startX) / 2
      startY = (p1Y + startY) / 2
    }
    else if(random <= 2){
      startX = (p2X + startX) / 2
      startY = (p2Y + startY) / 2
    }
    else if(random <= 3){
      startX = (p3X + startX) / 2
      startY = (p3Y + startY) / 2
    }
    // ctx.fillStyle = COLOR
    col = changeRange(startY, 0, w, 0, 360)
    // col = Math.floor(col % 360)
    ctx.fillStyle = `hsl(${col}, 100%, 50%)`
    ctx.beginPath()
    ctx.ellipse(startX, startY, POINT_SIZE, POINT_SIZE, 0, 0, TWOPI)
    ctx.fill()
  }
}

function changeRange(val, inputLow, inputHigh, outputLow, outputHigh){
  return ((val - inputLow) / (inputHigh - inputLow)) * (outputHigh - outputLow) + outputLow
}

let count = 0
let x = setInterval(() => {
  if(count >= 50){
    clearInterval(x)
    console.log('Done')
  }
  requestAnimationFrame(draw)
  count++
}, 60)