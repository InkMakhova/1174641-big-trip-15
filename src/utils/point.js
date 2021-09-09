import dayjs from 'dayjs';

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;

export const formateDateTime = (date, format) => dayjs(date).format(format);

export const humanizeTimeDuration = (durationObject) => {
  const hours = durationObject.diffHours%HOURS_IN_DAY;
  const minutes = durationObject.diffMinutes%MINUTES_IN_HOUR;

  return {
    days: durationObject.diffDays,
    hours: hours,
    minutes: minutes,
  };
};

const getWeightForNullItem = (itemA, itemB) => {
  if (itemA === null && itemB === null) {
    return 0;
  }

  if (itemA === null) {
    return 1;
  }

  if (itemB === null) {
    return -1;
  }

  return null;
};

export const sortPointsTime = (pointA, pointB) => {
  const weight = getWeightForNullItem(pointA.duration, pointB.duration);

  if (weight !== null) {
    return weight;
  }

  return pointB.duration-pointA.duration;
};

export const sortPointsPrice = (pointA, pointB) => {
  const weight = getWeightForNullItem(pointA.basePrice, pointB.basePrice);

  if (weight !== null) {
    return weight;
  }

  return pointB.basePrice-pointA.basePrice;
};

export const sortPointsDay = (pointA, pointB) => {
  const weight = getWeightForNullItem(pointA.dateFrom, pointB.dateFrom);

  if (weight !== null) {
    return weight;
  }

  return dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
};

export const isDatesEqual = (dateA, dateB) =>
  (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB);

export const isPriceEqual = (priceA, priceB) =>
  (priceA === null && priceB === null) ? true : priceA === priceB;

