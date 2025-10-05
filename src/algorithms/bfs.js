// src/algorithms/bfs.js

export function runBfs(graph, startNode) {
  const steps = [];
  const queue = [startNode];
  const visited = new Set();
  visited.add(startNode);

  const nodeStates = {};
  for (const node in graph) {
    nodeStates[node] = 'unvisited';
  }
  nodeStates[startNode] = 'visiting';

  steps.push({
    visualState: { nodeStates: { ...nodeStates }, queue: [...queue], highlightedEdge: null },
    explanation: `We begin Breadth-First Search at our starting node, ${startNode}. It's added to a queue, which works like a waiting line.`,
  });

  while (queue.length > 0) {
    const currentNode = queue.shift();
    nodeStates[currentNode] = 'visited';

    steps.push({
      visualState: { nodeStates: { ...nodeStates }, queue: [...queue], highlightedEdge: null },
      explanation: `Next, we process the node at the front of the queue: Node ${currentNode}. We mark it 'visited' in blue so we don't visit it again.`,
    });

    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        nodeStates[neighbor] = 'visiting';
        queue.push(neighbor);

        steps.push({
          visualState: {
            nodeStates: { ...nodeStates },
            queue: [...queue],
            highlightedEdge: { from: currentNode, to: neighbor },
          },
          explanation: `Looking at ${currentNode}'s neighbors, we find the unvisited Node ${neighbor}. We add it to the end of the queue to be explored later.`,
        });
      }
    }
  }

  steps.push({
    visualState: { nodeStates: { ...nodeStates }, queue: [], highlightedEdge: null },
    explanation: 'The queue is now empty, which means we have visited every reachable node. The search is complete.',
  });

  return steps;
}