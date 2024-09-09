let wWidth = innerWidth;
let wHeight = innerHeight;
let mouseRadius = 100;
let ballCount = [100, 1000, 1500];
let sizeFraction = (innerWidth * innerHeight) / 1795200;
let mousePos;
let ballcounter = 0;
const ORIGINAL = {
  wWidth, wHeight,
  mouseRadius, ballCount: ballCount[1]
}
const mousePostion = document.querySelector(".mouse-position");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let cWidth, cHeight;
resizeCanvas();
document.body.appendChild(canvas);
window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("mousemove", updateMouse);
canvas.addEventListener("mouseleave", nullishMouse);
canvas.addEventListener("touchmove", e => {
  const touch = e.touches[0];
  updateMouse({x: touch.clientX, y: touch.clientY});
  e.preventDefault();
});
canvas.addEventListener("touchend", nullishMouse)
let ballArray = [];
for (let i = 0; i < ballCount[1]; i++) {
  createBall();
}
function createBall() {
  ballcounter++;
  let radius = (Math.random() * 10 + 7);
  let x = Math.random() * (cWidth - radius * 2) + radius;
  let y = Math.random() * (cHeight - radius * 2) + radius;
  
  let vx = [-1, 1][Math.floor(Math.random() * 2)] * ((Math.random() * 0.05));
  let vy = [-1, 1][Math.floor(Math.random() * 2)] * ((Math.random() * 0.05));
  let fill = `hsl(${Math.random() * 360}, ${Math.random() * 50 + 50}%, ${Math.random() * 20 + 40}%)`;
  const curBall = new Ball(x, y, vx, vy, radius, [1, (Math.random() * 0.5) + 1.5], fill);
  ballArray.push(curBall);
}
function ballUpdate() {
  const num = ballCount[1] - ballArray.length;
  for (let i = 0; i < Math.abs(num); i++) {
    if (num > 0) {
      createBall()
    } else {
      ballcounter--;
      ballArray.splice(Math.floor(Math.random() * ballArray), 1);
    }
  }
}
animate()
function animate() {
  ctx.clearRect(0, 0, cWidth, cHeight);
  ballArray.forEach(ball => ball.update(ctx));
  requestAnimationFrame(animate);
}
function updateMouse(e) {
  mousePos = {x: e.x, y: e.y};
}
function nullishMouse() {
  mousePos = null;
}

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const pixelRatio = window.devicePixelRatio;
  canvas.width = innerWidth * pixelRatio;
  canvas.height = innerHeight * pixelRatio;

  ctx.scale(pixelRatio, pixelRatio);
  
  sizeFraction = (innerWidth * innerHeight) / 1795200;
  mouseRadius = ORIGINAL.mouseRadius * Math.pow(sizeFraction, 0.5);
  
  ballCount[1] = Math.ceil(ORIGINAL.ballCount * sizeFraction);
  ballCount[1] = ballCount[1] < ballCount[2] ? ballCount[1] : ballCount[2];
  ballCount[1] = ballCount[1] > ballCount[0] ? ballCount[1] : ballCount[0];
  
  if (cWidth) {
    ballUpdate();
    ballArray.forEach(ball =>{
      const xSizeFraction = innerWidth / wWidth;
      const ySizeFraction = innerHeight / wHeight;
      
      if (mousePos) {
        mousePos.x *= xSizeFraction;
        mousePos.y *= ySizeFraction;
      }
      ball.x *= xSizeFraction;
      ball.y *= ySizeFraction;
      ball.radiusUpdate();
      if(window.devicePixelRatio < 1) {
        ball.vx = ball.ORIGINAL.vx / window.devicePixelRatio;
        ball.vy = ball.ORIGINAL.vy / window.devicePixelRatio;
      } else {
        ball.vx = ball.ORIGINAL.vx;
        ball.vy = ball.ORIGINAL.vy;
      }
    })
    updateMouseDom();
  }

  wWidth = innerWidth;
  wHeight = innerHeight;
  cWidth = innerWidth;
  cHeight = innerHeight;
}
let myEvent;
document.addEventListener("mousemove", e => {
  updateMouseDom();
  myEvent = e;
});
document.addEventListener("touchmove", e => {
  updateMouseDom();
  myEvent = e.touches[0];
});
setInterval(() => {
  updateMouseDom();
}, 2000);
updateMouseDom();
function updateMouseDom() {
  mousePostion.innerHTML = `mousePos: ${myEvent ? myEvent.clientX : ""} ${myEvent ? myEvent.clientX : ""}, balls: ${ballcounter}, DPR: ${window.devicePixelRatio}, ww: ${innerWidth}, wh: ${innerHeight}, size fraction: ${sizeFraction.toFixed(4)}`;
}