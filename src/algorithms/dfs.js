// src/algorithms/dfs.js

export function runDfs(graph, startNode) {
  const steps = [];
  const stack = [startNode];
  const visited = new Set();
  
  const nodeStates = {};
  for (const node in graph) {
    nodeStates[node] = 'unvisited';
  }

  steps.push({
    visualState: { nodeStates: { ...nodeStates }, stack: [startNode], highlightedEdge: null },
    explanation: `We begin Depth-First Search at Node ${startNode}. It's added to a stack, which is a 'last-in, first-out' structure.`,
  });

  while (stack.length > 0) {
    const currentNode = stack.pop();

    if (visited.has(currentNode)) continue;
    
    visited.add(currentNode);
    nodeStates[currentNode] = 'visited';
    
    steps.push({
      visualState: { nodeStates: { ...nodeStates }, stack: [...stack], highlightedEdge: null },
      explanation: `We take the node from the top of the stack: Node ${currentNode}. We mark it 'visited' in blue to show we've processed it.`,
    });

    steps.push({
      visualState: { nodeStates: { ...nodeStates }, stack: [...stack], highlightedEdge: null },
      explanation: `Now, let's look for ${currentNode}'s unvisited neighbors to add them to the stack.`,
    });

    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        nodeStates[neighbor] = 'visiting';

        steps.push({
          visualState: {
            nodeStates: { ...nodeStates },
            stack: [...stack],
            highlightedEdge: { from: currentNode, to: neighbor },
          },
          explanation: `We found an unvisited neighbor, Node ${neighbor}, and pushed it onto the top of the stack. The search will go deeper from here.`,
        });
      }
    }
  }

  steps.push({
    visualState: { nodeStates: { ...nodeStates }, stack: [], highlightedEdge: null },
    explanation: 'The stack is now empty, meaning we have explored all possible paths. The search is complete.',
  });

  return steps;
}