import {getRandomInteger} from './utils/common.js';
import {
  render,
  RenderPosition,
  remove
} from './utils/render.js';
import StatisticsView from './view/statistics.js';
import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import PriceView from './view/price.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import {generateDataPoint} from './mock/point-mock.js';
import {destinations} from './mock/destinations.js';
import {MenuItem} from './constants.js';

import NewPointButtonView from './view/button-new-point.js';

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

const siteMenuComponent = new SiteMenuView();
render(siteMenuElement, siteMenuComponent);

const filterPresenter = new FilterPresenter(filterElement, filterModel, pointsModel);
filterPresenter.init();

const newPointButtonComponent = new NewPointButtonView();
render(tripMainElement, newPointButtonComponent.getElement());

const tripContainerElement = document.querySelector('.page-main').querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripContainerElement, destinations, pointsModel, filterModel);

tripPresenter.init();

const handleNewPointFormClose = () => {
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
  newPointButtonComponent.activateButton();
};

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
};

newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticsComponent);
      newPointButtonComponent.activateButton();
      tripPresenter.init();
      break;

    case MenuItem.STATISTICS:
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(tripContainerElement, statisticsComponent);
      newPointButtonComponent.deactivateButton();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
