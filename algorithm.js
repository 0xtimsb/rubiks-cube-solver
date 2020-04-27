let shuffleBool = false;
let playBool = false;

function keyTyped() {
  if (!shuffleBool) {
    shuffleBool = true;
    shuffleCube(20);
  } else {
    if (turnQueue == 0 && playBool == false) {
      playBool = true;
    }
  }
}

function shuffleCube(steps) {
  let slot = ['F','~F','R','~R','L','~L','U','~U','D','~D','B','~B'];
  setView();
  for (let i = 0; i < steps; i++) {
    index = Math.floor(Math.random() * slot.length);
    pushTurns([slot[index]]);
  }
}

let playStep = 0;

function play() {
  if (playBool == true && turnQueue.length == 0 && animate == false) {
    switch (playStep) {
      case 0:
        if (makeBottomPlus()) {  // Needs optimization. Reduce probablity of flipped colors at edge-bottom.
          playStep++;
        }
        break;
      case 1:
        if (makeBottomCorner()) { // Needs optimization. Reduce propablity of flipped colors at bottom - corner.
          playStep++;
        }
        break;
      case 2:
        if (makeSideEdges()) {
          playStep++;
        }
        break;
      case 3:
        if (makeTopCross()) {
          playStep++;
        }
        break;
      case 4:
        if (makeTopWhite()) {
          playStep++;
          console.log('top');
        }
        break;
      case 5:
        if (alignWhiteCorners()) {
          playStep++;
        }
        break;
      case 6:
        console.log('Done');
      break;
    }
  }
}

function makeWhiteCorners() {
  let topCorners = getCubiesAtYDefault(-1).filter((qb) => abs(qb.defaultPos.x) + abs(qb.defaultPos.z) == 2);
  if (topCorners.every((c) => c.pointer.equals(defaultRot))) {
    return true;
  } else {
    for (let a = 0; a < 2; a++) {
      for (let i = 0; i < topCorners.length; i++) {
        let qb = topCorners[i];
        setView(qb);
        switch(a) {
          case 0:
            if (checkAdjacentCorners(topCorners)) {
              return false;
            }
            break;
          case 1:
            if (checkDiagonalCorners(topCorners)) {
              return false;
            }
            break;
        }
      }
   }
  }
}

function makeTopWhite() {
  let topCorners = getCubiesAtYDefault(-1).filter((qb) => abs(qb.defaultPos.x) + abs(qb.defaultPos.z) == 2);
  if (topCorners.every((c) => c.pointer.equals(defaultRot))) {
    return true;
  } else {
    for (let a = 0; a < 2; a++) {
      for (let i = 0; i < topCorners.length; i++) {
        let qb = topCorners[i];
        setView(qb);
        switch(a) {
          case 0:
            if (checkTopCorner(topCorners)) {
              return false;
            }
            break;
          case 1:
            pushTurns(['R','U','~R','U','R','U','U','~R']);
            return false;
        }
      }
   }
  }
}

function checkTopCorner(topCorners) {
  if (topCorners.some((qb) => qb.vPos.x == -1 && qb.vPos.z == 1 && qb.vPointer.equals(vDefaultRot))) {
    pushTurns(['R','U','~R','U','R','U','U','~R']);
    return true;
  }
  return false;
}


function makeTopCross() {
  let topCrossCubies = getCubiesAtYDefault(-1).filter((qb) => abs(qb.defaultPos.x + qb.defaultPos.z) == 1);
  if (topCrossCubies.every((c) => c.pointer.equals(defaultRot))) {
    return true;
  } else {
    for (let a = 0; a < 3; a++) {
      for (let i = 0; i < topCrossCubies.length; i++) {
        let qb = topCrossCubies[i];
        setView(qb);
        switch(a) {
          case 0:
            if (checkHorizontal(topCrossCubies)) {
              return false;
            }
            break;
          case 1:
            if (checkLSign(topCrossCubies)) {
              return false;
            }
            break;
          case 2:
            pushTurns(['F','U','R','~U','~R','~F', 'U']);
            return false;
        }
      }
   }
  }
}

function checkLSign(topCrossCubies) {
  // Check if L sign is made.
  if (topCrossCubies.some((qb) => qb.vPos.x == 0 && qb.vPos.z == -1 && qb.vPointer.equals(vDefaultRot))) {
    if (topCrossCubies.some((qb) => qb.vPos.x == -1 && qb.vPos.z == 0 && qb.vPointer.equals(vDefaultRot))) {
      pushTurns(['F','U','R','~U','~R','~F']);
      return true;
    }
  }
  return false;
}


function checkHorizontal(topCrossCubies) {
  // Check if horizontal line is made.
  if (topCrossCubies.some((qb) => qb.vPos.x == 1 && qb.vPos.z == 0 && qb.vPointer.equals(vDefaultRot))) {
    if (topCrossCubies.some((qb) => qb.vPos.x == -1 && qb.vPos.z == 0 && qb.vPointer.equals(vDefaultRot))) {
      pushTurns(['F','U','R','~U','~R','~F']);
      return true;
    }
  }
  return false;
}

function makeSideEdges() {
  let sideEdgeCubies = getCubiesAtYDefault(0).filter((qb) => abs(qb.defaultPos.x) + abs(qb.defaultPos.z) == 2);
  for (let i = 0; i < sideEdgeCubies.length; i++) {
    let qb = sideEdgeCubies[i];
    if (qb.defaultPos.x != qb.pos.x || qb.defaultPos.y != qb.pos.y || qb.defaultPos.z != qb.pos.z || qb.pointer.equals(defaultRot) == false) {
      setView(qb);
      makeSideEdgesQb(qb);
      return false;
    }
    if (i == sideEdgeCubies.length - 1) {
      return true;
    }
  }
}

function makeSideEdgesQb(qb) {
  // At top layer. Middle.
  if (qb.vPos.y == -1) {
    if (qb.vDefaultPos.x == 1 && qb.vDefaultPos.z == 1) { // If default location is at right-middle.
      pushTurns(['U', 'R', '~U', '~R', '~U', '~F', 'U', 'F']);
    } else if (qb.vDefaultPos.x == -1 && qb.vDefaultPos.z == 1) {
      pushTurns(['U']);
    } else if (qb.vDefaultPos.x == 1 && qb.vDefaultPos.z == -1) {
      pushTurns(['~U']);
    } else {
      pushTurns(['~U', '~U']);
    }
  } else { // At middle layer. Right.
    if (qb.vPos.x == qb.vDefaultPos.x && qb.vPos.z == qb.vDefaultPos.z) { // If default location is at middle.
      // Conditions to place at perfect orientation.
      if (qb.vPointer.equals(vDefaultRot) == false) { // If at place, but at wrong orientation.
        pushTurns(['R', '~U', '~R', 'U', 'R', '~U', '~R', 'U', 'R', 'U', 'U', '~R', '~F', 'U', 'U', 'F']);
      }
    } else if (qb.vPos.x != qb.vDefaultPos.x && qb.vPos.z == qb.vDefaultPos.z) { // At other side
      pushTurns(['U', 'R', '~U', '~R', '~U', '~F', 'U', 'F']); // Will put it on the top - middle.
    } else { // At other side side OR diagonal side.
      pushTurns(['U', 'R', '~U', '~R', '~U', '~F', 'U', 'F', '~U']); // Will put it on other middle.
    }
  }
}

function makeBottomCorner() {
  let cornerCubies = getCubiesAtYDefault(1).filter((qb) => abs(qb.defaultPos.x) + abs(qb.defaultPos.z) == 2);
  for (let i = 0; i < cornerCubies.length; i++) {
    let qb = cornerCubies[i];
    if (qb.defaultPos.x != qb.pos.x || qb.defaultPos.y != qb.pos.y || qb.defaultPos.z != qb.pos.z || qb.pointer.equals(defaultRot) == false) {
      setView(qb);
      makeBottomCornerQb(qb);
      return false;
    }
    if (i == cornerCubies.length - 1) {
      return true;
    }
  }
}

function makeBottomCornerQb(qb) {
  // At top layer.
  if (qb.vPos.y == -1) {
    if (qb.vPos.x == qb.vDefaultPos.x && qb.vPos.z == qb.vDefaultPos.z) { // If default location is at bottom.
      if (qb.vPointer.equals(vDefaultRot)) { // Conditions to place at perfect orientation.
        pushTurns(['~U', '~F', 'U', 'F']);
      } else {
        pushTurns(['U', 'R', '~U', '~R']);
      }
    } else if (qb.vPos.x != qb.vDefaultPos.x && qb.vPos.z == qb.vDefaultPos.z) {
      pushTurns(['U']);
    } else {
      pushTurns(['~U']);
    }
  } else { // At bottom layer.
    if (qb.vPos.x == qb.vDefaultPos.x && qb.vPos.z == qb.vDefaultPos.z) { // If default location is at bottom.
      // Conditions to place at perfect orientation.
      if (qb.vPointer.equals(vDefaultRot) == false) { // If at place, but at wrong orientation.
        pushTurns(['R', 'U', '~R', '~U', '~U', '~F', 'U', 'F']);
      }
    } else if (qb.vPos.x != qb.vDefaultPos.x && qb.vPos.z == qb.vDefaultPos.z) { // At other side
      pushTurns(['R', 'U', '~R']); // Will put it on the top of other exact side.
    } else { // At other side side OR diagonal side.
      pushTurns(['~F', '~U', 'F']);
    }
  }
}

function makeBottomPlus() {
  let edgeCubies = getCubiesAtYDefault(1).filter((qb) => abs(qb.defaultPos.x + qb.defaultPos.z) == 1);
  for (let i = 0; i < edgeCubies.length; i++) {
    let qb = edgeCubies[i];
    if (qb.defaultPos.x != qb.pos.x || qb.defaultPos.y != qb.pos.y || qb.defaultPos.z != qb.pos.z || qb.pointer.equals(defaultRot) == false) {
      setView(qb);
      makeBottomPlusQb(qb);
      return false;
    }
    if (i == edgeCubies.length - 1) {
      return true;
    }
  }
}

function makeBottomPlusQb(qb) {
  if (qb.vPos.y == 1) { // If at bottom layer on y-axis.
    if (qb.vPos.x != qb.vDefaultPos.x || qb.vPos.y != qb.vDefaultPos.y || qb.vPos.z != qb.vDefaultPos.z) { // If not at correct position.
      if (qb.vDefaultPos.x == -1) {
        pushTurns(['F']);
      } else if (qb.vDefaultPos.x == 1) {
        pushTurns(['~F']);
      } else {
        pushTurns(['F', 'F']);
      }
    } else { // If at correct position.
      if (qb.vPointer.equals(vDefaultRot) == false) { // If not in correct orientation.
        pushTurns(['~F', 'R', 'U', '~R', 'F', 'F']);
      }
    }
  } else if (qb.vPos.y == 0) { // If at middle layer on y-axis.
    if (qb.vDefaultPos.x == 1) {
      pushTurns(['~R']); // Transalate to place. //Maybe optimised more so that we dont need to flip color later.
    } else if (qb.vDefaultPos.z == 1) {
      pushTurns(['F']); // At place.
    } else {
      pushTurns(['~F', 'U', 'F']); // Bring it to top
    }
  } else if (qb.vPos.y == -1) { // If at top layer on y-axis.
    if (qb.vPos.x == qb.vDefaultPos.x && qb.vPos.z == qb.vDefaultPos.z) {  // If just on the top of its actual position.
      pushTurns(['F', 'F']);
    } else { // Not below actual position.
      if (qb.vDefaultPos.x == -1) {
        pushTurns(['U']);
      } else if (qb.vDefaultPos.x == 1) {
        pushTurns(['~U']);
      } else {
        pushTurns(['U', 'U']);
      }
    }
  }
}

function getCubiesAtYDefault(yIndex) {
  result = [];
  for (let i = 0; i < cube.length; i++) {
    if (cube[i].defaultPos.y == yIndex) {
      result.push(cube[i]);
    }
  }
  return result;
}