import {humanizeTimeDuration} from '../utils/point.js';

export const isOnline = () => window.navigator.onLine;

export const isInteger = (num) => (num ^ 0) === num;

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getKeyByValue = (data, value) =>
  Object.keys(data)
    .find((key) => data[key] === value);

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
