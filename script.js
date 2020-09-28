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
})

const theBlocks = [LBlock,zBlock,tBlock,oBlock,iBlock];

let cur
