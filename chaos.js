// const COLOR = '#2B9F48'
const COLOR = 'rgba(43, 159, 72, 0.4)'
// const COLOR = 'rgba(255, 255, 255, 0.5)'
const TWOPI = 2 * Math.PI
const SPEED = 700 // per frame
const POINT_SIZE = 1/10
const LIMIT = 200

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let w = 500
// let h = 500

canvas.width = w
canvas.height = w

// canvas.style.backgroundColor = '#000'
ctx.fillStyle = '#000'
ctx.fillRect(0, 0, w, w)
// ctx.translate(w / 2, w / 2)


let points = []

let numPoints = 5

for(let i = 0; i < numPoints; i++){
  let p = [0, 0]
  let divide = i * TWOPI / numPoints
  p[0] = Math.round((w / 2) * Math.cos(divide)) + (w / 2)
  p[1] = Math.round((w / 2) * Math.sin(divide)) + (w / 2)
  p[2] = `hsla(${i * (360 / numPoints)}, 100%, 50%, 0.4)`
  console.log(`${p[0]} and ${p[1]}`)
  points.push(p)
  makeCircle(p, POINT_SIZE, p[2])
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
let prev = 0
let prev2 = 0
let diff
let diff2
function draw(){
  for(let i = 0; i < SPEED; i++){
    randomIndex = Math.floor(Math.random() * numPoints)
    
    // if(randomIndex !== prev){
    //   random = points[randomIndex]
    //   start[0] = (random[0] + start[0]) / 2
    //   start[1] = (random[1] + start[1]) / 2

    //   // col = changeRange(startY, 0, w, 0, 360)
    //   // ctx.fillStyle = `hsla(${col}, 100%, 50%, 0.5)`

    //   makeCircle(start, POINT_SIZE, COLOR)
    //   // makeCircle(start, POINT_SIZE, random[2])

    //   prev = randomIndex
    // }

    // diff = Math.abs(randomIndex - prev)
    // if(diff !== 2){
    //   random = points[randomIndex]
    //   start[0] = (random[0] + start[0]) / 2
    //   start[1] = (random[1] + start[1]) / 2

    //   // makeCircle(start, POINT_SIZE, COLOR)
    //   makeCircle(start, POINT_SIZE, random[2])
    //   prev = randomIndex
    // }

    // diff = Math.abs(randomIndex - prev)
    // diff2 = Math.abs(randomIndex - prev2)
    // // if((diff !== 1 || diff !== 3) && (diff2 !== 1 || diff2 !== 3)){
    // if(diff !== 1 && diff2 !== 1){
    //   random = points[randomIndex]
    //   start[0] = (random[0] + start[0]) / 2
    //   start[1] = (random[1] + start[1]) / 2

    //   makeCircle(start, POINT_SIZE, COLOR)
    //   // makeCircle(start, POINT_SIZE, random[2])
    //   prev2 = prev
    //   prev = randomIndex
    // }
    
    diff = Math.abs(randomIndex - prev)
    diff2 = Math.abs(randomIndex - prev2)
    if(diff !== 1 && diff2 !== 4){
      random = points[randomIndex]
      start[0] = (random[0] + start[0]) / 2
      start[1] = (random[1] + start[1]) / 2

      makeCircle(start, POINT_SIZE, COLOR)
      // makeCircle(start, POINT_SIZE, random[2])
      prev2 = prev
      prev = randomIndex
    }
    
    // ctx.fillStyle = col
    // ctx.beginPath()
    // ctx.ellipse(startX, startY, POINT_SIZE, POINT_SIZE, 0, 0, TWOPI)
    // ctx.fill()
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