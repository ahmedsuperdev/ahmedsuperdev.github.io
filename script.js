// TODO: make a body get comuted style or html to get the width instead of using innerwidth &inner height
const canvas = document.createElement("canvas");
const mousePostion = document.querySelector(".mouse-position");
canvas.addEventListener("focus", updateMouse);
let couuuunt = 0;
canvas.addEventListener("resize", e => {
  console.log("banana");
  
})
let wWidth, wHeight, cWidth, cHeight;
const orignalBallCount = 1000;
let ballCount = orignalBallCount;
let mousePos;
let mouseRadius = 100;
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
// setTimeout(() => {
  document.body.appendChild(canvas);
  document.body.focus()
  canvas.focus()
// }, 5000); // the lag is by live preview script excution

const c = canvas.getContext("2d");

let hueIncrement = 360 / ballCount;




// c.fillRect(60, 60, 100, 100)


// c.beginPath();
// c.moveTo(550, 850);
// c.lineTo(950, 850 - Math.pow(Math.pow(800, 2) - Math.pow(400, 2), 0.5));
// c.lineTo(1350, 850);
// c.lineTo(550, 850);
// c.fillStyle = "rgb(255, 0, 0)"
// c.fill()

// const radius = 30;
// for (let i = 0; i < 800; i++) {
//   const x = Math.random() * (window.innerWidth - radius * 2) + radius
//   const y = Math.random() * (window.innerHeight - radius * 2) + radius
//   c.beginPath()
//   c.arc(x, y, radius, 0, Math.PI * 2, false)
//   c.stroke()
//   animate()
// }

class Ball {
  constructor({c, width, height}, x, y, dx, dy, radius, fill) {
    Object.assign(this, {
      canvas: {c, width, height},
      x, y, dx, dy, radius: {min: radius, increase: 1, max: 2.1}, fill
    })
    // this.upRadius = 1;

    
  }
  update() {
    if (this.x + this.radius.min >= this.canvas.width || this.x - this.radius.min <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius.min >= this.canvas.height || this.y - this.radius.min <= 0) {
      this.dy = -this.dy;
    }
    const x2 = this.x + this.dx;
    
    this.x = x2 + this.radius.min < this.canvas.width ? (x2 - this.radius.min > 0 ? x2 : this.radius.min) : this.canvas.width - this.radius.min;
    const y2 = this.y + this.dy;
    this.y = y2 + this.radius.min < this.canvas.height ? (y2 - this.radius.min > 0 ? y2 : this.radius.min) : this.canvas.height - this.radius.min;
    

    this.canvas.c.beginPath();
    this.canvas.c.lineWidth = this.strokeSize;

    this.radius.increase = mousePos && Math.abs(this.x - mousePos.x) < mouseRadius && Math.abs(this.y - mousePos.y) < mouseRadius ? (this.radius.increase < this.radius.max ? this.radius.increase + 0.06 : this.radius.max) : (this.radius.increase - 0.05 > 1 ? this.radius.increase - 0.02 : 1);

    this.canvas.c.arc(this.x, this.y, this.radius.min * this.radius.increase, 0, Math.PI * 2, false);
    this.canvas.c.fillStyle = this.fill;
    // this.canvas.c.strokeStyle = "blue";
    this.canvas.c.fill();
  }
  static clear() {
    c.clearRect(0, 0, cWidth, cHeight);
  }
}

let ballArray = [];
for (let i = 0; i < ballCount; i++) {
  createBall();
}
function createBall() {
  // ballsDOM(1)
  let radius = Math.random() * 10 + 7;
  // const xID = Math.random();
  // const yID = Math.random();
  let x = Math.random() * (cWidth - radius * 2) + radius;
  let y = Math.random() * (cHeight - radius * 2) + radius;
  let dx = [-1, 1][Math.floor(Math.random() * 2)] * ((Math.random() * 0.05));
  let dy = [-1, 1][Math.floor(Math.random() * 2)] * ((Math.random() * 0.05));
  // console.log(`${(0x777777 + 0x888888).toString(16)}`);
  // let fill = `#${Math.floor(Math.random() * 0x777777 + 0x888888).toString(16).padStart(6, "0").toUpperCase()}`;
  // let fill = `hsl(${hueIncrement * (ballArray.length + 1)}, ${Math.random() * 50 + 50}%, ${Math.random() * 20 + 40}%)`;
  let fill = `hsl(${Math.random() * 360}, ${Math.random() * 50 + 50}%, ${Math.random() * 20 + 40}%)`; // for the ballUpdate()
  const curBall = new Ball({c, width: cWidth, height: cHeight}, x, y, dx, dy, radius, fill);
  ballArray.push(curBall);
}
function ballUpdate() {
  const num = ballCount - ballArray.length;
  for (let i = 0; i < Math.abs(num); i++) {
    if (num > 0) {
      createBall()
    } else {
      // ballsDOM(-1)
      ballArray.splice(Math.floor(Math.random() * ballArray), 1);
    }
  }
  // ballArray = ballArray.splice(Math.floor(Math.random() * ballArray.length), 1);
}
animate()
function animate() {
  c.clearRect(0, 0, cWidth, cHeight);
  ballArray.forEach(ball => ball.update());

  requestAnimationFrame(animate);
}

// NOTE: NOTE: NOTE: this is so good, mouseMove update if I enter the window after I was out if I change my mouse position, otherwise visible would give me the old position status & mouseleave simply check when I leave in general, + extra bonus mouseleave would remove the
canvas.addEventListener("mousemove", updateMouse);
function updateMouse(e) {
  // console.log("hi");
  mousePos = {x: e.x, y: e.y};
  // console.log(e);
  // console.log(mousePos);
}
// let mousePosBeforeNull;
// let mousePosTimeout;
canvas.addEventListener("mouseleave", () => {
  // for the hoverOutside
  console.log("left");
  // mousePosBeforeNull = mousePos;
  mousePos = null;
});

// BAD DON'T USE IT ??????????
// document.addEventListener("visibilitychange", () =>{
//   // for the switch task
//   if(document.visibilityState === "visible") {
//     clearTimeout(mousePosTimeout);
//     mousePos = mousePosBeforeNull ? mousePosBeforeNull : mousePos;
//     console.log("visible");

//   } else {
//     mousePosTimeout = setTimeout(() => {
//       console.log("done");
      
//       mousePosBeforeNull = null;
//     }, 400);
//     console.log("hidden");
//   }
  
// });
console.log(ballArray);

// console.log(cWidth);

































































// function ballsDOM(num){
//   couuuunt += num;
//   mousePostion.innerHTML = `${couuuunt}`;
// }


// document.addEventListener("mousemove", e => {
//   mousePostion.innerHTML = `My Mouse Position: ${e.clientX} ${e.clientY}`;
// })
function resizeCanvas() {
  // console.log("resized");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  

  console.log(window.innerWidth, window.innerHeight); // the responsive mode is dump for some reason ??
  console.log(window.devicePixelRatio);
  
  const sizeFraction = (innerWidth * innerHeight) / 1795200;
  console.log(sizeFraction);
  
  ballCount = Math.ceil(orignalBallCount * sizeFraction);
  if (cWidth) {
    ballUpdate();
    // console.log("resized");
    // console.log(ballArray);
    // console.log(ballCount);
    
    ballArray.forEach(ball =>{
      const xSizeFraction = innerWidth / wWidth;
      const ySizeFraction = innerHeight / wHeight;
      ball.x *= xSizeFraction;
      ball.y *= ySizeFraction;
      // ball.dx *= xSizeFraction;
      // ball.dy *= ySizeFraction;
      ball.radius.min *= ySizeFraction;
      ball.strokeSize *= ySizeFraction;
      ball.canvas.width = innerWidth;
      ball.canvas.height = innerHeight;
    })
    // console.log(innerWidth / wWidth);
  }

  wWidth = innerWidth;
  wHeight = innerHeight;
  cWidth = innerWidth;
  cHeight = innerHeight;
}