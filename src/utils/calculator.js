export const FACTORS = [
  { id: 'genetic', name: 'Genetic Inheritance', min: 9.333, max: 10.777 },
  { id: 'vitality', name: 'Constitutional Vitality', min: 8.111, max: 9.111 },
  { id: 'mental', name: 'Mental Patterns', min: 6.111, max: 7.111 },
  { id: 'intellectual', name: 'Intellectual Capacity', min: 6.333, max: 6.999 },
  { id: 'emotional', name: 'Emotional Foundation', min: 7.111, max: 7.999 },
  { id: 'spiritual', name: 'Spiritual Lineage', min: 5.011, max: 6.011 },
  { id: 'soul', name: 'Soul Connections', min: 5.111, max: 6.222 },
];

/**
 * Distributes a target sum among a set of items respecting their individual capacities.
 * @param {number} targetSum - The remaining sum to distribute.
 * @param {Array<{maxCapacity: number, index: number}>} items - Array of items with capacities.
 * @returns {Array<number>} - Array of allocated amounts corresponding to the items.
 */
function distributeRandomly(targetSum, items) {
  let remaining = targetSum;
  let allocations = new Array(items.length).fill(0);
  let availableItems = items.map((item, idx) => ({ ...item, listIdx: idx })).filter(item => item.maxCapacity > 0);

  // We loop to distribute chunks until remaining is very small
  while (remaining > 0.0001 && availableItems.length > 0) {
    // Generate random weights
    let weights = availableItems.map(() => Math.random());
    let weightSum = weights.reduce((a, b) => a + b, 0);
    
    if (weightSum === 0) {
      weights = availableItems.map(() => 1);
      weightSum = weights.length;
    }

    let toDistribute = remaining;
    let distributedInRound = 0;

    for (let i = 0; i < availableItems.length; i++) {
      let item = availableItems[i];
      let amount = toDistribute * (weights[i] / weightSum);
      
      // Don't exceed capacity
      let actualAmount = Math.min(amount, item.maxCapacity - allocations[item.listIdx]);
      allocations[item.listIdx] += actualAmount;
      distributedInRound += actualAmount;
    }

    remaining -= distributedInRound;

    // Filter out items that are full
    availableItems = availableItems.filter(item => item.maxCapacity - allocations[item.listIdx] > 0.0001);
  }

  // Handle tiny remaining rounding differences by dumping into the first available item
  if (remaining > 0.0001 && availableItems.length > 0) {
    allocations[availableItems[0].listIdx] += remaining;
  }

  return allocations;
}

export function calculateLegacy(dobStr) {
  if (!dobStr) return null;

  const date = new Date(dobStr);
  const day = date.getDate();
  const isOdd = day % 2 !== 0;

  // Total min sum for one parent is ~47.121
  // Total min sum for both parents is ~94.242
  // We need to distribute exactly (100 - 94.242) = 5.758
  const TARGET_TOTAL = 100;
  
  let currentTotalMin = FACTORS.reduce((sum, f) => sum + f.min * 2, 0); // Both mother and father start at min
  let amountToDistribute = TARGET_TOTAL - currentTotalMin; // Should be ~5.758

  // We want Mother > Father if Odd, and Father > Mother if Even.
  // We distribute `amountToDistribute` unevenly.
  let motherShareRatio = isOdd ? 0.7 + Math.random() * 0.1 : 0.2 + Math.random() * 0.1;
  let motherTargetAdd = amountToDistribute * motherShareRatio;
  let fatherTargetAdd = amountToDistribute - motherTargetAdd;

  // Setup items for distribution
  const motherItems = FACTORS.map((f, i) => ({ maxCapacity: f.max - f.min, index: i }));
  const fatherItems = FACTORS.map((f, i) => ({ maxCapacity: f.max - f.min, index: i }));

  const motherAdditions = distributeRandomly(motherTargetAdd, motherItems);
  const fatherAdditions = distributeRandomly(fatherTargetAdd, fatherItems);

  // Combine to final result
  const result = FACTORS.map((f, i) => {
    const motherVal = f.min + motherAdditions[i];
    const fatherVal = f.min + fatherAdditions[i];
    return {
      ...f,
      mother: Number(motherVal.toFixed(3)),
      father: Number(fatherVal.toFixed(3)),
      total: Number((motherVal + fatherVal).toFixed(3))
    };
  });

  // Calculate totals to ensure they sum perfectly. Due to toFixed(3), we might have 0.001 discrepancy
  let finalMotherTotal = result.reduce((sum, f) => sum + f.mother, 0);
  let finalFatherTotal = result.reduce((sum, f) => sum + f.father, 0);
  let grandTotal = finalMotherTotal + finalFatherTotal;

  // Correct rounding errors
  let diff = Number((TARGET_TOTAL - grandTotal).toFixed(3));
  if (diff !== 0) {
    // Add/subtract diff from the highest capacity item that can take it, or just first item
    // For simplicity, adjust the first factor of the dominant parent
    if (isOdd) {
      result[0].mother = Number((result[0].mother + diff).toFixed(3));
      result[0].total = Number((result[0].total + diff).toFixed(3));
    } else {
      result[0].father = Number((result[0].father + diff).toFixed(3));
      result[0].total = Number((result[0].total + diff).toFixed(3));
    }
  }

  // Recalculate totals after rounding correction
  finalMotherTotal = result.reduce((sum, f) => sum + f.mother, 0);
  finalFatherTotal = result.reduce((sum, f) => sum + f.father, 0);
  grandTotal = finalMotherTotal + finalFatherTotal;

  return {
    factors: result,
    motherTotal: Number(finalMotherTotal.toFixed(3)),
    fatherTotal: Number(finalFatherTotal.toFixed(3)),
    grandTotal: Number(grandTotal.toFixed(3)),
    dominantParent: isOdd ? 'Mother' : 'Father'
  };
}
