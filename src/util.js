import dayjs from 'dayjs';

const MINUTES_IN_DAY = 1440;
const MINUTES_IN_HOUR = 60;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const formateDateTime = (date, format) => dayjs(date).format(format);

export const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

export const humanizedTimeDuration = (minutes) => {
  if (minutes >= 0) {
    if (minutes < MINUTES_IN_HOUR) {
      return {
        minutes: minutes,
        hours: 0,
        days: 0,
      };
    } else if (minutes >= MINUTES_IN_HOUR && minutes < MINUTES_IN_DAY) {
      return {
        minutes: minutes%MINUTES_IN_HOUR,
        hours: Math.trunc(minutes/MINUTES_IN_HOUR),
        days: 0,
      };
    }
    const days = Math.trunc(minutes/MINUTES_IN_DAY);
    const minutesInDays = days*MINUTES_IN_DAY;
    const restMinutes = minutes%MINUTES_IN_DAY;
    const minutesNumber = (minutes - minutesInDays)%MINUTES_IN_HOUR;

    return {
      minutes: restMinutes < MINUTES_IN_HOUR ? restMinutes : minutesNumber,
      hours: restMinutes < MINUTES_IN_HOUR ? 0 : Math.trunc(restMinutes/MINUTES_IN_HOUR),
      days: days,
    };

  }
};

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);
