import { dfs } from "./algos.js";
import { ROWS, COLUMNS, WALL_RATIO } from "./const.js";

const grid = document.querySelector(".grid");
let start, end;

function initGrid() {
  for (let i = 0; i < ROWS; ++i) {
    for (let j = 0; j < COLUMNS; ++j) {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.id = `${i}-${j}`;

      grid.appendChild(div);
    }
  }

  // init start and end
  start = document.getElementById("0-0");
  end = document.getElementById(`${ROWS - 1}-${COLUMNS - 1}`);
  start.classList.add("start");
  end.classList.add("end");
}

// randomly place walls
function initWalls() {
  for (let i = 0; i < ROWS; ++i) {
    for (let j = 0; j < COLUMNS; ++j) {
      const cell = document.getElementById(`${i}-${j}`);
      if (
        Math.random() >= WALL_RATIO &&
        cell.id !== "0-0" &&
        cell.id !== `${ROWS - 1}-${COLUMNS - 1}`
      ) {
        cell.classList.add("wall");
      }
    }
  }
}

initGrid();
initWalls();
dfs(grid, start, end);
