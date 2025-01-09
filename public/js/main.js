/*----------- Game State Data ----------*/
const board = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  null,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
];

let findPiece = function (pieceId) {
  let parsed = parseInt(pieceId);
  return board.indexOf(parsed);
};

const cells = document.querySelectorAll("td");
let redsPieces = document.querySelectorAll(".red-piece");
let blacksPieces = document.querySelectorAll(".black-piece");
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurnText = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector(".divider");

let turn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces;

let selectedPiece = {
  pieceId: -1,
  indexOfBoardPiece: -1,
  isKing: false,
  space5: false,
  space1: false,
  spaceMinus1: false,
  spaceMinus5: false,
  space10: false,
  spaceMinus10: false,
  space2: false,
  spaceMinus2: false,
  kingMoves: {
    h: [],
    v: [],
  },
};

const leftBorder = [5, 10, 15, 20];
const rightBorder = [4, 9, 14, 19];

function givePiecesEventListeners() {
  if (turn) {
    for (let i = 0; i < redsPieces.length; i++) {
      redsPieces[i].addEventListener("click", getPlayerPieces);
    }
  } else {
    for (let i = 0; i < blacksPieces.length; i++) {
      blacksPieces[i].addEventListener("click", getPlayerPieces);
    }
  }
}

/*---------- Logic ----------*/

function getPlayerPieces() {
  if (turn) {
    playerPieces = redsPieces;
    console.log(playerPieces);
  } else {
    console.log(playerPieces);
    playerPieces = blacksPieces;
  }
  removeCellonclick();
  resetBorders();
}

function removeCellonclick() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.border = "none";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeAttribute("onclick");
  }
}

function resetBorders() {
  for (let i = 0; i < playerPieces.length; i++) {
    playerPieces[i].style.border = "none";
  }
  resetSelectedPieceProperties();
  getSelectedPiece();
}

function resetSelectedPieceProperties() {
  selectedPiece.pieceId = -1;
  selectedPiece.indexOfBoardPiece = -1;
  selectedPiece.isKing = false;
  selectedPiece.space5 = false;
  selectedPiece.space1 = false;
  selectedPiece.spaceMinus1 = false;
  selectedPiece.spaceMinus5 = false;
  selectedPiece.space10 = false;
  selectedPiece.spaceMinus10 = false;
  selectedPiece.space2 = false;
  selectedPiece.spaceMinus2 = false;
  selectedPiece.kingMoves.h = [];
  selectedPiece.kingMoves.v = [];
}

function getSelectedPiece() {
  console.log(event.target.id);
  selectedPiece.pieceId = parseInt(event.target.id);
  selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
  console.log(selectedPiece);
  isPieceKing();
}

function isPieceKing() {
  if (
    document.getElementById(selectedPiece.pieceId).classList.contains("king")
  ) {
    selectedPiece.isKing = true;
  } else {
    selectedPiece.isKing = false;
  }
  getAvailableSpaces();
}

function getAvailableSpaces() {
  if (board[selectedPiece.indexOfBoardPiece + 5] === null) {
    selectedPiece.space5 = true;
  }
  if (board[selectedPiece.indexOfBoardPiece - 5] === null) {
    selectedPiece.spaceMinus5 = true;
  }
  if (board[selectedPiece.indexOfBoardPiece + 1] === null) {
    if (!rightBorder.includes(selectedPiece.indexOfBoardPiece)) {
      selectedPiece.space1 = true;
    }
  }
  if (board[selectedPiece.indexOfBoardPiece - 1] === null) {
    if (!leftBorder.includes(selectedPiece.indexOfBoardPiece)) {
      selectedPiece.spaceMinus1 = true;
    }
  }
  checkAvailableJumpSpaces();
}

function checkAvailableJumpSpaces() {
  if (turn) {
    if (
      board[selectedPiece.indexOfBoardPiece + 10] === null &&
      board[selectedPiece.indexOfBoardPiece + 5] > 12 &&
      board[selectedPiece.indexOfBoardPiece + 5] !== null
    ) {
      selectedPiece.space10 = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece - 10] === null &&
      board[selectedPiece.indexOfBoardPiece - 5] > 12 &&
      board[selectedPiece.indexOfBoardPiece - 5] !== null
    ) {
      selectedPiece.spaceMinus10 = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece + 2] === null &&
      board[selectedPiece.indexOfBoardPiece + 1] > 12 &&
      board[selectedPiece.indexOfBoardPiece + 1] !== null
    ) {
      if (
        !rightBorder.includes(selectedPiece.indexOfBoardPiece) &&
        !rightBorder.includes(selectedPiece.indexOfBoardPiece + 1)
      ) {
        selectedPiece.space2 = true;
      }
    }
    if (
      board[selectedPiece.indexOfBoardPiece - 2] === null &&
      board[selectedPiece.indexOfBoardPiece - 1] > 12 &&
      board[selectedPiece.indexOfBoardPiece - 1] !== null
    ) {
      if (
        !leftBorder.includes(selectedPiece.indexOfBoardPiece) &&
        !leftBorder.includes(selectedPiece.indexOfBoardPiece - 1)
      ) {
        selectedPiece.spaceMinus2 = true;
      }
    }
  } else {
    if (
      board[selectedPiece.indexOfBoardPiece + 10] === null &&
      board[selectedPiece.indexOfBoardPiece + 5] < 12 &&
      board[selectedPiece.indexOfBoardPiece + 5] !== null
    ) {
      selectedPiece.space10 = true;
    }

    if (
      board[selectedPiece.indexOfBoardPiece - 10] === null &&
      board[selectedPiece.indexOfBoardPiece - 5] < 12 &&
      board[selectedPiece.indexOfBoardPiece - 5] !== null
    ) {
      selectedPiece.spaceMinus10 = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece + 2] === null &&
      board[selectedPiece.indexOfBoardPiece + 1] < 12 &&
      board[selectedPiece.indexOfBoardPiece + 1] !== null
    ) {
      if (
        !rightBorder.includes(selectedPiece.indexOfBoardPiece) &&
        !rightBorder.includes(selectedPiece.indexOfBoardPiece + 1)
      ) {
        selectedPiece.space2 = true;
      }
    }
    if (
      board[selectedPiece.indexOfBoardPiece - 2] === null &&
      board[selectedPiece.indexOfBoardPiece - 1] < 12 &&
      board[selectedPiece.indexOfBoardPiece - 1] !== null
    ) {
      if (
        !leftBorder.includes(selectedPiece.indexOfBoardPiece) &&
        !leftBorder.includes(selectedPiece.indexOfBoardPiece - 1)
      ) {
        selectedPiece.spaceMinus2 = true;
      }
    }
  }
  checkPieceConditions();
}

function checkPieceConditions() {
  if (selectedPiece.isKing) {
    let moveCount;
    let move;
    if (turn) {
      moveCount = selectedPiece.indexOfBoardPiece - 10;
      while (moveCount >= 0) {
        move = moveCount - selectedPiece.indexOfBoardPiece;
        if (
          move === -10 &&
          board[moveCount] === null &&
          board[moveCount + 5] === null
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        if (
          move === -15 &&
          board[moveCount] === null &&
          ((board[moveCount + 5] === null && board[moveCount + 10] === null) ||
            (board[moveCount + 5] > 12 && board[moveCount + 10] === null))
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        if (
          move === -20 &&
          board[moveCount] === null &&
          ((board[moveCount + 5] === null &&
            board[moveCount + 10] === null &&
            board[moveCount + 15] === null) ||
            (board[moveCount + 5] > 12 &&
              board[moveCount + 10] === null &&
              board[moveCount + 15] === null))
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        moveCount += -5;
      }
      moveCount = selectedPiece.indexOfBoardPiece + 10;
      while (moveCount <= 24) {
        move = moveCount - selectedPiece.indexOfBoardPiece;
        if (
          move === 10 &&
          board[moveCount] === null &&
          board[moveCount - 5] === null
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        if (
          move === 15 &&
          board[moveCount] === null &&
          ((board[moveCount - 5] === null && board[moveCount - 10] === null) ||
            (board[moveCount - 5] > 12 && board[moveCount - 10] === null))
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        if (
          move === 20 &&
          board[moveCount] === null &&
          ((board[moveCount - 5] === null &&
            board[moveCount - 10] === null &&
            board[moveCount - 15] === null) ||
            (board[moveCount - 5] > 12 &&
              board[moveCount - 10] === null &&
              board[moveCount - 15] === null))
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        moveCount += 5;
      }
      if (
        [3, 4, 8, 9, 13, 14, 18, 19, 23, 24, 2, 7, 12, 17, 22].includes(
          selectedPiece.indexOfBoardPiece
        )
      ) {
        moveCount = selectedPiece.indexOfBoardPiece - 2;
        while (moveCount >= 0) {
          move = moveCount - selectedPiece.indexOfBoardPiece;
          if (
            move === -2 &&
            board[moveCount] === null &&
            board[moveCount + 1] === null
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (
            move === -3 &&
            board[moveCount] === null &&
            ((board[moveCount + 1] === null && board[moveCount + 2] === null) ||
              (board[moveCount + 1] > 12 && board[moveCount + 2] === null))
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (
            move === -4 &&
            board[moveCount] === null &&
            ((board[moveCount + 1] === null &&
              board[moveCount + 2] === null &&
              board[moveCount + 3] === null) ||
              (board[moveCount + 1] > 12 &&
                board[moveCount + 2] === null &&
                board[moveCount + 3] === null))
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (leftBorder.includes(moveCount)) {
            break;
          }
          moveCount += -1;
        }
      }

      if (
        [0, 1, 5, 6, 10, 11, 15, 16, 20, 21, 2, 7, 12, 17, 22].includes(
          selectedPiece.indexOfBoardPiece
        )
      ) {
        moveCount = selectedPiece.indexOfBoardPiece + 2;
        while (moveCount <= 24) {
          move = moveCount - selectedPiece.indexOfBoardPiece;
          if (
            move === 2 &&
            board[moveCount] === null &&
            board[moveCount - 1] === null
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (
            move === 3 &&
            board[moveCount] === null &&
            ((board[moveCount - 1] === null && board[moveCount - 2] === null) ||
              (board[moveCount - 1] > 12 && board[moveCount - 2] === null))
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (
            move === 4 &&
            board[moveCount] === null &&
            ((board[moveCount - 1] === null &&
              board[moveCount - 2] === null &&
              board[moveCount - 3] === null) ||
              (board[moveCount - 1] > 12 &&
                board[moveCount - 2] === null &&
                board[moveCount - 3] === null))
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (rightBorder.includes(moveCount)) {
            break;
          }
          moveCount += 1;
        }
      }
    } else {
      moveCount = selectedPiece.indexOfBoardPiece - 10;
      while (moveCount >= 0) {
        move = moveCount - selectedPiece.indexOfBoardPiece;
        if (
          move === -10 &&
          board[moveCount] === null &&
          board[moveCount + 5] === null
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        if (
          move === -15 &&
          board[moveCount] === null &&
          ((board[moveCount + 5] === null && board[moveCount + 10] === null) ||
            (board[moveCount + 5] < 12 && board[moveCount + 10] === null))
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        if (
          move === -20 &&
          board[moveCount] === null &&
          ((board[moveCount + 5] === null &&
            board[moveCount + 10] === null &&
            board[moveCount + 15] === null) ||
            (board[moveCount + 5] < 12 &&
              board[moveCount + 10] === null &&
              board[moveCount + 15] === null))
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        moveCount += -5;
      }
      moveCount = selectedPiece.indexOfBoardPiece + 10;
      while (moveCount <= 24) {
        move = moveCount - selectedPiece.indexOfBoardPiece;
        if (
          move === 10 &&
          board[moveCount] === null &&
          board[moveCount - 5] === null
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        if (
          move === 15 &&
          board[moveCount] === null &&
          ((board[moveCount - 5] === null && board[moveCount - 10] === null) ||
            (board[moveCount - 5] < 12 && board[moveCount - 10] === null))
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        if (
          move === 20 &&
          board[moveCount] === null &&
          ((board[moveCount - 5] === null &&
            board[moveCount - 10] === null &&
            board[moveCount - 15] === null) ||
            (board[moveCount - 5] < 12 &&
              board[moveCount - 10] === null &&
              board[moveCount - 15] === null))
        ) {
          selectedPiece.kingMoves.v.push(move);
        }
        moveCount += 5;
      }
      if (
        [3, 4, 8, 9, 13, 14, 18, 19, 23, 24, 2, 7, 12, 17, 22].includes(
          selectedPiece.indexOfBoardPiece
        )
      ) {
        moveCount = selectedPiece.indexOfBoardPiece - 2;
        while (moveCount >= 0) {
          move = moveCount - selectedPiece.indexOfBoardPiece;
          if (
            move === -2 &&
            board[moveCount] === null &&
            board[moveCount + 1] === null
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (
            move === -3 &&
            board[moveCount] === null &&
            ((board[moveCount + 1] === null && board[moveCount + 2] === null) ||
              (board[moveCount + 1] < 12 && board[moveCount + 2] === null))
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (
            move === -4 &&
            board[moveCount] === null &&
            ((board[moveCount + 1] === null &&
              board[moveCount + 2] === null &&
              board[moveCount + 3] === null) ||
              (board[moveCount + 1] < 12 &&
                board[moveCount + 2] === null &&
                board[moveCount + 3] === null))
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (leftBorder.includes(moveCount)) {
            break;
          }
          moveCount += -1;
        }
      }

      if (
        [0, 1, 5, 6, 10, 11, 15, 16, 20, 21, 2, 7, 12, 17, 22].includes(
          selectedPiece.indexOfBoardPiece
        )
      ) {
        moveCount = selectedPiece.indexOfBoardPiece + 2;
        while (moveCount <= 24) {
          move = moveCount - selectedPiece.indexOfBoardPiece;
          if (
            move === 2 &&
            board[moveCount] === null &&
            board[moveCount - 1] === null
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (
            move === 3 &&
            board[moveCount] === null &&
            ((board[moveCount - 1] === null && board[moveCount - 2] === null) ||
              (board[moveCount - 1] < 12 && board[moveCount - 2] === null))
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (
            move === 4 &&
            board[moveCount] === null &&
            ((board[moveCount - 1] === null &&
              board[moveCount - 2] === null &&
              board[moveCount - 3] === null) ||
              (board[moveCount - 1] < 12 &&
                board[moveCount - 2] === null &&
                board[moveCount - 3] === null))
          ) {
            selectedPiece.kingMoves.h.push(move);
          }
          if (rightBorder.includes(moveCount)) {
            break;
          }
          moveCount += 1;
        }
      }
    }

    givePieceBorder();
  } else {
    givePieceBorder();
  }
}

function givePieceBorder() {
  if (
    selectedPiece.space5 ||
    selectedPiece.space1 ||
    selectedPiece.spaceMinus1 ||
    selectedPiece.spaceMinus5 ||
    selectedPiece.space10 ||
    selectedPiece.spaceMinus10 ||
    selectedPiece.space2 ||
    selectedPiece.spaceMinus2 ||
    selectedPiece.kingMoves.h.length ||
    selectedPiece.kingMoves.v.length
  ) {
    document.getElementById(selectedPiece.pieceId).style.border =
      "3px solid green";
    giveCellsClick();
  } else {
    return;
  }
}

function giveCellsClick() {
  if (selectedPiece.space5) {
    cells[selectedPiece.indexOfBoardPiece + 5].setAttribute(
      "onclick",
      "makeMove(5)"
    );
    cells[selectedPiece.indexOfBoardPiece + 5].style.border = "3px solid green";
  }
  if (selectedPiece.space1) {
    cells[selectedPiece.indexOfBoardPiece + 1].setAttribute(
      "onclick",
      "makeMove(1)"
    );
    cells[selectedPiece.indexOfBoardPiece + 1].style.border = "3px solid green";
  }
  if (selectedPiece.spaceMinus1) {
    cells[selectedPiece.indexOfBoardPiece - 1].setAttribute(
      "onclick",
      "makeMove(-1)"
    );
    cells[selectedPiece.indexOfBoardPiece - 1].style.border = "3px solid green";
  }
  if (selectedPiece.spaceMinus5) {
    cells[selectedPiece.indexOfBoardPiece - 5].setAttribute(
      "onclick",
      "makeMove(-5)"
    );
    cells[selectedPiece.indexOfBoardPiece - 5].style.border = "3px solid green";
  }
  if (selectedPiece.space10) {
    cells[selectedPiece.indexOfBoardPiece + 10].setAttribute(
      "onclick",
      "makeMove(10)"
    );
    cells[selectedPiece.indexOfBoardPiece + 10].style.border =
      "3px solid green";
  }
  if (selectedPiece.spaceMinus10) {
    cells[selectedPiece.indexOfBoardPiece - 10].setAttribute(
      "onclick",
      "makeMove(-10)"
    );
    cells[selectedPiece.indexOfBoardPiece - 10].style.border =
      "3px solid green";
  }
  if (selectedPiece.space2) {
    cells[selectedPiece.indexOfBoardPiece + 2].setAttribute(
      "onclick",
      "makeMove(2)"
    );
    cells[selectedPiece.indexOfBoardPiece + 2].style.border = "3px solid green";
  }
  if (selectedPiece.spaceMinus2) {
    cells[selectedPiece.indexOfBoardPiece - 2].setAttribute(
      "onclick",
      "makeMove(-2)"
    );
    cells[selectedPiece.indexOfBoardPiece - 2].style.border = "3px solid green";
  }
  if (selectedPiece.kingMoves.h.length !== 0) {
    for (let move of selectedPiece.kingMoves.h) {
      cells[selectedPiece.indexOfBoardPiece + move].setAttribute(
        "onclick",
        `makeMove(${move})`
      );
      cells[selectedPiece.indexOfBoardPiece + move].style.border =
        "3px solid green";
    }
  }
  if (selectedPiece.kingMoves.v.length !== 0) {
    console.log(selectedPiece.kingMoves.v);
    for (let move of selectedPiece.kingMoves.v) {
      console.log(move);
      cells[selectedPiece.indexOfBoardPiece + move].setAttribute(
        "onclick",
        `makeMove(${move})`
      );
      cells[selectedPiece.indexOfBoardPiece + move].style.border =
        "3px solid green";
    }
  }
}

function makeMove(number, opponent_turn) {
  if ((turn || !turn) && opponent_turn === undefined) {
    socket.emit("makeMove", { selectedPiece, number, turn });
  }
  if (opponent_turn) {
    turn = opponent_turn;
  }
  document.getElementById(selectedPiece.pieceId).remove();
  cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
  if (turn) {
    if (selectedPiece.isKing) {
      cells[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<div class="red-piece king" id="${selectedPiece.pieceId}"></div>`;
      redsPieces = document.querySelectorAll(".red-piece");
    } else {
      cells[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<div class="red-piece" id="${selectedPiece.pieceId}"></div>`;
      redsPieces = document.querySelectorAll(".red-piece");
    }
  } else {
    if (selectedPiece.isKing) {
      cells[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<div class="black-piece king" id="${selectedPiece.pieceId}"></div>`;
      blacksPieces = document.querySelectorAll(".black-piece");
    } else {
      cells[
        selectedPiece.indexOfBoardPiece + number
      ].innerHTML = `<div class="black-piece" id="${selectedPiece.pieceId}"></div>`;
      blacksPieces = document.querySelectorAll(".black-piece");
    }
  }

  let indexOfPiece = selectedPiece.indexOfBoardPiece;
  if (selectedPiece.isKing) {
    if (number === 15 || number === 20) {
      if (board[indexOfPiece + number - 5] !== null) {
        return changeData(
          indexOfPiece,
          indexOfPiece + number,
          indexOfPiece + number - 5
        );
      } else {
        return changeData(indexOfPiece, indexOfPiece + number);
      }
    }
    if (number === -15 || number === -20) {
      if (board[indexOfPiece + number + 5] !== null) {
        return changeData(
          indexOfPiece,
          indexOfPiece + number,
          indexOfPiece + number + 5
        );
      } else {
        return changeData(indexOfPiece, indexOfPiece + number);
      }
    }
    if (number === 3 || number === 4) {
      if (board[indexOfPiece + number - 1] !== null) {
        return changeData(
          indexOfPiece,
          indexOfPiece + number,
          indexOfPiece + number - 1
        );
      } else {
        return changeData(indexOfPiece, indexOfPiece + number);
      }
    }
    if (number === -3 || number === -4) {
      if (board[indexOfPiece + number + 1] !== null) {
        return changeData(
          indexOfPiece,
          indexOfPiece + number,
          indexOfPiece + number + 1
        );
      } else {
        return changeData(indexOfPiece, indexOfPiece + number);
      }
    }
  }
  if (number === 10 || number === -10 || number === 2 || number === -2) {
    if (board[indexOfPiece + number / 2] !== null) {
      return changeData(
        indexOfPiece,
        indexOfPiece + number,
        indexOfPiece + number / 2
      );
    } else {
      return changeData(indexOfPiece, indexOfPiece + number);
    }
  } else {
    return changeData(indexOfPiece, indexOfPiece + number);
  }
}

function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
  board[indexOfBoardPiece] = null;
  board[modifiedIndex] = parseInt(selectedPiece.pieceId);
  if (
    turn &&
    selectedPiece.pieceId < 12 &&
    (modifiedIndex === 20 || modifiedIndex === 24)
  ) {
    document.getElementById(selectedPiece.pieceId).classList.add("king");
  }
  if (
    turn === false &&
    selectedPiece.pieceId > 12 &&
    (modifiedIndex === 4 || modifiedIndex === 0)
  ) {
    document.getElementById(selectedPiece.pieceId).classList.add("king");
  }
  if (removePiece) {
    board[removePiece] = null;
    if (turn && selectedPiece.pieceId < 12) {
      cells[removePiece].innerHTML = "";
      blackScore--;
    }
    if (turn === false && selectedPiece.pieceId > 12) {
      cells[removePiece].innerHTML = "";
      redScore--;
    }
  }
  resetSelectedPieceProperties();
  removeCellonclick();
  removeEventListeners();
}

function removeEventListeners() {
  if (turn) {
    for (let i = 0; i < redsPieces.length; i++) {
      redsPieces[i].removeEventListener("click", getPlayerPieces);
    }
  } else {
    for (let i = 0; i < blacksPieces.length; i++) {
      blacksPieces[i].removeEventListener("click", getPlayerPieces);
    }
  }
  checkForWin();
}

function checkForWin() {
  if (blackScore === 0) {
    divider.style.display = "none";
    for (let i = 0; i < redTurnText.length; i++) {
      redTurnText[i].classList.add("win-text");
      blackTurnText[i].style.display = "none";
      redTurnText[i].textContent = "RED WINS!";
    }
  } else if (redScore === 0) {
    divider.style.display = "none";
    for (let i = 0; i < blackTurnText.length; i++) {
      blackTurnText[i].classList.add("win-text");
      redTurnText[i].style.display = "none";
      blackTurnText[i].textContent = "BLACK WINS!";
    }
  }
  changePlayer();
}

function changePlayer() {
  if (turn) {
    turn = false;
    for (let i = 0; i < redTurnText.length; i++) {
      redTurnText[i].style.color = "lightGrey";
      blackTurnText[i].style.color = "black";
    }
  } else {
    turn = true;
    for (let i = 0; i < blackTurnText.length; i++) {
      blackTurnText[i].style.color = "lightGrey";
      redTurnText[i].style.color = "black";
    }
  }
}

const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.querySelector("#room-name");
const userList = document.querySelector("#users");

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });

socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);
  //scroll chat messages
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  chatMessages.appendChild(div);
}

function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = `${users
    .map((user) => `<li>${user.username}</li>`)
    .join("")}`;
}

socket.on("makeMove", (moveInfo) => {
  selectedPiece = moveInfo.selectedPiece;
  makeMove(moveInfo.number, turn);
  givePiecesEventListeners();
});

socket.on("userRole", (userRole) => {
  if (userRole === "b") {
    document.querySelector("table").classList.add("rotate-table");
    givePiecesEventListeners();
  }
});

socket.on("checkWin", (userRole) => {
  if (userRole === "r") {
    blackScore = 0;
    checkForWin();
  } else {
    redScore = 0;
    checkForWin();
  }
});
