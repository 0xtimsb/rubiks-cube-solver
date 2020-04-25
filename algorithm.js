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
  for (let i = 0; i < steps; i++) {
    index = Math.floor(Math.random() * slot.length);
    setView('green-yellow');
    pushTurns([slot[index]]);
  }
}

function play() {
  if (playBool == true && turnQueue.length == 0 && animate == false) {
    let yellowQbs = getCubieOfColors(['Y']);
    for (let i = 0; i < yellowQbs.length; i++) {
      let qb = yellowQbs[i];
      if (abs(qb.defaultPos.x + qb.defaultPos.z) == 1 && (qb.defaultPos.x != qb.x || qb.defaultPos.y != qb.y || qb.defaultPos.z != qb.z || qb.rotation.equals(defaultRot) == false)) {
        // Selecting default edge piece they are and check if it is all set or not.
        makeBottomPlus(qb);
        break;
      }
    }
  }
}

function makeBottomPlus(qb) {
  if (qb.y == 1 && (qb.x != qb.defaultPos.x || qb.y != qb.defaultPos.y || qb.z != qb.defaultPos.z)) {
    // If at bottom layer on y-axis. Not at place. // Bring it to middle if adjacent else bring it to top.
    if (qb.z == -1) {
      setView('blue-yellow');
      if (qb.defaultPos.x == 1) {
        pushTurns(['F']);
      } else if (qb.defaultPos.x == -1) {
        pushTurns(['~F']);
      } else {
        pushTurns(['F', 'F']);
      }
    } else if (qb.x == +1) {
      setView('red-yellow');
      if (qb.defaultPos.z == 1) {
        pushTurns(['F']);
      } else if (qb.defaultPos.z == -1) {
        pushTurns(['~F']);
      } else {
        pushTurns(['F', 'F']);
      }
    } else if (qb.x == -1) {
      setView('orange-yellow');
      if (qb.defaultPos.z == -1) {
        pushTurns(['F']);
      } else if (qb.defaultPos.z == 1) {
        pushTurns(['~F']);
      } else {
        pushTurns(['F', 'F']);
      }
    } else {
      setView('green-yellow');
      if (qb.defaultPos.x == -1) {
        pushTurns(['F']);
      } else if (qb.defaultPos.x == 1) {
        pushTurns(['~F']);
      } else {
        pushTurns(['F', 'F']);
      }
    }
  } else if (qb.y == 0) {
    // If at middle layer on y-axis. // Bring it to top if not going to fit in adjacent two sides.
    if (qb.z == -1) {
      setView('blue-yellow');
      if (qb.x == 1) {
        if (qb.defaultPos.x == 1) {
          pushTurns(['L']); // At place.
        } else if (qb.defaultPos.z == -1) {
          pushTurns(['~F']); // At place.
        } else {
          pushTurns(['F', 'U', '~F']); // Bring it to top
        }
      } else {
        if (qb.defaultPos.x == -1) {
          pushTurns(['~R']); // At place.
        } else if (qb.defaultPos.z == -1) {
          pushTurns(['F']); // At place.
        } else {
          pushTurns(['~F', 'U', 'F']); // Bring it to top
        }
      }
    } else { // When qb.z == +1
      setView('green-yellow');
      if (qb.x == -1) {
        if (qb.defaultPos.x == -1) {
          pushTurns(['L']); // At place.
        } else if (qb.defaultPos.z == 1) {
          pushTurns(['~F']); // At place.
        } else {
          pushTurns(['F', 'U', '~F']); // Bring it to top
        }
      } else {
        if (qb.defaultPos.x == 1) {
          pushTurns(['~R']); // At place.
        } else if (qb.defaultPos.z == 1) {
          pushTurns(['F']); // At place.
        } else {
          pushTurns(['~F', 'U', 'F']); // Bring it to top
        }
      }
    }
  } else if (qb.y == -1) { // If at top layer on y-axis.
    if (qb.x == qb.defaultPos.x && qb.z == qb.defaultPos.z) {
      // If just on the top of its actual position.
      if (qb.z == -1) {
        setView('blue-yellow');
      } else if (qb.x == +1) {
        setView('red-yellow');
      } else if (qb.x == -1) {
        setView('orange-yellow');
      } else {
        setView('green-yellow');
      }
      pushTurns(['F', 'F']);
    } else {
      // If not on just top. Rotate conditionally if 90 degree apart. Else if 180 degree rotate anywhere.
      if (qb.z == -1) {
        setView('blue-yellow');
        if (qb.defaultPos.x == 1) {
          pushTurns(['U']);
        } else if (qb.defaultPos.x == -1) {
          pushTurns(['~U']);
        } else {
          pushTurns(['U', 'U']);
        }
      } else if (qb.x == +1) {
        setView('red-yellow');
        if (qb.defaultPos.z == 1) {
          pushTurns(['U']);
        } else if (qb.defaultPos.z == -1) {
          pushTurns(['~U']);
        } else {
          pushTurns(['U', 'U']);
        }
      } else if (qb.x == -1) {
        setView('orange-yellow');
        if (qb.defaultPos.z == -1) {
          pushTurns(['U']);
        } else if (qb.defaultPos.z == 1) {
          pushTurns(['~U']);
        } else {
          pushTurns(['U', 'U']);
        }
      } else {
        setView('green-yellow');
        if (qb.defaultPos.x == -1) {
          pushTurns(['U']);
        } else if (qb.defaultPos.x == 1) {
          pushTurns(['~U']);
        } else {
          pushTurns(['U', 'U']);
        }
      }
    }
  } else if (qb.rotation.equals(defaultRot) == false) {
    //If default pieces have their colors are filped. Not in right rotation.
    if (qb.z == -1) {
      setView('blue-yellow');
    } else if (qb.x == +1) {
      setView('red-yellow');
    } else if (qb.x == -1) {
      setView('orange-yellow');
    } else {
      setView('green-yellow');
    }
    // Flip bottom-middle edge colors. Without distrubing other middle edges on same face.
    pushTurns(['~F', 'R', 'U', '~R', 'F', 'F']);
  } else {
    console.log('perfect');
  }
}

// Returns list of all cubies having thoses colors in colorIdList.
function getCubieOfColors(colorIds) {
  result = [];
  for (let i = 0; i < cube.length; i++) {
    let faceColors = cube[i].faces.map((face)=>{
      return face.colorId;
    });
    if (faceColors.length >= colorIds.length) {
      let foundCount = 0;
      for (let j = 0; j < colorIds.length; j++) {
        for (let k = 0; k < faceColors.length; k++) {
          if (faceColors[k] == colorIds[j]) {
            foundCount++;
            break;
          }
        }
      }
      if (foundCount == colorIds.length) {
        result.push(cube[i]);
      }
    }
  }
  return result;
}