import {
  DIAGONAL_COST,
  STRAIGHT_COST,
  DIRECTIONS,
  COLUMNS,
  DELAY_MS,
  ROWS,
} from "./const.js";

export function getTotalCost(path) {
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) {
    total += distance(path[i], path[i + 1]);
  }
  return total;
}

export function distance(v1, v2) {
  const [r1, c1] = v1.id.split("-");
  const [r2, c2] = v2.id.split("-");

  if (parseInt(r1) === parseInt(r2) || parseInt(c1) === parseInt(c2))
    return STRAIGHT_COST; //same line
  return DIAGONAL_COST; //diagonal
}

export function heuristic(v1, v2) {
  const [r1, c1] = v1.id.split("-");
  const [r2, c2] = v2.id.split("-");

  const dx = Math.abs(c1 - c2);
  const dy = Math.abs(r1 - r2);

  return (
    STRAIGHT_COST * (dx + dy) +
    (DIAGONAL_COST - 2 * STRAIGHT_COST) * Math.min(dx, dy)
  );
}

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

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getPath(parents, start, end) {
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

export async function drawPath(path) {
  for (const node of path) {
    document.getElementById(node.id).classList.add("path");
    await sleep(DELAY_MS);
  }
}
