// src/algorithms/aStar.js

// Helper to calculate Manhattan distance heuristic
function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

// Helper to get neighbors of a node
function getNeighbors(grid, node) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isWall);
}

export function runAStar(initialGrid, startNode, endNode) {
  const steps = [];
  const grid = JSON.parse(JSON.stringify(initialGrid)); // Deep copy to avoid mutation

  const start = grid[startNode.row][startNode.col];
  const end = grid[endNode.row][endNode.col];

  let openSet = [start];
  let closedSet = [];

  start.g = 0;
  start.h = heuristic(start, end);
  start.f = start.g + start.h;

  // Initial state
  steps.push({
    visualState: {
      grid: JSON.parse(JSON.stringify(grid)),
      openSet: [...openSet],
      closedSet: [...closedSet],
      path: [],
    },
    explanation: `Starting A* Pathfinding. The start node is green, the end is red. The open set (nodes to visit) is highlighted in light green.`,
  });

  while (openSet.length > 0) {
    // Find the node in the open set with the lowest f-cost
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    let current = openSet[lowestIndex];
    
    // Check if we've reached the end
    if (current === end) {
      // Path found, reconstruct it
      let path = [];
      let temp = current;
      path.push(temp);
      while (temp.parent) {
        path.push(temp.parent);
        temp = temp.parent;
      }
      path.reverse();

      steps.push({
        visualState: { grid, openSet, closedSet, path },
        explanation: 'Path found! Retracing from the end node back to the start to show the shortest path in yellow.',
      });
      return steps;
    }

    // Move current node from open set to closed set
    openSet.splice(lowestIndex, 1);
    closedSet.push(current);

    steps.push({
      visualState: { grid: JSON.parse(JSON.stringify(grid)), openSet: [...openSet], closedSet: [...closedSet], path: [], current },
      explanation: `Selected the node (${current.row}, ${current.col}) with the lowest F-cost of ${current.f}. Moving it from the open set (green) to the closed set (orange).`,
    });

    // Check neighbors
    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (closedSet.includes(neighbor)) {
        continue; // Already evaluated
      }

      let tempG = current.g + 1; // Distance is always 1 in a grid
      let newPath = false;
      if (openSet.includes(neighbor)) {
        if (tempG < neighbor.g) {
          neighbor.g = tempG;
          newPath = true;
        }
      } else {
        neighbor.g = tempG;
        openSet.push(neighbor);
        newPath = true;
      }

      if (newPath) {
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;
        
        steps.push({
          visualState: { grid: JSON.parse(JSON.stringify(grid)), openSet: [...openSet], closedSet: [...closedSet], path: [], current },
          explanation: `Evaluating neighbor (${neighbor.row}, ${neighbor.col}). Updated its G-cost to ${neighbor.g} and F-cost to ${neighbor.f}.`,
        });
      }
    }
  }

  // No solution
  steps.push({
    visualState: { grid, openSet, closedSet, path: [] },
    explanation: 'The open set is empty, but the end node was not reached. No path exists.',
  });
  return steps;
}