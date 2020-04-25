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
    setView('green');
    pushTurns([slot[index]]);
  }
}

let playStep = 0;

function play() {
  if (playBool == true && turnQueue.length == 0 && animate == false) {
    makeBottomPlus();
  }
}

// function makeBottomCorner() {
//   let yellowQbs = getCubieOfColors(['Y']);
//   for (let i = 0; i < yellowQbs.length; i++) {
//     let qb = yellowQbs[i];
//     // Selecting all yellow corners cubies.
//     if (abs(qb.defaultPos.x) + abs(qb.defaultPos.z) == 2) {
//       if (qb.defaultPos.x != qb.x || qb.defaultPos.y != qb.y || qb.defaultPos.z != qb.z || qb.rotation.equals(defaultRot) == false) {
//         // Selecting default edge piece they are and check if it is all set or not.
//         makeBottomCornerQb(qb);
//         return false;
//       }
//     }
//     if (i == yellowQbs.length - 1) {
//       return true;
//     }
//   }
// }


// function makeBottomCornerQb(qb) {
//   // At top layer.
//   if (qb.y == -1) {
//     if (qb.z == 1) {
//       if (qb.x == +1) { // At top - right corner
//         if (qb.x == qb.defaultPos.x && qb.z == qb.defaultPos.z) { // If default location is at bottom.
//           // Conditions to place at perfect orientation.
//           if (qb.rotation == defaultRot) {
//             setView('green-yellow');
//             pushTurns(['~U', '~F', 'U', 'F']);
//           } else {
//             setView('green-yellow');
//             pushTurns(['U', 'R', '~U', '~R']);
//           }
//         } else if (qb.x != qb.defaultPos.x && qb.z == qb.defaultPos.z) { // At other side of green-yellow side.
//           setView('green-yellow');
//           pushTurns(['F']);
//         } else { // At other side of red - yellow side OR diagonal side.
//           setView('green-yellow');
//           pushTurns(['~F']);
//         }
//       } else if (qb.x == -1) { // At top - left corner
//         if (qb.x == qb.defaultPos.x && qb.z == qb.defaultPos.z) { // If default location is at bottom.
//           // Conditions to place at perfect orientation.
//           if (qb.rotation == defaultRot) {
//             setView('green-yellow');
//             pushTurns(['U', 'F', '~U', '~F']);
//           } else {
//             setView('green-yellow');
//             pushTurns(['~U', '~L', 'U', 'L']);
//           }
//         } else if (qb.x != qb.defaultPos.x && qb.z == qb.defaultPos.z) { // At other side of green-yellow side.
//           setView('green-yellow');
//           pushTurns(['~F']);
//         } else { // At other side of red - yellow side OR diagonal side.
//           setView('green-yellow');
//           pushTurns(['F']);
//         }
//       }
//     } else { // z == -1
//       if (qb.x == -1) { // At top - left corner
//         if (qb.x == qb.defaultPos.x && qb.z == qb.defaultPos.z) { // If default location is at bottom.
//           // Conditions to place at perfect orientation.
//           if (qb.rotation == defaultRot) {
//             setView('blue-yellow');
//             pushTurns(['U', 'F', '~U', '~F']);
//           } else {
//             setView('blue-yellow');
//             pushTurns(['~U', '~L', 'U', 'L']);
//           }
//         } else if (qb.x != qb.defaultPos.x && qb.z == qb.defaultPos.z) { // At other side of blue-yellow side.
//           setView('blue-yellow');
//           pushTurns(['~F']);
//         } else { // At other side of red - yellow side OR diagonal side.
//           setView('blue-yellow');
//           pushTurns(['F']);
//         }
//       } else if (qb.x == +1) { // At top - right corner
//         if (qb.x == qb.defaultPos.x && qb.z == qb.defaultPos.z) { // If default location is at bottom.
//           // Conditions to place at perfect orientation.
//           if (qb.rotation == defaultRot) {
//             setView('blue-yellow');
//             pushTurns(['~U', '~F', 'U', 'F']);
//           } else {
//             setView('blue-yellow');
//             pushTurns(['U', 'R', '~U', '~R']);
//           }
//         } else if (qb.x != qb.defaultPos.x && qb.z == qb.defaultPos.z) { // At other side of blue-yellow side.
//           setView('blue-yellow');
//           pushTurns(['F']);
//         } else { // At other side of red - yellow side OR diagonal side.
//           setView('blue-yellow');
//           pushTurns(['~F']);
//         }
//       }
//     }
//   } else { // At bottom layer.

//   }
// }

function makeBottomPlus() {
  let yellowQbs = getCubieOfColors(['Y']);
  for (let i = 0; i < yellowQbs.length; i++) {
    let qb = yellowQbs[i];
    // Selecting all yellow edges cubies.
    if (abs(qb.defaultPos.x + qb.defaultPos.z) == 1) {
      if (qb.defaultPos.x != qb.pos.x || qb.defaultPos.y != qb.pos.y || qb.defaultPos.z != qb.pos.z || qb.pointer.equals(defaultRot) == false) {
        // Selecting default edge piece they are and check if it is all set or not.
        makeBottomPlusQb(qb);
        break;
      }
    }
  }
}

function makeBottomPlusQb(qb) {
  if (qb.pos.y == 1 && (qb.pos.x != qb.defaultPos.x || qb.pos.y != qb.defaultPos.y || qb.pos.z != qb.defaultPos.z)) {
    // If at bottom layer on y-axis. Not at place. // Bring it to middle if adjacent else bring it to top.
    if (qb.pos.z == -1) {
      setView('blue');
    } else if (qb.pos.x == +1) {
      setView('red');
    } else if (qb.pos.x == -1) {
      setView('orange');
    } else {
      setView('green');
    }

    if (qb.vDefaultPos.x == -1) {
      pushTurns(['F']);
    } else if (qb.vDefaultPos.x == 1) {
      pushTurns(['~F']);
    } else {
      pushTurns(['F', 'F']);
    }
  } else if (qb.pos.y == 0) {
    // If at middle layer on y-axis. // Bring it to top if not going to fit in adjacent two sides.
    if (qb.pos.z == -1) {
      setView('blue');
    } else { // qb.pos.z == +1
      setView('green');
    }
    if (qb.vPos.x == -1) {
      if (qb.vDefaultPos.x == -1) {
        pushTurns(['L']); // At place.
      } else if (qb.vDefaultPos.z == 1) {
        pushTurns(['~F']); // At place.
      } else {
        pushTurns(['F', 'U', '~F']); // Bring it to top
      }
    } else { // qb.vPos.x == +1
      if (qb.vDefaultPos.x == 1) {
        pushTurns(['~R']); // At place.
      } else if (qb.vDefaultPos.z == 1) {
        pushTurns(['F']); // At place.
      } else {
        pushTurns(['~F', 'U', 'F']); // Bring it to top
      }
    }
  } else if (qb.pos.y == -1) { // If at top layer on y-axis.
    if (qb.pos.x == qb.defaultPos.x && qb.pos.z == qb.defaultPos.z) {
      // If just on the top of its actual position.
      if (qb.z == -1) {
        setView('blue');
      } else if (qb.x == +1) {
        setView('red');
      } else if (qb.x == -1) {
        setView('orange');
      } else {
        setView('green');
      }
      pushTurns(['F', 'F']);
    } else {
      // If not on just top. Rotate conditionally if 90 degree apart. Else if 180 degree rotate anywhere.
      if (qb.z == -1) {
        setView('blue');
      } else if (qb.x == +1) {
        setView('red');
      } else if (qb.x == -1) {
        setView('orange');
      } else {
        setView('green');
      }
      if (qb.vDefaultPos.x == -1) {
        pushTurns(['U']);
      } else if (qb.vDefaultPos.x == 1) {
        pushTurns(['~U']);
      } else {
        pushTurns(['U', 'U']);
      }
    }
  } else if (qb.pointer.equals(defaultRot) == false) {
    //If default pieces have their colors are filped. Not in right rotation.  // Optimize this occururence.
    if (qb.z == -1) {
      setView('blue');
    } else if (qb.x == +1) {
      setView('red');
    } else if (qb.x == -1) {
      setView('orange');
    } else {
      setView('green');
    }
    // Flip bottom-middle edge colors. Without distrubing other middle edges on same face.
    pushTurns(['~F', 'R', 'U', '~R', 'F', 'F']);
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