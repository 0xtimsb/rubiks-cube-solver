// Up, Down, Right, Left, Front, Back
// White, Yellow, Red, Orange, Green, Blue
// ['#ffffff', '#fffb80', '#ff8080', '#ffc080', '#bfff80', '#82e6ff'];

let easycam;
let font;

function preload() {
  font = loadFont('assets/Montserrat-ExtraBold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  easycam = createEasyCam();
  cursor(CROSS);

  // Construct cube and put it in list.
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cube.push(new Cubie(x, y, z));
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let savedSecond = 0;

function draw() {
  background(backgroundFill);
  scale(55);
  drawCube();
  updateTurn();
}

function keyTyped() {
  switch (key) {
    // X-Axis
    case '1':
      pushTurn(xAxis, -1);
      break;
    case '2':
      pushTurn(xAxis, 0);
      break;
    case '3':
      pushTurn(xAxis, 1);
      break;

    // Y-Axis
    case '4':
      pushTurn(yAxis, -1);
      break;
    case '5':
      pushTurn(yAxis, 0);
      break;
    case '6':
      pushTurn(yAxis, 1);
      break;

    // Z-Axis
    case '7':
      pushTurn(zAxis, -1);
      break;
    case '8':
      pushTurn(zAxis, 0);
      break;
    case '9':
      pushTurn(zAxis, 1);
      break;
  }
}

function drawGrid(num) {
  let c = color(255, 255, 255, 20);
  stroke(c);
  strokeWeight(0.1);
  let step = num / 2;
  for (let x = -num; x <= num; x += step) {
    for (let y = -num; y <= num; y += step) {
      line(x, y, num, x, y, -num);
    }
  }
  for (let z = -num; z <= num; z += step) {
    for (let y = -num; y <= num; y += step) {
      line(num, y, z, -num, y, z);
    }
  }
  for (let x = -num; x <= num; x += step) {
    for (let z = -num; z <= num; z += step) {
      line(x, num, z, x, -num, z);
    }
  }
}

// function updateStats() {
//   textFont(font);
//   textSize(0.5);
//   fill(255);
//
//   push();
//   textAlign(RIGHT, CENTER);
//   rotate(HALF_PI, new p5.Vector(0, 1, 0));
//   translate(1.5, -3, -2);
//   text('3D Rubiks Cube', 0, 0);
//   pop();
//
//   push();
//   textSize(0.25);
//   textAlign(RIGHT, CENTER);
//   rotate(HALF_PI, new p5.Vector(0, 1, 0));
//   translate(1.5, -2.5, -2);
//   text('Open source project', 0, 0);
//   pop();
//
//   push();
//   textSize(0.25);
//   textAlign(RIGHT, CENTER);
//   rotate(HALF_PI, new p5.Vector(0, 1, 0));
//   translate(1.5, -2.1, -2);
//   text('@smitbarmase', 0, 0);
//   pop();
//
//   push();
//   textAlign(LEFT, CENTER);
//   translate(-1.5, -3, -2);
//   text('In JavaScript', 0, 0);
//   pop();
//
//   push();
//   textSize(0.25);
//   textAlign(LEFT, CENTER);
//   translate(-1.5, -2.5, -2);
//   text('p5.js | p5.easycam.js', 0, 0);
//   pop();
//
//   push();
//   textSize(0.25);
//   textAlign(LEFT, CENTER);
//   translate(-1.5, -2.1, -2);
//   text('FPS ' + round(random(30, 60)), 0, 0);
//   pop();
// }
