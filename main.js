let easycam;
let font;

// F, R, L, U, D, B and use ~ for anti-clockwise.

// Used in functions and class methods.
let cube = [];
let animate = false;
let t = 0;
let animateAxis; // Axis to rotate. (p5.Vector)
let animateIndex; // Block index to rotate (-1, 0 , 1)
let animateDirection = -1; // Clockwise, Anti-Clockwise to rotate. (+1, -1)
let turnQueue = []; // Keep track of turns clicked.

// Settings for cube.
let deltaAngle = 0.25; //0.25 // Radian to be moved.
const wallHeight = 1.01; // Cubie wall height relative to origin.
const wallScale = 0.95; // Cubie wall scale.
const boxFill = 0;
const backgroundFill = 20;
const xAxis = new p5.Vector(1, 0, 0);
const yAxis = new p5.Vector(0, 1, 0);
const zAxis = new p5.Vector(0, 0, 1);
const defaultRot = new p5.Vector(0, -1, 0); // Default rotation of cubies // To check thier rotation corectness.

let vDefaultRot = new p5.Vector();

// Use to apply algorithms at diffrent direction and rotations.
let view = [];

function preload() {
  font = loadFont('assets/Montserrat-ExtraBold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //easycam = createEasyCam();

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

let theta = 0;

let status = 'Stable';

function draw() {
  background(backgroundFill);
  theta += 0.01;
  camera(100 * cos(theta), -50, 100 * sin(theta), 0, 0, 0, 0, 1, 0);
  scale(10);
  drawCube();
  updateTurn();
  play();
}