import dayjs from 'dayjs';
import {PointTypes} from '../constants.js';

export const typeToHex = {
  [PointTypes.TAXI]: '#FED6BC',
  [PointTypes.BUS]: '#FFFADD',
  [PointTypes.TRAIN]: '#DEF7FE',
  [PointTypes.FLIGHT]: '#E7ECFF',
  [PointTypes.CHECKIN]: '#C3FBD8',
  [PointTypes.SIGHTSEENG]: '#FDEED9',
  [PointTypes.SHIP]: '#F6FFF8',
  [PointTypes.DRIVE]: '#B5F2EA',
  [PointTypes.RESTAURANT]: '#C6D8FF',
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
