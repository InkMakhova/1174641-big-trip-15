export const getSortedPoints = (pointsList, sortName) => {
  const sortedPoints = {
    'sort-day': (points) => points.slice().sort((a, b) => b.dateFrom - a.dateFrom),
    'sort-price': (points) => points.slice().sort((a, b) => b.basePrice - a.basePrice),
    'sort-time': (points) => points.slice().sort((a, b) => b.duration - a.duration),
  };

  return sortedPoints[sortName](pointsList);
};
