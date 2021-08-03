import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const formateDateTime = (date, format) => dayjs(date).format(format);

export const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

export const humanizedTimeDuration = (durationObject) => {
  const hours = durationObject.diffHours%24;
  const minutes = durationObject.diffMinutes%60;
  return {
    days: durationObject.diffDays,
    hours: hours,
    minutes: minutes,
  };
};

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);
