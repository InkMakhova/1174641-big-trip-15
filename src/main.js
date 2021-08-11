import {
  filtersList,
  sortList
} from './constants.js';

import {
  isEscEvent,
  getRandomInteger
} from './utils/common.js';

import {
  render,
  RenderPosition,
  replace
} from './utils/render.js';

import {getFilteredPoints} from './presenter/filters-presenter.js';
import {getSortedPoints} from './presenter/sort-presenter.js';
import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import PriceView from './view/price.js';
import FiltersView from './view/filters';
import SortView from './view/sort.js';
import PointListView from './view/point-list';
import PointListEmptyView from './view/point-list-empty.js';
import PointView from './view/point.js';
import PointFormView from './view/add-edit-point.js';

import {generateDataPoint} from './mock/point-mock.js';

//import {formats} from 'dayjs/locale/*';

const POINTS_NUMBER = 20;

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
//const eventAddButton = siteHeaderElement.querySelector('.trip-main__event-add-btn');

const tripInfoComponent = new TripInfoView();
render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent, new PriceView(getRandomInteger(200, 1000)));

render(siteMenuElement, new SiteMenuView());

const filtersComponent = new FiltersView(filtersList);
render(filterElement, filtersComponent);

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const sortComponent = new SortView(sortList);
render(tripEventsElement, sortComponent);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointFormView('edit', point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const pointClickEscHandler = (evt) => {
    if (isEscEvent(evt)) {
      replaceFormToPoint();

      document.removeEventListener('keydown', pointClickEscHandler);
    }
  };

  pointComponent.setRollUpHandler(() => {
    replacePointToForm();

    document.addEventListener('keydown', pointClickEscHandler);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();

    document.removeEventListener('keydown', pointClickEscHandler);
  });

  pointEditComponent.setRollUpHandler(() => {
    replaceFormToPoint();

    document.removeEventListener('keydown', pointClickEscHandler);
  });

  render(pointListElement, pointComponent);
};

const getFilterValue = () => filtersComponent.getElement()
  .querySelector('input:checked')
  .value;

const getSortValue = () => sortComponent.getElement()
  .querySelector('input:checked')
  .value;

const points = Array.from({length: POINTS_NUMBER}, () => generateDataPoint());

const filterAndSortPoints = (filterValue, sortValue) => {
  const tripEnventsListElement = tripEventsElement
    .querySelector('.trip-events__list');

  const tripEmptyListElement = tripEventsElement
    .querySelector('.trip-events__msg');

  if (tripEnventsListElement) {
    tripEnventsListElement.remove();
  }

  if (tripEmptyListElement) {
    tripEmptyListElement.remove();
  }

  const filteredPoints = getFilteredPoints(points, filterValue);

  if (filteredPoints.length === 0) {
    render(tripEventsElement, new PointListEmptyView(filterValue));
  } else {
    const pointListComponent = new PointListView();
    render(tripEventsElement, pointListComponent);

    getSortedPoints(filteredPoints, sortValue)
      .map((point) => {
        renderPoint(pointListComponent.getElement(), point);
      });
  }
};

const filterPoints = (evt) => filterAndSortPoints(evt.target.value, getSortValue());

const sortPoints = (evt) => filterAndSortPoints(getFilterValue(), evt.target.value);

if (points.length === 0) {
  render(tripEventsElement, new PointListEmptyView());
} else {
  filterAndSortPoints(getFilterValue(), getSortValue());
}

// const addNewPointForm = () => {
//   renderElement(tripEnventsListElement, new PointFormView('new').getElement(), RenderPosition.AFTERBEGIN);

//   eventAddButton.disabled = true;
//   eventAddButton.removeEventListener('click', addNewPointForm);

//   sortForm.querySelector('#sort-time').checked = true;
//   filterForm.querySelector('#filter-everything').checked = true;
// };

//eventAddButton.addEventListener('click', addNewPointForm);

filtersComponent.setFilterChangeHandler((evt) => {
  filterPoints(evt);
});

sortComponent.setSortChangeHandler((evt) => {
  sortPoints(evt);
});
