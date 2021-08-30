import dayjs from 'dayjs';
import {FilterType} from '../constants.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.PAST]: (points) =>
    points.filter((point) =>
      point.dateTo < dayjs() || (point.dateFrom < dayjs() && point.dateTo > dayjs())),
  [FilterType.FUTURE]: (points) =>
    points.filter((point) =>
      point.dateFrom >= dayjs() || (point.dateFrom < dayjs() && point.dateTo > dayjs())),
};
