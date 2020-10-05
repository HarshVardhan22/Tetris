document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    let squares = document.querySelectorAll('.grid div');
    const ScoreDisplay = document.querySelector('score');
    const StartBtn = document.querySelector('start-button');
    const width = 10;

    //Block Designs
    
    const LBlock = [
      [1, width + 1, width * 2 + 1, 2],
      [width, width + 1, width + 2, width * 2 + 2],
      [1, width * 1, width * 2 + 1, width * 2],
      [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zBlock = [
      [width * 2, width * 2 + 1, width + 1, width + 2],
      [1, width, width + 1, width * 2 + 1],
      [width * 2, width * 2 + 1, width + 2, width + 1],
      [1, width, width + 1, width * 2 + 1]
    ];

    const oBlock = [
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1]
    ];

    const tBlock = [
      [1, width, width + 1, width + 2],
      [width * 2 + 1, width, width + 1, width + 2],
      [1, width * 2 + 1, width + 1, width + 2],
      [1, width, width + 1, width *2 + 1]
    ];

    const iBlock = [
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3],
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3]
    ];


const theBlocks = [LBlock,zBlock,tBlock,oBlock,iBlock];

let currentPosition =4;
let currentRotation =0;

//selecting a tetrimino at random
let random = Math.floor(Math.random()*theBlocks.length);

let current = theBlocks[random][currentRotation];

//Drawing the tetriminos or blocks

function draw(){
  current.forEach(index=>{
    squares[currentPosition+index].classList.add('block');
  })
}

function undraw(){
  current.forEach(index=>{
    squares[currentPosition+index].classList.remove('block');
  })
}

timerId = setInterval(moveDown, 200);

function moveDown(){
  undraw();
  currentPosition+=width;
  draw();
  freeze();
}

function freeze(){
  if( current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index=>squares[currentPosition + index].classList.add('taken'));
  
    // create a new block falling
  random = Math.floor(Math.random()*theBlocks.length);
  current = theBlocks[random][currentRotation];
  currentPosition = 4;
  draw();

}}
})
 
