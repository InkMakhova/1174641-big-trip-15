import {createSiteMenuTemplate} from './view/site-menu.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createPriceTemplate} from './view/price.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createPointListTemplate} from './view/point-list';
import {createEditPointTemplate} from './view/edit-point-form.js';
import {createNewPointTemplate} from './view/new-point-form';
import {createPointTemplate} from './view/point.js';
//import {generatePointDescription} from './mock/point-mock.js';
//import { formats } from 'dayjs/locale/*';

const POINTS = 3;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(tripMainElement, createTripInfoTemplate(), 'afterbegin');
render(siteMenuElement, createSiteMenuTemplate());
render (filterElement, createFilterTemplate());

const tripInfoElement = tripMainElement.querySelector('.trip-info');

render(tripInfoElement, createPriceTemplate());

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createPointListTemplate());

const tripEnventsListElement = tripEventsElement.querySelector('.trip-events__list');

render(tripEnventsListElement, createEditPointTemplate());
render(tripEnventsListElement, createNewPointTemplate());

for (let i = 0; i < POINTS; i++) {
  render(tripEnventsListElement, createPointTemplate());
}

