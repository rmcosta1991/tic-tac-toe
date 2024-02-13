// Cria o array para memorizar as jogadas
let dadosTabuleiro = [
[0, 0, 0],
[0, 0, 0],
[0, 0, 0]
]

// Define as variaveis do jogo
let jogador = 1;
let gameOver = false;

let jogador1 = "";
let jogador2 = "";

let tabuleiroJogo = document.querySelector('#tabuleirojogo');

//Define o nome dos jogadores
const defineJogadores = document.getElementById("comecar");
// Add event listener to restart button
defineJogadores.addEventListener("click", () => {
  // define os jogadores
  jogador1 = document.getElementById("jogador1").value;
  jogador2 = document.getElementById("jogador2").value;

  //habilita o campo de jogo

  tabuleiroJogo.classList.remove('disabled');

});




// Pull in celulas from DOM
const celulas = document.querySelectorAll(".celula");
// Pull in the result text from DOM
const resultElement = document.getElementById("result");

// Add event listener
celulas.forEach((celula, index) => {
  celula.addEventListener("click", () => {
    placeMarker(index);
  });
});

// Create function for placing markers
function placeMarker(index) {
  // Determine row and column from index
  let col = index % 3
  let row = (index - col) / 3
  // Check if the current celula is empty
  if(dadosTabuleiro[row][col] == 0 && gameOver == false) {
    dadosTabuleiro[row][col] = jogador;
    // change jogador
    jogador *= -1;
    // Update the screen with markers
    drawMarkers();
    // Check if anyone has won
    checkResult();
  }
}

// Create function for drawing jogador markers
function drawMarkers() {
  // Iterate over rows
  for(let row = 0; row < 3; row++) {
    // Iterate over columns
    for(let col = 0; col <3; col++) {
      // Check if it is jogador 1's marker
      if(dadosTabuleiro[row][col] == 1) {
        // Update celula class to add a cross
        celulas[(row * 3) + col].classList.add("cross");
      } else if(dadosTabuleiro[row][col] == -1) {
        // Update celula class to add a circle
        celulas[(row * 3) + col].classList.add("circle");
      }
    }
  }
}

// Create function for checking the result of the game
function checkResult() {
  // Check rows and columns
  for(let i = 0; i < 3; i++) {
    let rowSum = dadosTabuleiro[i][0] + dadosTabuleiro[i][1] + dadosTabuleiro[i][2];
    let colSum = dadosTabuleiro[0][i] + dadosTabuleiro[1][i] + dadosTabuleiro[2][i];


    if(rowSum == 3 || colSum == 3) {
      // jogador 1 ganha
      endGame(1, jogador1);
      return
    } else if(rowSum == -3 || colSum == -3) {
      // jogador 2 ganha
      endGame(2, jogador2);
      return
    }
  }

  // Check diagonals
  let diagonalSum1 = dadosTabuleiro[0][0] + dadosTabuleiro[1][1] + dadosTabuleiro[2][2];
  let diagonalSum2 = dadosTabuleiro[0][2] + dadosTabuleiro[1][1] + dadosTabuleiro[2][0];
  if(diagonalSum1 == 3 || diagonalSum2 == 3) {
    // jogador 1 ganha
    endGame(1, jogador1);
    return
  } else if(diagonalSum1 == -3 || diagonalSum2 == -3) {
    // jogador 2 ganha
    endGame(2, jogador2)
    return
  }

  // Check for a tie
  if(dadosTabuleiro[0].indexOf(0) == -1 &&
    dadosTabuleiro[1].indexOf(0) == -1 &&
    dadosTabuleiro[2].indexOf(0) == -1) {
    endGame(0);
    return
  }
}

// Function to end the game and display the result
function endGame(winner, nomeVencedor) {
  // Trigger game over
  gameOver = true;
  // Check if game ended in a tie
  if(winner == 0) {
    resultElement.innerText = "Empate!"
  } else {
    resultElement.innerText = `Jogador ${nomeVencedor} Ganhou!`
  }
}

// Restart Game
const restartButton = document.getElementById("restart");
// Add event listener to restart button
restartButton.addEventListener("click", () => {
  // Reset game variables
  dadosTabuleiro = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
  ]
  jogador = 1;
  gameOver = false;
  // Reset game board
  celulas.forEach(celula => {
    celula.classList.remove("cross", "circle");
  });
  // Reset outcome text
  resultElement.innerText = "";

  tabuleiroJogo.classList.add('disabled');

  document.getElementById("jogador1").value = "";
  document.getElementById("jogador2").value = "";

  
});