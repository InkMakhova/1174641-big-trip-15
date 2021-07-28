import {createSiteMenuTemplate} from './view/site-menu.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createPriceTemplate} from './view/price.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createPointListTemplate} from './view/point-list';
import {createEditPointTemplate} from './view/edit-point-form.js';
import {createNewPointTemplate} from './view/new-point-form';
import {createPointTemplate} from './view/point.js';

const POINTS = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(tripMainElement, createTripInfoTemplate(), 'afterbegin');
render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');
render (filterElement, createFilterTemplate(), 'beforeend');

const tripInfoElement = tripMainElement.querySelector('.trip-info');

render(tripInfoElement, createPriceTemplate(), 'beforeend');

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripEventsElement, createSortTemplate(), 'beforeend');
render(tripEventsElement, createPointListTemplate(), 'beforeend');

const tripEnventsListElement = tripEventsElement.querySelector('.trip-events__list');

render(tripEnventsListElement, createEditPointTemplate(), 'beforeend');
render(tripEnventsListElement, createNewPointTemplate(), 'beforeend');

for (let i = 0; i < POINTS; i++) {
  render(tripEnventsListElement, createPointTemplate(), 'beforeend');
}

