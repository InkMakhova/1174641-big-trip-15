import {humanizeTimeDuration} from '../utils/point.js';

export const isOnline = () => window.navigator.onLine;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getKeyByValue = (object, value) =>
  Object.keys(object)
    .find((key) => object[key] === value);

export const isEscEvent = (evt) => ['Escape', 'Esc'].includes(evt.key);

export const formatDurationElement = (duration) => {
  let days = '';
  let hours = '';
  let minutes = '';

  if (humanizeTimeDuration(duration).days !== 0) {
    days = `0${humanizeTimeDuration(duration).days}D `.slice(-4);
    hours = '00H ';
  }

  if (humanizeTimeDuration(duration).hours !== 0) {
    hours = `0${humanizeTimeDuration(duration).hours}H `.slice(-4);
  }

  minutes = `0${humanizeTimeDuration(duration).minutes}M`.slice(-3);

  return `${days}${hours}${minutes}`;
};
