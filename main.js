// Global variables.
let cube = [];
let animate = false;
let t = 0;
let animateAxis; // p5.Vector
let animateIndex; // -1, 0 , 1
let turnQueue = []; // Keep track of turns clicked.
const deltaAngle = 0.17; // Radian
const wallHeight = 1.01;
const wallScale = 0.97;
const boxFill = 230;
const backgroundFill = 40;
const xAxis = new p5.Vector(1, 0, 0);
const yAxis = new p5.Vector(0, 1, 0);
const zAxis = new p5.Vector(0, 0, 1);


class Face {
  constructor(normal, c) {
    this.normal = normal;
    this.c = c;
  }

  show() {
    push();
    fill(this.c);
    strokeWeight(0);
    translate(this.normal.x * 0.5 * wallHeight, this.normal.y * 0.5 * wallHeight, this.normal.z * 0.5 * wallHeight);
    if (abs(this.normal.x) > 0) {
      rotateY(HALF_PI);
    } else if (abs(this.normal.y) > 0) {
      rotateX(HALF_PI);
    }
    rectMode(CENTER);
    rect(0, 0, wallScale, wallScale);
    pop();
  }
}

class Cubie {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.faces = new Array();
    this.faces.push(new Face(new p5.Vector(0, 0, 1), '#abce53')); // G // +z
    this.faces.push(new Face(new p5.Vector(1, 0, 0), '#dc4b4b')); // R // +x
    this.faces.push(new Face(new p5.Vector(0, 0, -1), '#3cacde')); // B // -z
    this.faces.push(new Face(new p5.Vector(-1, 0, 0), '#e4773c')); // O // -x
    this.faces.push(new Face(new p5.Vector(0, -1, 0), '#ffffff')); // W // -y
    this.faces.push(new Face(new p5.Vector(0, 1, 0), '#f9e534')); // Y // +y
  }

  turnFaces(axis) {
    this.faces.forEach((face, i) => {
      turnMath(face.normal, HALF_PI, axis);
    });
  }

  drawCubie() {
    push();
    translate(new p5.Vector(this.x, this.y, this.z));
    strokeWeight(0);
    fill(boxFill);
    box(1);
    this.faces.forEach((face, i) => {
      face.show();
    });
    pop();
  }
}

function drawCube() {
  if (!animate) {
    cube.forEach((qb, i) => {
      qb.drawCubie();
    });
  } else {
    cube.forEach((qb, i) => {
      if (isGoingToMove(qb)) {
        push();
        rotate(t, animateAxis);
        qb.drawCubie();
        pop();
      } else {
        qb.drawCubie();
      }
    });

    t += deltaAngle;
    if (t > HALF_PI) {
      animate = false;
      cube.forEach((qb, i) => {
        if (isGoingToMove(qb)) {
          turnMath(qb, HALF_PI, animateAxis);
          qb.turnFaces(animateAxis);
        }
      });
    }
  }
}

// Turn vector using matrix multiplicaton, by given angle on given axis.
function turnMath(vector, angle, axis) {
  if (axis.equals(xAxis)) { // X
    let y = round((vector.y * cos(angle)) - (vector.z * sin(angle)));
    let z = round((vector.z * cos(angle)) + (vector.y * sin(angle)));
    vector.y = y;
    vector.z = z;
  } else if (axis.equals(yAxis)) { // Y
    let x = round((vector.x * cos(angle)) - (vector.z * sin(angle)));
    let z = round((vector.z * cos(angle)) + (vector.x * sin(angle)));
    vector.x = -x;
    vector.z = -z;
  } else if (axis.equals(zAxis)) { // Z
    let x = round((vector.x * cos(angle)) - (vector.y * sin(angle)));
    let y = round((vector.y * cos(angle)) + (vector.x * sin(angle)));
    vector.x = x;
    vector.y = y;
  }
}

// Purn new turn in queue.
function pushTurn(axis, index) {
  turnQueue.push([axis, index]);
}

// Called continously in draw() to make turn.
function updateTurn() {
  if (turnQueue.length > 0 && animate == false) {
    animateAxis = turnQueue[0][0];
    animateIndex = turnQueue[0][1];
    turnQueue.shift(); //Removes first element of turnQueue.
    animate = true;
    t = 0;
  }
}

function isGoingToMove(qb) {
  if (animateAxis.equals(xAxis)) {
    if (qb.x == animateIndex) {
      return true;
    }
  } else if (animateAxis.equals(yAxis)) {
    if (qb.y == animateIndex) {
      return true;
    }
  } else if (animateAxis.equals(zAxis)) {
    if (qb.z == animateIndex) {
      return true;
    }
  }
  return false;
}
