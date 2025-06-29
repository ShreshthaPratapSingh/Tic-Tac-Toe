let board = Array(9).fill("");
let gameOver = false;
let AllCell = document.querySelectorAll(".boxes");
let Status = document.getElementById("status");
let isPlayerTurn = true;
let boxContainer = document.getElementsByClassName("restart")[0];

function CheckWinner() {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < wins.length; i++) {
    let combo = wins[i];
    const a = combo[0];
    const b = combo[1];
    const c = combo[2];
    if (board[a] && board[a] == board[b] && board[b] == board[c]) {
      gameOver = true;

      let Restart = document.createElement("button");
      Restart.className = "Restart";
      Restart.textContent = "Restart Game"

      Restart.addEventListener("click", function(){
        window.location.reload()
      })

      boxContainer.append(Restart)

      Status.textContent = `${board[a]} wins!!`;
      return;
    }
  }

  if (!board.includes("")) {
    gameOver = true;

    let Restart = document.createElement("button");
      Restart.className = "Restart";
      Restart.textContent = "Restart Game"

      Restart.addEventListener("click", function(){
        window.location.reload()
      })

      boxContainer.append(Restart)
      
    Status.textContent = "It's a Draw";
  }
}
function botMove() {
  if (gameOver) {
    return;
  }
  let freeSpaces = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] == "") {
      freeSpaces.push(i);
    }
  }
  if (freeSpaces.length == 0) {
    return;
  }
  let randIndex = freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
  board[randIndex] = "O";
  AllCell[randIndex].textContent = "O";

  CheckWinner();
}
AllCell.forEach((cell, idx) => {
  Status.textContent = "X's move!";
  cell.addEventListener("click", function () {
    if (gameOver || !isPlayerTurn) {
      return;
    }
    if (board[idx] == "" && !gameOver) {
      board[idx] = "X";
      cell.textContent = "X";
      isPlayerTurn = false;

      CheckWinner();
    }
    if (!gameOver) {
      Status.textContent = "O's move!";
      setTimeout(() => {
        if (!gameOver) {
          botMove();
        }

        if (!gameOver) {
          Status.textContent = "X's move!";
          isPlayerTurn = true;
        }
      }, 1000);
    }
  });
});
