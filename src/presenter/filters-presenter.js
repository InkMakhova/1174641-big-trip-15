import {NOW} from '../constants.js';

export const getFilteredPoints = (dataPoints, filterName) => {
  const filteredPoints = {
    everything: (points) => points,
    past: (points) => points.filter((point) => point.dateTo < NOW),
    future: (points) => points.filter((point) => point.dateFrom >= NOW),
  };

  return filteredPoints[filterName](dataPoints);
};
