import {now} from '../constants.js';

export const getFilteredPoints = (pointsList, filterName) => {
  const filteredPoints = {
    everything: (points) => points,
    past: (points) => points.filter((point) => point.dateTo < now),
    future: (points) => points.filter((point) => point.dateFrom >= now),
  };

  return filteredPoints[filterName](pointsList);
};
