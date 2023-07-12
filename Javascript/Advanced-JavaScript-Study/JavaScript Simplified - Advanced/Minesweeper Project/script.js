// Display/UI
//1. Populate a board with tiles/mines
//2. Left clikc on tiles  - Reveal tiles
//3. Ring click on tiles - mark tiles
//4. Check for win/lose

import { createBoard, markTile, revealTile, checkWin, checkLose, TILE_STATUSES } from './minesweeper.js';

//console.log(createBoard(2, 2));

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 2;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector('.board');
const minesLeftText = document.querySelector('[data-mine-count]');
const messageText = document.querySelector('.subtext');
//console.log(board);

board.forEach(row => {
  row.forEach(tile => {
    boardElement.append(tile.element);
    //2. Left clikc on tiles  - Reveal tiles
    tile.element.addEventListener('click', () => {
      revealTile(board, tile);
      checkGameEnd();
    });
    //3. Ring click on tiles - mark tiles
    tile.element.addEventListener('contextmenu', e => {
      e.preventDefault();
      markTile(tile);
      listMinesLeft();
    });
  });
});
boardElement.style.setProperty('--size', BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length;
  }, 0);
  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

//4. Check for win/lose
function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);
  if(win || lose) {
    boardElement.addEventListener('click', e => e.stopImmediatePropagation());
    boardElement.addEventListener('contextmenu',  e => e.stopImmediatePropagation());
  }
  if(win) {
    messageText.textContent = 'You win';
  }
  if(lose) {
    messageText.textContent = 'You lose';
    board.forEach(row => {
      row.forEach(tile => {
        if(tile.status === TILE_STATUSES.MARKED ) { markTile(tile); }
        if(tile.mine) { revealTile(board, tile); }
      })
    })
  }
}

// function stopProp(e) {
//   e.stopImmediatePropagation();
// }