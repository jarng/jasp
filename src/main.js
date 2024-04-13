import { astar, beam, bfs, dfs, dijkstra, gbs } from "./algos.js";
import { drawPath, getTotalCost } from "./utils.js";
import { ROWS, COLUMNS, WALL_RATIO } from "./const.js";

class App {
  constructor() {
    this.grid = document.querySelector(".grid");
    this.start;
    this.end;

    this.startBtn = document.getElementById("start-btn");
    this.resetBtn = document.getElementById("reset-btn");
    this.rebuildBtn = document.getElementById("rebuild-btn");

    this.select = document.getElementById("algo-select");
    this.mazeSelect = document.getElementById("maze-gen");
    this.elapsed = document.getElementById("elapsed");
    this.cost = document.getElementById("cost");
    this.running = false;

    this.startCoord = `${Math.round(ROWS / 2) - 1}-${
      Math.round(COLUMNS / 5) - 1
    }`;
    this.endCoord = `${Math.round(ROWS / 2) - 1}-${
      Math.round((COLUMNS * 4) / 5) - 1
    }`;

    this.mouseDown = false;
  }

  initGrid() {
    for (let i = 0; i < ROWS; ++i) {
      for (let j = 0; j < COLUMNS; ++j) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.id = `${i}-${j}`;
        div.dataset.dist = Infinity;

        this.grid.appendChild(div);
      }
    }

    // init start and end
    this.start = document.getElementById(this.startCoord);
    this.end = document.getElementById(this.endCoord);
    this.start.classList.add("start");
    this.end.classList.add("end");
  }

  initWalls() {
    for (let i = 0; i < ROWS; ++i) {
      for (let j = 0; j < COLUMNS; ++j) {
        const cell = document.getElementById(`${i}-${j}`);
        if (
          Math.random() >= WALL_RATIO &&
          cell.id !== this.startCoord &&
          cell.id !== this.endCoord
        ) {
          cell.classList.add("wall");
        }
      }
    }
  }

  async execute(func) {
    const startTime = Date.now();
    const path = await func();
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    const cost = getTotalCost(path).toFixed(2);

    drawPath(path);

    this.elapsed.innerHTML = `${elapsed}s`;
    this.cost.innerHTML = cost;
  }

  reset() {
    if (this.running) return;
    this.elapsed.innerHTML = "";
    this.cost.innerHTML = "";
    document
      .querySelectorAll(".cell")
      .forEach((i) => i.classList.remove("visited", "path", "discovered"));
  }

  rebuild() {
    if (this.running) return;

    if (this.mazeSelect.value === "random") {
      this.grid.innerHTML = "";
      this.initGrid();
      this.initWalls();
    } else {
      this.makeMazeInteractive();
    }

    this.running = false;
    this.elapsed.innerHTML = "";
    this.cost.innerHTML = "";
  }

  makeMazeInteractive() {
    document.querySelectorAll(".cell").forEach((i) => {
      i.classList.remove("wall", "visited", "path", "discovered");
      i.addEventListener("mouseenter", () => {
        if (i.id !== this.start.id && i.id !== this.end.id && this.mouseDown) {
          i.classList.add("wall");
        }
      });
    });
  }

  setupEvents() {
    this.startBtn.onclick = async () => {
      if (this.running) return;

      this.reset();
      this.startBtn.disabled = true;
      this.resetBtn.disabled = true;
      this.rebuildBtn.disabled = true;
      this.running = true;

      switch (this.select.value) {
        case "dfs":
          await this.execute(() => dfs(this.start, this.end));
          break;
        case "bfs":
          await this.execute(() => bfs(this.start, this.end));
          break;
        case "dijkstra":
          await this.execute(() => dijkstra(this.start, this.end));
          break;
        case "astar":
          await this.execute(() => astar(this.start, this.end));
          break;
        case "gbs":
          await this.execute(() => gbs(this.start, this.end));
          break;
        case "beam":
          await this.execute(() => beam(this.start, this.end));
          break;
        default:
          throw new Error("Algorithm not implemented");
      }

      this.startBtn.disabled = false;
      this.resetBtn.disabled = false;
      this.rebuildBtn.disabled = false;
      this.running = false;
    };

    this.mazeSelect.onchange = () => {
      switch (this.mazeSelect.value) {
        case "random":
          document.body.onmousedown = null;
          document.body.onmouseup = null;
          this.rebuild();
          break;
        case "interactive":
          document.body.onmousedown = () => {
            this.mouseDown = true;
          };
          document.body.onmouseup = () => {
            this.mouseDown = false;
          };
          this.makeMazeInteractive();
          break;
        default:
          throw new Error("Maze select value not implemented");
      }
    };

    this.rebuildBtn.onclick = () => this.rebuild();
    this.resetBtn.onclick = () => this.reset();
  }
}

const app = new App();
app.initGrid();
app.initWalls();
app.setupEvents();
