import { bfs, dfs } from "./algos.js";
import { ROWS, COLUMNS, WALL_RATIO } from "./const.js";

class App {
  constructor() {
    this.grid = document.querySelector(".grid");
    this.start;
    this.end;

    this.startBtn = document.getElementById("start-btn");
    this.resetBtn = document.getElementById("reset-btn");

    this.select = document.getElementById("algo-select");
    this.running = false;
  }

  initGrid() {
    for (let i = 0; i < ROWS; ++i) {
      for (let j = 0; j < COLUMNS; ++j) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.id = `${i}-${j}`;

        this.grid.appendChild(div);
      }
    }

    // init start and end
    this.start = document.getElementById("0-0");
    this.end = document.getElementById(`${ROWS - 1}-${COLUMNS - 1}`);
    this.start.classList.add("start");
    this.end.classList.add("end");
  }

  initWalls() {
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

  setupEvents() {
    this.startBtn.onclick = async () => {
      if (this.running) return;

      this.startBtn.disabled = true;
      this.resetBtn.disabled = true;
      this.running = true;

      switch (this.select.value) {
        case "dfs":
          await dfs(this.start, this.end);
          break;
        case "bfs":
          await bfs(this.start, this.end);
          break;
        default:
          break;
      }

      this.startBtn.disabled = false;
      this.resetBtn.disabled = false;
      this.running = false;
    };

    this.resetBtn.onclick = () => {
      if (this.running) return;
      this.grid.innerHTML = "";
      this.initGrid();
      this.initWalls();
      this.running = false;
    };
  }
}

const app = new App();
app.initGrid();
app.initWalls();
app.setupEvents();
