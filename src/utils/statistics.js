import dayjs from 'dayjs';
import {PointTypes} from '../constants.js';

export const typeToHex = {
  [PointTypes.TAXI]: '#ffff99',
  [PointTypes.BUS]: '#ff9966',
  [PointTypes.TRAIN]: '#669900',
  [PointTypes.FLIGHT]: '#ccffff',
  [PointTypes.CHECKIN]: '#ffccff',
  [PointTypes.SIGHTSEENG]: '#cc3399',
  [PointTypes.SHIP]: '#0000ff',
  [PointTypes.DRIVE]: '#996633',
  [PointTypes.RESTAURANT]: '#33cc33',
};

export const makeItemsUniq = (items) => [...new Set(items)];

export const countPointsByType = (points, type) =>
  points.filter((point) => point.type === type).length;

export const countCostsByType = (points, type) => {
  const pointsByType = points.filter((point) => point.type === type);

  return pointsByType.reduce((total, el) => total + el.basePrice, 0);
};

export const countDurationByType = (points, type) => {
  const pointsByType = points.filter((point) => point.type === type);

  const durations = pointsByType.map((point) => {
    const dateStart = dayjs(point.dateFrom);
    const dateFinish = dayjs(point.dateTo);

    return dateFinish.diff(dateStart);
  });

  return durations.reduce((total, el) => total + el, 0);
};
