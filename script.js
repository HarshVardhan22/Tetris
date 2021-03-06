document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.getElementById("score");
  const startBtn = document.getElementById("start-button");
  const width = 10;
  let top = document.getElementById("top");
  let displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 0;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  const restart = document.getElementById("restart");
  let up =document.getElementById("up");
  let down = document.getElementById("down");
  let left = document.getElementById("left");
  let right = document.getElementById("right");
  let pop = document.createElement('audio');
  let mute = document.getElementById('mute');
  let difficulty = document.getElementById('difficulty');

  let level = 1000;

  difficulty.addEventListener("click",()=>{
    console.log(difficulty.value);
    if(difficulty.value==="1")
      level = 1000;
    else if(difficulty.value==="2")
      level = 500;
    else if(difficulty.value==="3")
      level = 200;
  })

  
  pop.src = 'bgm.mp3';

  //to pause the bgm
  mute.addEventListener("click",()=>{
    
    if(mute.innerHTML=== "Mute"){
      pop.pause();
      mute.innerHTML = "Unmute";
    }
    else{
      pop.play();
      mute.innerHTML = "Mute";
    }
  });

  //Mapping OnScreen Buttons to keyboard events

  up.addEventListener("click",rotate);
  down.addEventListener("click",moveDown);
  left.addEventListener("click",moveLeft);
  right.addEventListener('click',moveRight);
  
  //Restart Game
  restart.addEventListener("click",function(){
    location.reload();
  })

  //Different tetrimino or block shapes

  const LBlock = [
    [1, width + 1, width * 2 + 1, 2],
    [0, width, width + 1, width + 2],
    [0, width * 1, width * 2 + 1, width * 2],
    [2, width, width + 1, width + 2],
  ];

  const zBlock = [
    [width * 2, width * 2 + 1, width + 1, width + 2],
    [0, width, width + 1, width * 2 + 1],
    [0, 1, width + 1, width + 2],
    [width * 2, width, width + 1, 1],
  ];

  const oBlock = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const tBlock = [
    [1, width, width + 1, width + 2],
    [width * 2 + 1, width, width + 1, width + 2],
    [1, width * 2 + 1, width + 1, width + 2],
    [1, width, width + 1, width * 2 + 1],
  ];

  const iBlock = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theBlocks = [LBlock, zBlock, tBlock, oBlock, iBlock];

  //Block Designs for upcoming block
  const upNextBlocks = [
    [1, 2, 6, 10],
    [5, 6, 10, 11],
    [8, 5, 9, 13],
    [0, 1, 4, 5],
    [0, 4, 8, 12],
  ];

  const colors = [
    "#a7d129",
    "#ff0000",
    "#ffd700",
    "#ea0599",
    "#00fff5"
  ]
  //display shape in mini grid
  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove("block");
      square.style.backgroundColor = '';
    });
    upNextBlocks[nextRandom].forEach((index) =>{
      displaySquares[index].classList.add("block")
      displaySquares[index].style.backgroundColor = colors[nextRandom]
    }
    );
  }

  let currentPosition = Math.floor(Math.random() * theBlocks.length);
  let currentRotation = 0;

  //selecting a tetrimino at random
  let random = Math.floor(Math.random() * theBlocks.length);

  let current = theBlocks[random][currentRotation];

  //Drawing the tetriminos or blocks

  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("block");
      squares[currentPosition + index].style.backgroundColor = colors[random];
    });
  }

  //Deleting the tetriminos or blocks

  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("block");
      squares[currentPosition + index].style.backgroundColor = "";
    });
  }

  //Set Start/Pause btn
  startBtn.addEventListener("click", () => {

    if (timerId) {
      clearInterval(timerId);
      pop.pause();
      timerId = null;
    } else {
      pop.play();
      draw();
      timerId = setInterval(moveDown, level);
      nextRandom = Math.floor(Math.random() * theBlocks.length);
      displayShape();
      top.style.display = "block";
    }
  });

  
  // Functions for moving and ratating the blocks

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );

      random = nextRandom;
      nextRandom = Math.floor(Math.random() * theBlocks.length);
      current = theBlocks[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
    }
  }

  function moveLeft() {
    undraw();
    const isAtLeft = current.some(
      (index) => [currentPosition + index] % width === 0
    );

    if (!isAtLeft) currentPosition -= 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    )
      currentPosition += 1;

    draw();
  }

  function moveRight() {
    undraw();
    const isAtRight = current.some(
      (index) => [currentPosition + index] % width === 9
    );

    if (!isAtRight) currentPosition += 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    )
      currentPosition -= 1;

    draw();
  }

  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === 4) currentRotation = 0;
    current = theBlocks[random][currentRotation];
    draw();
  }

  //keycode based controls

  function control(e) {
    if (e.keyCode === 37) moveLeft();
    else if (e.keyCode === 38) rotate();
    else if (e.keyCode === 39) moveRight();
    else if (e.keyCode === 40) moveDown();
  }
  document.addEventListener("keydown", control);

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("block");
          squares[index].style.backgroundColor = '';
        });
        const squaresRemoved = squares.splice(i,width);
        //console.log(squaresRemoved);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

// gAME OVER

function gameOver(){
  
   if (current.some((index) =>squares[currentPosition + index].classList.contains("taken"))) {
      top.style.display = "none";
     scoreDisplay.innerHTML =" GAME OVER Your Final Score is "+score;
     clearInterval(timerId);
     
   }
  
}



});
//