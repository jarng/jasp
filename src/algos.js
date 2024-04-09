import { DELAY_MS } from "./const.js";

import { distance, getNeighbors, heuristic, sleep, getPath } from "./utils.js";

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
      break;
    }

    for (const node of getNeighbors(v).reverse()) {
      if (!visited[node.id]) {
        node.classList.add("discovered");
        visited[node.id] = true;
        parents[node.id] = v;
        stack.push(node);
      }
    }
  }

  return getPath(parents, start, end);
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
      break;
    }

    for (const node of getNeighbors(v)) {
      if (!visited[node.id]) {
        node.classList.add("discovered");
        visited[node.id] = true;
        parents[node.id] = v;
        queue.unshift(node);
      }
    }
  }

  return getPath(parents, start, end);
}

export async function dijkstra(start, end) {
  const prioQueue = [];
  const parents = {};
  const dist = {}; //dist from source

  dist[start.id] = 0;
  prioQueue.unshift({ node: start, dist: 0 });

  while (prioQueue.length > 0) {
    prioQueue.sort((a, b) => a.dist < b.dist);
    const v = prioQueue.pop().node;

    await sleep(DELAY_MS);
    v.classList.add("visited");

    if (v.id === end.id) {
      break;
    }

    for (const node of getNeighbors(v)) {
      node.classList.add("discovered");
      const alt = dist[v.id] + distance(v, node);
      if (alt < (dist[node.id] || node.dataset.dist)) {
        parents[node.id] = v;
        dist[node.id] = alt;
        prioQueue.unshift({ node, dist: alt });
      }
    }
  }

  return getPath(parents, start, end);
}

export async function astar(start, end) {
  const prioQueue = [];
  const parents = {};
  const gscore = {};
  const fscore = {};

  gscore[start.id] = 0;
  fscore[start.id] = heuristic(start, end);
  prioQueue.unshift({ node: start, dist: fscore[start.id] });

  while (prioQueue.length > 0) {
    prioQueue.sort((a, b) => a.dist < b.dist);
    const v = prioQueue.pop().node;

    await sleep(DELAY_MS);
    v.classList.add("visited");

    if (v.id === end.id) {
      break;
    }

    for (const node of getNeighbors(v)) {
      node.classList.add("discovered");
      const alt = gscore[v.id] + distance(v, node);
      if (alt < (gscore[node.id] || node.dataset.dist)) {
        parents[node.id] = v;
        gscore[node.id] = alt;
        fscore[node.id] = alt + heuristic(node, end);
        prioQueue.unshift({ node, dist: fscore[node.id] });
      }
    }
  }

  return getPath(parents, start, end);
}
