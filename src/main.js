import {filtersList} from './constants.js';
import {getRandomInteger} from './utils/common.js';
import {
  render,
  RenderPosition
} from './utils/render.js';
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

const tripContainerElement = document.querySelector('.page-main').querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripContainerElement);
tripPresenter.init(points);
