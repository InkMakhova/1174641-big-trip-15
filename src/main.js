import {
  render
} from './util.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createPriceTemplate} from './view/price.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createPointListTemplate} from './view/point-list';
import {createPointFormTemplate} from './view/add-edit-point.js';
import {createPointTemplate} from './view/point.js';
import {generateDataPoint} from './mock/point-mock.js';
import {NOW} from './constants.js';
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

const filterForm = filterElement.querySelector('.trip-filters');

const tripInfoElement = tripMainElement.querySelector('.trip-info');

render(tripInfoElement, createPriceTemplate());

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createPointListTemplate());

const sortForm = tripEventsElement.querySelector('.trip-sort');

const tripEnventsListElement = tripEventsElement.querySelector('.trip-events__list');

const points = Array.from({length: POINTS_NUMBER}, () => generateDataPoint());

render(tripEnventsListElement, createPointFormTemplate('edit', points[0]));

points.map((point) => render(tripEnventsListElement, createPointTemplate(point)));

const filterPoints = (evt) => {
  tripEnventsListElement.innerHTML = '';

  switch (evt.target.value) {
    case 'everything':
      points.map((point) => render(tripEnventsListElement, createPointTemplate(point)));
      break;

    case 'past':
      points.map((point) => {
        if (point.dateTo < NOW) {
          render(tripEnventsListElement, createPointTemplate(point));
        }
      });
      break;

    case 'future':
      points.map((point) => {
        if (point.dateFrom >= NOW) {
          render(tripEnventsListElement, createPointTemplate(point));
        }
      });
      break;
  }
};

const sortPoints = (evt) => {
  tripEnventsListElement.innerHTML = '';

  switch (evt.target.value) {
    case 'sort-price':
      points.slice().sort((a, b) => b.basePrice - a.basePrice)
        .map((point) => {
          render(tripEnventsListElement, createPointTemplate(point));
        });
      break;

    case 'sort-time':
      points.slice().sort((a, b) => b.duration - a.duration)
        .map((point) => {
          render(tripEnventsListElement, createPointTemplate(point));
        });
      break;

    case 'sort-day':
      points.slice().sort((a, b) => b.dateFrom - a.dateFrom)
        .map((point) => {
          render(tripEnventsListElement, createPointTemplate(point));
        });
      break;
  }
};

const addNewPointForm = () => {
  render(tripEnventsListElement, createPointFormTemplate('new'), 'afterbegin');

  eventAddButton.disabled = true;
  eventAddButton.removeEventListener('click', addNewPointForm);

  sortForm.querySelector('#sort-time').checked = true;
  filterForm.querySelector('#filter-everything').checked = true;
};

// const loadData = (onSuccess, onFail) => {
//   fetch('https://15.ecmascript.pages.academy/big-trip/points', {
//     headers: {
//       Authorization: 'Basic kTy9gIdsz2317rD.',
//     }}).then((response) => response.json())
//     .then(onSuccess)
//     .catch(onFail);
// };

// loadData((data) => {console.log(data);});

eventAddButton.addEventListener('click', addNewPointForm);

filterForm.addEventListener('change', filterPoints);

sortForm.addEventListener('change', sortPoints);
