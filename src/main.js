import {filtersList} from './constants.js';
import {getRandomInteger} from './utils/common.js';
import {
  render,
  RenderPosition
} from './utils/render.js';
// import {getFilteredPoints} from './presenter/filters-presenter.js';
// import {getSortedPoints} from './presenter/sort-presenter.js';
import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import PriceView from './view/price.js';
import FiltersView from './view/filters';
import TripPresenter from './presenter/trip.js';
import {generateDataPoint} from './mock/point-mock.js';
//import {formats} from 'dayjs/locale/*';

const POINTS_NUMBER = 20;

const points = Array.from({length: POINTS_NUMBER}, () => generateDataPoint());

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');

const tripInfoComponent = new TripInfoView();
render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent, new PriceView(getRandomInteger(200, 1000)));

render(siteMenuElement, new SiteMenuView());

const filtersComponent = new FiltersView(filtersList);
render(filterElement, filtersComponent);

//tripContainer
const tripContainerElement = document.querySelector('.page-main').querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripContainerElement);
tripPresenter.init(points);

// const getFilterValue = () => filtersComponent.getElement()
//   .querySelector('input:checked')
//   .value;

// const getSortValue = () => sortComponent.getElement()
//   .querySelector('input:checked')
//   .value;

// const filterAndSortPoints = (filterValue, sortValue) => {
//   const tripEnventsListElement = tripComponent.getElement()
//     .querySelector('.trip-events__list');

//   const tripEmptyListElement = tripComponent.getElement()
//     .querySelector('.trip-events__msg');

//   if (tripEnventsListElement) {
//     tripEnventsListElement.remove();
//   }

//   if (tripEmptyListElement) {
//     tripEmptyListElement.remove();
//   }

//   const filteredPoints = getFilteredPoints(points, filterValue);

//   if (filteredPoints.length === 0) {
//     render(tripComponent, new PointListEmptyView(filterValue));
//   } else {
//     const pointListComponent = new PointListView();
//     render(tripComponent, pointListComponent);

//     getSortedPoints(filteredPoints, sortValue)
//       .map((point) => {
//         renderPoint(pointListComponent.getElement(), point);
//       });
//   }
// };

// const filterPoints = (evt) => filterAndSortPoints(evt.target.value, getSortValue());

// const sortPoints = (evt) => filterAndSortPoints(getFilterValue(), evt.target.value);

// if (points.length === 0) {
//   render(tripComponent, new PointListEmptyView());
// } else {
//   filterAndSortPoints(getFilterValue(), getSortValue());
// }

// const addNewPointForm = () => {
//   renderElement(tripEnventsListElement, new PointFormView('new').getElement(), RenderPosition.AFTERBEGIN);

//   eventAddButton.disabled = true;
//   eventAddButton.removeEventListener('click', addNewPointForm);

//   sortForm.querySelector('#sort-time').checked = true;
//   filterForm.querySelector('#filter-everything').checked = true;
// };

//eventAddButton.addEventListener('click', addNewPointForm);

// filtersComponent.setFilterChangeHandler((evt) => {
//   filterPoints(evt);
// });

// sortComponent.setSortChangeHandler((evt) => {
//   sortPoints(evt);
// });
