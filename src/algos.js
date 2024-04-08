import { ROWS, COLUMNS, DIRECTIONS, DELAY_MS } from "./const.js";

export async function dfs(start, end) {
  const stack = [];
  const visited = {};
  const parents = {};

  stack.push(start);
  visited[start.id] = true;

  while (stack.length > 0) {
    const v = stack.pop();
    await sleep(DELAY_MS);
    v.classList.add("visited");

    if (v.id === end.id) {
      console.log("FOUND", v);
      break;
    }

    for (const node of getNeighbors(v).reverse()) {
      if (!visited[node.id]) {
        visited[node.id] = true;
        parents[node.id] = v;
        stack.push(node);
      }
    }
  }

  const path = getPath(parents, start, end);
  drawPath(path);
}

export async function bfs(start, end) {
  const queue = [];
  const visited = {};
  const parents = {};

  queue.unshift(start);
  visited[start.id] = true;

  while (queue.length > 0) {
    const v = queue.pop();

    await sleep(DELAY_MS);
    v.classList.add("visited");

    if (v.id === end.id) {
      console.log("FOUND", v);
      break;
    }

    for (const node of getNeighbors(v)) {
      if (!visited[node.id]) {
        visited[node.id] = true;
        parents[node.id] = v;
        queue.unshift(node);
      }
    }
  }

  const path = getPath(parents, start, end);
  drawPath(path);
}

export async function dijkstra(start, end) {}

export function getNeighbors(node) {
  const neighbors = [];
  DIRECTIONS.forEach((d) => {
    const [i1, j1] = node.id.split("-");
    const [di, dj] = d;

    const i2 = parseInt(i1) + di;
    const j2 = parseInt(j1) + dj;

    if (i2 < 0 || i2 > ROWS - 1 || j2 < 0 || j2 > COLUMNS - 1) return; //out of grid
    const neighbor = document.getElementById(`${i2}-${j2}`);
    if (!neighbor.classList.contains("wall")) {
      neighbors.push(neighbor);
    }
  });

  return neighbors;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPath(parents, start, end) {
  const final = [];
  let current = end;
  while (current && current !== start) {
    final.push(current);
    current = parents[current.id];
  }

  if (current === start) {
    final.push(start);
    return final.reverse();
  } else {
    return [];
  }
}

async function drawPath(path) {
  for (const node of path) {
    document.getElementById(node.id).classList.add("path");
    await sleep(DELAY_MS);
  }
}
