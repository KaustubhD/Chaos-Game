const COLOR = 'rgba(43, 159, 72, 0.4)'
// const COLOR = 'rgba(255, 255, 255, 0.5)'
const TWOPI = 2 * Math.PI
const HALFPI = Math.PI / 2
const SPEED = 900 // per frame
const POINT_SIZE = 1/10
const LIMIT = 600
const DIVIDE_PERCENT = 0.5

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// let w = 500
let w = document.documentElement.clientWidth

canvas.width = w
canvas.height = w

ctx.fillStyle = '#181A1C'
ctx.fillRect(0, 0, w, w)


let points = []

let numPoints = 5

for(let i = 0; i < numPoints; i++){
  let p = [0, 0]
  let divide = (i * TWOPI / numPoints) - HALFPI
  p[0] = Math.round((w / 2) * Math.cos(divide)) + (w / 2)
  p[1] = Math.round((w / 2) * Math.sin(divide)) + (w / 2)
  p[2] = `hsla(${i * (360 / numPoints)}, 100%, 50%, 0.4)`
  // console.log(`${p[0]} and ${p[1]}`)
  points.push(p)
  // makeCircle(p, POINT_SIZE * 20, p[2])
  makeCircle(p, POINT_SIZE * 20, '#fff')
}

for(let i = 0; i < numPoints; i++){
  makeLine(points[i], points[(i + 1) % numPoints], '#fff')
}
// let p1X = w / 2
// // Math.floor(Math.random() * w)
// let p1Y = 0 + 2
// // Math.floor(Math.random() * w)
// let p2X = 0 + 2
// // Math.floor(Math.random() * w)
// let p2Y = w + 2
// // Math.floor(Math.random() * w)
// let p3X = w - 2
// // Math.floor(Math.random() * w)
// let p3Y = w - 2
// // Math.floor(Math.random() * w)

let start = [Math.floor(Math.random() * w), Math.floor(Math.random() * w)]
makeCircle(start, POINT_SIZE, COLOR)


function makeCircle(point, rad, color){
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.ellipse(point[0], point[1], rad, rad, 0, 0, TWOPI)
  ctx.fill()
}

function makeLine(pointA, pointB, color){
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(pointA[0], pointA[1])
  ctx.lineTo(pointB[0], pointB[1])
  ctx.stroke()
}


// ctx.beginPath()
// ctx.ellipse(p2X, p2Y, POINT_SIZE, POINT_SIZE, 0, 0, TWOPI)
// ctx.fill()

// ctx.beginPath()
// ctx.ellipse(p3X, p3Y, POINT_SIZE, POINT_SIZE, 0, 0, TWOPI)
// ctx.fill()

// ctx.fillStyle = COLOR
// ctx.beginPath()
// ctx.ellipse(startX, startY, POINT_SIZE, POINT_SIZE, 0, 0, TWOPI)
// ctx.fill()


let randomIndex
let random
let prev
let prev2
let diff
let diff2
function draw(){
  for(let i = 0; i < SPEED; i++){
    randomIndex = Math.floor(Math.random() * numPoints)
    
    // with 3 vertices
    // random = points[randomIndex]
    // start[0] = (random[0] + start[0]) * DIVIDE_PERCENT
    // start[1] = (random[1] + start[1]) * DIVIDE_PERCENT

    // // makeCircle(start, POINT_SIZE, COLOR)
    // makeCircle(start, POINT_SIZE, random[2])

    // with 5 vertices
    // if(randomIndex !== prev){
    //   random = points[randomIndex]
    //   start[0] = (random[0] + start[0]) * DIVIDE_PERCENT
    //   start[1] = (random[1] + start[1]) * DIVIDE_PERCENT

    //   // makeCircle(start, POINT_SIZE, COLOR)
    //   makeCircle(start, POINT_SIZE, random[2])

    //   prev = randomIndex
    // }

    // with 4 vertices
    // diff = Math.abs(randomIndex - prev)
    // if(diff !== 2){
    //   random = points[randomIndex]
    //   start[0] = (random[0] + start[0]) * DIVIDE_PERCENT
    //   start[1] = (random[1] + start[1]) * DIVIDE_PERCENT

    //   makeCircle(start, POINT_SIZE, COLOR)
    //   // makeCircle(start, POINT_SIZE, random[2])
    //   prev = randomIndex
    // }

    // with 4 vertices
    // diff = Math.abs(randomIndex - prev)
    // diff2 = Math.abs(randomIndex - prev2)
    // if(!(prev === prev2 && (diff === 1 || diff === 3) )){
    //   random = points[randomIndex]
    //   start[0] = (random[0] + start[0]) * DIVIDE_PERCENT
    //   start[1] = (random[1] + start[1]) * DIVIDE_PERCENT

    //   makeCircle(start, POINT_SIZE, COLOR)
    //   // makeCircle(start, POINT_SIZE, random[2])
    //   prev2 = prev
    //   prev = randomIndex
    // }
    
    // with 5 vertices
    diff = Math.abs(randomIndex - prev)
    diff2 = Math.abs(randomIndex - prev2)
    if(!(prev === prev2 && (diff === 1 || diff === 4) )){
      random = points[randomIndex]
      start[0] = (random[0] + start[0]) * DIVIDE_PERCENT
      start[1] = (random[1] + start[1]) * DIVIDE_PERCENT

      // makeCircle(start, POINT_SIZE, COLOR)
      makeCircle(start, POINT_SIZE, random[2])
      prev2 = prev
      prev = randomIndex
    }
    
  }
}

function changeRange(val, inputLow, inputHigh, outputLow, outputHigh){
  return ((val - inputLow) / (inputHigh - inputLow)) * (outputHigh - outputLow) + outputLow
}

let count = 0
let x = setInterval(() => {
  if(count >= LIMIT){
    clearInterval(x)
    console.log('Done')
  }
  requestAnimationFrame(draw)
  count++
}, 60)