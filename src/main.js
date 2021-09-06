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
import {destinations} from './mock/destinations.js';
import {
  MenuItem,
  UpdateType,
  FilterType
} from './constants.js';
import Api from './api.js';
import NewPointButtonView from './view/button-new-point.js';

const AUTHORIZATION = 'Basic er883jdzbdw';
const END_POINT = 'https://13.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
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

const newPointButtonComponent = new NewPointButtonView();
render(tripMainElement, newPointButtonComponent.getElement());

const tripContainerElement = document.querySelector('.page-main').querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripContainerElement, destinations, pointsModel, filterModel);

const handleNewPointFormClose = () => {
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
      tripPresenter.destroy();
      //добавлен сброс фильтров
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      newPointButtonComponent.activateButton();
      break;

    case MenuItem.STATISTICS:
      tripPresenter.destroy();
      remove(statisticsComponent);
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(tripContainerElement, statisticsComponent);
      newPointButtonComponent.disableButton();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

api.getPoints().then((points) => {
  console.log(points);
  pointsModel.setPoints(points);
});
