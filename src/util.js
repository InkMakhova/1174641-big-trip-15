import dayjs from 'dayjs';

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const formateDateTime = (date, format) => dayjs(date).format(format);

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place = RenderPosition.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const humanizedTimeDuration = (durationObject) => {
  const hours = durationObject.diffHours%HOURS_IN_DAY;
  const minutes = durationObject.diffMinutes%MINUTES_IN_HOUR;
  return {
    days: durationObject.diffDays,
    hours: hours,
    minutes: minutes,
  };
};

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getKeyByValue = (object, value) =>
  Object.keys(object)
    .find((key) => object[key] === value);

export const isEscEvent = (evt) => ['Escape', 'Esc'].includes(evt.key);
