const canvas = document.getElementById("graph"); // get canvas
const ctx = canvas.getContext("2d"); // get canvas context
const inputElement = document.getElementById("pointsCount"); // points count input
const POINT_RADIUS = 10; // point radius

let pointsNumber = 5; // initial number of points
let points = []; // points array
let newPoints = []; // new points state
let animate = true; // animation flag

inputElement.value = pointsNumber; // set initial points number

function initPoints() {
  let pointsArray = [];
  let range = 1000 / (pointsNumber + 1); // dots range
  for (let i = 1; i < pointsNumber + 1; i++) {
    pointsArray[i - 1] = { x: i * range, y: randomY(100, 500), animate: true }; // push point in array
  }
  return pointsArray;
}

function drawPoints() {
  for (let i = 1; i < pointsNumber + 1; i++) {
    ctx.beginPath();
    ctx.arc(points[i - 1].x, points[i - 1].y, POINT_RADIUS, 0, 360); // draw circle
    ctx.stroke(); // stroke
  }
}

function drawLines() {
  for (let i = 0; i < points.length - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(points[i].x, points[i].y);
    ctx.lineTo(points[i + 1].x, points[i + 1].y);
    ctx.stroke(); // stroke
  }
}

function randomY(min, max) {
  // get random y-coord from min to max
  return ~~(Math.random() * (max - min)) + min;
}

function changePointsNumber(value) {
  pointsNumber = parseInt(value); // set new points count
  init(); // and update canvas
}

function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  points.length = 0; // clear points array

  points = initPoints();

  drawPoints(); // draw dots
  drawLines(); // draw lines between points
}

// update
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  drawPoints(pointsNumber); // draw dots
  drawLines(points);
}

function startAnimation() {
  newPoints = initPoints();
  animate = true;
  animateGraph();
}

function animateGraph() {
  if (animate) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    for (let i = 0; i < points.length; i++) {
      if (points[i].y !== newPoints[i].y) {
        // adjust coords
        if (newPoints[i].y - points[i].y > 0) {
          points[i].y += 1;
        } else {
          points[i].y -= 1;
        }
      } else {
        points[i].animate = false;
      }
    }
    // if all point on new places
    if (!points.filter((point) => point.animate).length) {
      animate = false;
      points = newPoints;
      points.map((point) => (point.animate = true));
    }
    update();
    setTimeout("animateGraph()", 1);
  }
}
window.onload = () => {
  init();
  canvas.addEventListener("click", () => {
    startAnimation();
  });
};
