import {NOW} from '../constants.js';

export const getFilteredPoints = (pointsList, filterName) => {
  const filteredPoints = {
    everything: (points) => points,
    past: (points) => points.filter((point) => point.dateTo < NOW),
    future: (points) => points.filter((point) => point.dateFrom >= NOW),
  };

  return filteredPoints[filterName](pointsList);
};
