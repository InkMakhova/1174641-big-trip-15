import {FilterType, today} from '../constants.js';

const isActivePoint = (point) => point.dateFrom < today && point.dateTo > today;

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.PAST]: (points) =>
    points.filter((point) =>
      point.dateTo < today || isActivePoint(point)),
  [FilterType.FUTURE]: (points) =>
    points.filter((point) =>
      point.dateFrom >= today || isActivePoint(point)),
};
