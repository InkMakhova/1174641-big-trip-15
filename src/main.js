import {render} from './util.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createPriceTemplate} from './view/price.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createPointListTemplate} from './view/point-list';
import {createEditPointTemplate} from './view/edit-point-form.js';
import {createNewPointTemplate} from './view/new-point-form';
import {createPointTemplate} from './view/point.js';
import {generateDataPoint} from './mock/point-mock.js';
//import {formats} from 'dayjs/locale/*';

const POINTS_NUMBER = 20;

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const eventAddButton = siteHeaderElement.querySelector('.trip-main__event-add-btn');

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

const points = new Array(POINTS_NUMBER).fill(null).map(() => generateDataPoint());

render(tripEnventsListElement, createEditPointTemplate(points[0]));
render(tripEnventsListElement, createNewPointTemplate());

points.map((point) => render(tripEnventsListElement, createPointTemplate(point)));

const loadData = (onSuccess, onFail) => {
  fetch('https://15.ecmascript.pages.academy/big-trip/points', {
    headers: {
      Authorization: 'Basic kTy9gIdsz2317rD.',
    }}).then((response) => response.json())
    .then(onSuccess)
    .catch(onFail);
};

loadData((data) => {console.log(data);});

eventAddButton.addEventListener('click', render(tripEnventsListElement, createNewPointTemplate()));

console.log(points);
