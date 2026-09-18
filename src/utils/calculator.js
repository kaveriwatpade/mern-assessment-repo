export const FACTORS = [
  { id: 'genetic', name: 'Genetic Inheritance', min: 9.333, max: 10.777 },
  { id: 'vitality', name: 'Constitutional Vitality', min: 8.111, max: 9.111 },
  { id: 'mental', name: 'Mental Patterns', min: 6.111, max: 7.111 },
  { id: 'intellectual', name: 'Intellectual Capacity', min: 6.333, max: 6.999 },
  { id: 'emotional', name: 'Emotional Foundation', min: 7.111, max: 7.999 },
  { id: 'spiritual', name: 'Spiritual Lineage', min: 5.011, max: 6.011 },
  { id: 'soul', name: 'Soul Connections', min: 5.111, max: 6.222 },
];

export function calculateLegacy(dobStr) {
  if (!dobStr) return null;

  const date = new Date(dobStr);
  const day = date.getDate();
  const isOdd = day % 2 !== 0;

  // Fixed values from the provided images
  const oddValues = [
    { m: 10.140, f: 9.431 },
    { m: 8.422, f: 8.325 },
    { m: 6.553, f: 6.439 },
    { m: 6.999, f: 6.655 },
    { m: 7.957, f: 7.439 },
    { m: 5.726, f: 5.039 },
    { m: 5.667, f: 5.208 }
  ];

  const evenValues = [
    { m: 10.233, f: 10.719 },
    { m: 8.198, f: 8.545 },
    { m: 6.611, f: 6.588 },
    { m: 6.316, f: 6.443 },
    { m: 7.382, f: 6.606 },
    { m: 5.109, f: 5.975 },
    { m: 5.113, f: 6.162 }
  ];

  const valuesToUse = isOdd ? oddValues : evenValues;

  const result = FACTORS.map((f, i) => {
    const motherVal = valuesToUse[i].m;
    const fatherVal = valuesToUse[i].f;
    return {
      ...f,
      mother: motherVal,
      father: fatherVal,
      total: Number((motherVal + fatherVal).toFixed(3))
    };
  });

  const motherTotal = isOdd ? 51.464 : 48.962;
  const fatherTotal = isOdd ? 48.536 : 51.038;
  const grandTotal = 100.000;

  return {
    factors: result,
    motherTotal,
    fatherTotal,
    grandTotal,
    dominantParent: isOdd ? 'Mother' : 'Father'
  };
}
