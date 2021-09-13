import dayjs from 'dayjs';

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
