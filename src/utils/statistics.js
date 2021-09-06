import dayjs from 'dayjs';
import {PointTypes} from '../constants.js';

export const typeToHex = {
  [PointTypes.TAXI]: '#28b0ff',
  [PointTypes.BUS]: '#49d1ff',
  [PointTypes.TRAIN]: '#078ff0',
  [PointTypes.FLIGHT]: '#004dae',
  [PointTypes.CHECKIN]: '#006ecf',
  [PointTypes.SIGHTSEENG]: '#5cd7e2',
  [PointTypes.SHIP]: '#8bffff',
  [PointTypes.DRIVE]: '#6af2ff',
  [PointTypes.RESTAURANT]: '#40677f',
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
