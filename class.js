class Cubie {
  constructor(x, y, z) {
    this.defaultPos = new p5.Vector(x, y, z); // Actual default position. Always constant.
    this.pos = new p5.Vector(x, y, z); // Actual position used to draw cube.
    this.pointer = new p5.Vector(0, 0, 1); // Actual pointer same for all cubies by default.

    // Virtual position used to look at cube from diffrent direction.
    this.vDefaultPos = new p5.Vector();
    this.vPos = new p5.Vector();
    this.vPointer = new p5.Vector();

    this.faces = [];
    this.setFaces();
  }

  setViewPort(orientation) {
    switch (orientation) {
      case 'green':
        this.vPos.set(this.pos.x, this.pos.y, this.pos.z);
        this.vDefaultPos.set(this.defaultPos.x, this.defaultPos.y, this.defaultPos.z);
        this.vPointer.set(this.pointer.x, this.pointer.y, this.pointer.z);
        break;
      case 'red':
        this.vPos.set(-this.pos.z, this.pos.y, this.pos.x);
        this.vDefaultPos.set(-this.defaultPos.z, this.defaultPos.y, this.defaultPos.x);
        this.vPointer.set(-this.pointer.z, this.pointer.y, this.pointer.x);
        break;
      case 'blue':
        this.vPos.set(-this.pos.x, this.pos.y, -this.pos.z);
        this.vDefaultPos.set(-this.defaultPos.x, this.defaultPos.y, -this.defaultPos.z);
        this.vPointer.set(-this.pointer.x, this.pointer.y, -this.pointer.z);
        break;
      case 'orange':
        this.vPos.set(this.pos.z, this.pos.y, -this.pos.x);
        this.vDefaultPos.set(this.defaultPos.z, this.defaultPos.y, -this.defaultPos.x);
        this.vPointer.set(this.pointer.z, this.pointer.y, -this.pointer.x);
        break;
    }
  }

  setFaces() {
    if (this.pos.z == 1) {
      this.faces.push(new Face(new p5.Vector(0, 0, 1), '#abce53', 'G')); // G // +z
    } else if (this.pos.z == -1) {
      this.faces.push(new Face(new p5.Vector(0, 0, -1), '#3cacde', 'B')); // B // -z
    }
    if (this.pos.x == 1) {
      this.faces.push(new Face(new p5.Vector(1, 0, 0), '#dc4b4b', 'R')); // R // +x
    } else if (this.pos.x == -1) {
      this.faces.push(new Face(new p5.Vector(-1, 0, 0), '#e4773c', 'O')); // O // -x
    }
    if (this.pos.y == 1) {
      this.faces.push(new Face(new p5.Vector(0, 1, 0), '#f9e534', 'Y')); // Y // +y
    } else if (this.pos.y == -1) {
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
    translate(new p5.Vector(this.pos.x, this.pos.y, this.pos.z));
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