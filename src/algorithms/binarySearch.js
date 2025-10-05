// src/algorithms/binarySearch.js

export function runBinarySearch(array, target) {
  const steps = [];
  let low = 0;
  let high = array.length - 1;

  // Initial state
  steps.push({
    visualState: { low, high, mid: null, highlighted: [], discarded: [] },
    explanation: `Starting Binary Search for target ${target}. Low is at index ${low}, High is at index ${high}.`,
  });

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let midValue = array[mid];

    // Midpoint calculation step
    steps.push({
      visualState: { low, high, mid, highlighted: [mid], discarded: getDiscarded(array, low, high) },
      explanation: `Calculating midpoint: (${low} + ${high}) / 2 = ${mid}. The value is ${midValue}.`,
    });

    if (midValue === target) {
      // Found target
      steps.push({
        visualState: { low, high, mid, highlighted: [mid], discarded: getDiscarded(array, low, high), found: true },
        explanation: `Success! Target ${target} found at index ${mid}.`,
      });
      return steps;
    } else if (midValue < target) {
      // Discard left half
      steps.push({
        visualState: { low, high, mid, highlighted: [mid], discarded: getDiscarded(array, low, high) },
        explanation: `${midValue} is less than ${target}. Discarding the left half.`,
      });
      low = mid + 1;
    } else {
      // Discard right half
      steps.push({
        visualState: { low, high, mid, highlighted: [mid], discarded: getDiscarded(array, low, high) },
        explanation: `${midValue} is greater than ${target}. Discarding the right half.`,
      });
      high = mid - 1;
    }
     // Update pointers state
    steps.push({
      visualState: { low, high, mid: null, highlighted: [], discarded: getDiscarded(array, low, high) },
      explanation: `Updating pointers: Low is now ${low}, High is now ${high}.`,
    });
  }

  // Not found
  steps.push({
    visualState: { low, high, mid: null, highlighted: [], discarded: array.map((_, i) => i), found: false },
    explanation: `Search space is empty. Target ${target} was not found in the array.`,
  });

  return steps;
}

// Helper to get indices of discarded elements
function getDiscarded(array, low, high) {
    return array.map((_, i) => i).filter(i => i < low || i > high);
}