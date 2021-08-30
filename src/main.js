import {FilterType} from './constants.js';
import {getRandomInteger} from './utils/common.js';
import {
  render,
  RenderPosition
} from './utils/render.js';
import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import PriceView from './view/price.js';
//import FiltersView from './view/filter';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import {generateDataPoint} from './mock/point-mock.js';
import dayjs from 'dayjs';

const POINTS_NUMBER = 20;

const points = Array.from({length: POINTS_NUMBER}, () => generateDataPoint());

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');

const tripInfoComponent = new TripInfoView();
render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripInfoComponent, new PriceView(getRandomInteger(200, 1000)));

render(siteMenuElement, new SiteMenuView());

// const filtersComponent = new FiltersView(filters, 'everything');
// render(filterElement, filtersComponent);

const filterPresenter = new FilterPresenter(filterElement, filterModel, pointsModel);
filterPresenter.init();

const tripContainerElement = document.querySelector('.page-main').querySelector('.trip-events');

const loadDestinations = () => {
  fetch('https://15.ecmascript.pages.academy/big-trip/destinations',
    {headers: {'Authorization': 'Basic er883jdzbdw'}})
    .then((response) => response.json())
    .then((destinations) => {
      const tripPresenter = new TripPresenter(tripContainerElement, destinations, pointsModel, filterModel);
      //tripPresenter.init(points);
      tripPresenter.init();
      document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
        evt.preventDefault();
        tripPresenter.createTask();
      });
    })
    .catch(() => {
      const tripPresenter = new TripPresenter(tripContainerElement, [], pointsModel, filterModel);
      //tripPresenter.init(points);
      tripPresenter.init();
      document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
        evt.preventDefault();
        tripPresenter.createTask();
      });
    });
};

loadDestinations();

