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

    t += deltaAngle * animateDirection;
    if (abs(t) > HALF_PI) {
      cube.forEach((qb, i) => {
        if (isGoingToMove(qb)) {
          turnMath(qb.pos, HALF_PI * animateDirection, animateAxis);
          turnMath(qb.pointer, HALF_PI * animateDirection, animateAxis);
          qb.turnFaces(animateAxis);
          qb.setViewPort();
        }
      });
      animate = false;
    }
  }
}

// Turn vector using matrix multiplicaton, by given angle on given axis.
function turnMath(vector, angle, axis) {
  if (abs(axis.x) == 1) { // X
    let y = round((vector.y * cos(angle)) - (vector.z * sin(angle)));
    let z = round((vector.z * cos(angle)) + (vector.y * sin(angle)));
    vector.y = y;
    vector.z = z;
  } else if (abs(axis.y) == 1) { // Y
    let x = round((vector.x * cos(angle)) - (vector.z * sin(angle)));
    let z = round((vector.z * cos(angle)) + (vector.x * sin(angle)));
    vector.x = -x;
    vector.z = -z;
  } else if (abs(axis.z) == 1) { // Z
    let x = round((vector.x * cos(angle)) - (vector.y * sin(angle)));
    let y = round((vector.y * cos(angle)) + (vector.x * sin(angle)));
    vector.x = x;
    vector.y = y;
  }
}

// Diffrent view to make moves.
function setView(string) {
  orientation = string;
  for (let i = 0; i < cube.length; i++) {
    cube[i].setViewPort();
  }
  switch (orientation) {
    case 'green':
      view = ['F', 'R', 'B', 'L', 'U', 'D'];
      break;
    case 'red':
      view = ['L', 'F', 'R', 'B', 'U', 'D'];
      break;
    case 'blue':
      view = ['B', 'L', 'F', 'R', 'U', 'D'];
      break;
    case 'orange':
      view = ['R', 'B', 'L', 'F', 'U', 'D'];
      break;
  }
}

// Purn new turn in queue.
function pushTurns(turnList) {
  turnList.forEach((turn) => {
    switch (turn) {
      // Front
      case view[0]:
        turnQueue.push([zAxis, 1, 1]);
        break;
      case '~' + view[0]:
        turnQueue.push([zAxis, 1, -1]);
        break;
      // Right
      case view[1]:
        turnQueue.push([xAxis, 1, 1]);
        break;
      case '~' + view[1]:
        turnQueue.push([xAxis, 1, -1]);
        break;
      // Back
      case view[2]:
        turnQueue.push([zAxis, -1, -1]);
        break;
      case '~' + view[2]:
        turnQueue.push([zAxis, -1, 1]);
        break;
      // Left
      case view[3]:
        turnQueue.push([xAxis, -1, -1]);
        break;
      case '~' + view[3]:
        turnQueue.push([xAxis, -1, 1]);
        break;
      // Up
      case view[4]:
        turnQueue.push([yAxis, -1, -1]);
        break;
      case '~' + view[4]:
        turnQueue.push([yAxis, -1, 1]);
        break;
      // Down
      case view[5]:
        turnQueue.push([yAxis, 1, 1]);
        break;
      case '~' + view[5]:
        turnQueue.push([yAxis, 1, -1]);
        break;
    }
  });
}

// Called continously in draw() to make turn.
function updateTurn() {
  if (turnQueue.length > 0 && animate == false) {
    animateAxis = turnQueue[0][0];
    animateIndex = turnQueue[0][1];
    animateDirection = turnQueue[0][2];
    turnQueue.shift(); //Removes first element of turnQueue.
    animate = true;
    t = 0;
  }
}

function isGoingToMove(qb) {
  if (abs(animateAxis.x) == 1) {
    if (qb.pos.x == animateIndex) {
      return true;
    }
  } else if (abs(animateAxis.y) == 1) {
    if (qb.pos.y == animateIndex) {
      return true;
    }
  } else if (abs(animateAxis.z) == 1) {
    if (qb.pos.z == animateIndex) {
      return true;
    }
  }
  return false;
}
