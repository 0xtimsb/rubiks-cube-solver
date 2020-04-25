class Cubie {
  constructor(x, y, z) {
    this.defaultPos = new p5.Vector(x, y, z); // constant.
    this.rotation = new p5.Vector(0, 0, 1);
    this.x = x;
    this.y = y;
    this.z = z;
    this.faces = [];
    this.setFaces();
  }

  setFaces() {
    if (this.z == 1) {
      this.faces.push(new Face(new p5.Vector(0, 0, 1), '#abce53', 'G')); // G // +z
    } else if (this.z == -1) {
      this.faces.push(new Face(new p5.Vector(0, 0, -1), '#3cacde', 'B')); // B // -z
    }
    if (this.x == 1) {
      this.faces.push(new Face(new p5.Vector(1, 0, 0), '#dc4b4b', 'R')); // R // +x
    } else if (this.x == -1) {
      this.faces.push(new Face(new p5.Vector(-1, 0, 0), '#e4773c', 'O')); // O // -x
    }
    if (this.y == 1) {
      this.faces.push(new Face(new p5.Vector(0, 1, 0), '#f9e534', 'Y')); // Y // +y
    } else if (this.y == -1) {
      this.faces.push(new Face(new p5.Vector(0, -1, 0), '#ffffff', 'W')); // W // -y
    }
  }

  turnFaces(axis) {
    this.faces.forEach((face, i) => {
      turnMath(face.normal, HALF_PI * animateDirection, axis);
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

class Face {
  constructor(normal, c, id) {
    this.normal = normal;
    this.c = c;
    this.colorId = id;
  }

  show() {
    push();
    fill(this.c);
    strokeWeight(0);
    translate(this.normal.x * 0.5 * wallHeight, this.normal.y * 0.5 * wallHeight, this.normal.z * 0.5 * wallHeight);
    if (abs(this.normal.x) > 0) {
      rotateY(HALF_PI * animateDirection);
    } else if (abs(this.normal.y) > 0) {
      rotateX(HALF_PI * animateDirection);
    }
    rectMode(CENTER);
    rect(0, 0, wallScale, wallScale);
    pop();
  }
}