import dayjs from 'dayjs';
import {FilterType, today} from '../constants.js';

const isActivePoint = (point) =>
  dayjs(point.dateFrom).isBefore(today, 'D') && !dayjs(point.dateTo).isBefore(today, 'D');

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.PAST]: (points) =>
    points.filter((point) =>
      dayjs(point.dateTo).isBefore(today, 'D') || isActivePoint(point)),
  [FilterType.FUTURE]: (points) =>
    points.filter((point) =>
      !dayjs(point.dateFrom).isBefore(today, 'D') || isActivePoint(point)),
};
