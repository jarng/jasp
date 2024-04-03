import { ROWS, COLUMNS } from "./const.js";

const grid = document.querySelector(".grid");

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
  const start = document.getElementById("0-0");
  const end = document.getElementById(`${ROWS - 1}-${COLUMNS - 1}`);
  start.classList.add("start");
  end.classList.add("end");
}

// randomly place walls
function initWalls() {
  for (let i = 0; i < ROWS; ++i) {
    for (let j = 0; j < COLUMNS; ++j) {
      const cell = document.getElementById(`${i}-${j}`);
      if (
        Math.random() > 0.69 &&
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
