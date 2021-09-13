import {
  MenuItem,
  UpdateType,
  FilterType
} from './constants.js';
import {
  isOnline,
  getRandomInteger
} from './utils/common.js';
import {
  render,
  RenderPosition,
  remove
} from './utils/render.js';
import {toast} from './utils/toast.js';
import StatisticsView from './view/statistics.js';
import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import NewPointButtonView from './view/button-new-point.js';
import PriceView from './view/price.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import DestinationsModel from './model/destinations.js';
import OffersModel from './model/offers.js';
import FilterModel from './model/filter.js';
import Api from './api/api.js';
import Store from './api/store.js';
import Provider from './api/provider.js';

const AUTHORIZATION = 'Basic er883jdzbdw';
const END_POINT = 'https://13.ecmascript.pages.academy/big-trip';

const POINTS_PREFIX = 'points';
const DESTINATIONS_PREFIX = 'destinations';
const OFFERS_PREFIX = 'offers';
const STORE_VER = 'v1';

const POINTS_STORE_NAME = `${POINTS_PREFIX}-${STORE_VER}`;
const DESTINATIONS_STORE_NAME = `${DESTINATIONS_PREFIX}-${STORE_VER}`;
const OFFERS_STORE_NAME = `${OFFERS_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);

const pointsStore = new Store(POINTS_STORE_NAME, window.localStorage);
const destinationsStore = new Store(DESTINATIONS_STORE_NAME, window.localStorage);
const offersStore = new Store(OFFERS_STORE_NAME, window.localStorage);

const apiPointsWithProvider = new Provider(api, pointsStore);
const apiDestinationsWithProvider = new Provider(api, destinationsStore);
const apiOffersWithProvider = new Provider(api, offersStore);

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteMenuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');

const tripInfoComponent = new TripInfoView();

const siteMenuComponent = new SiteMenuView();

const filterPresenter = new FilterPresenter(filterElement, filterModel, pointsModel);

const newPointButtonComponent = new NewPointButtonView();
render(tripMainElement, newPointButtonComponent.getElement());

const tripContainerElement = document.querySelector('.page-main').querySelector('.trip-events');

//api.getDestinations()
apiDestinationsWithProvider.getDestinations()
  .then((destinations) => {
    destinationsModel.setDestinations(UpdateType.INIT, destinations);
  });

//api.getOffers()
apiOffersWithProvider.getOffers()
  .then((offers) => {
    offersModel.setOffers(UpdateType.INIT, offers);
  });

const tripPresenter =
  new TripPresenter(tripContainerElement, pointsModel, destinationsModel, offersModel, filterModel, api);

const handleNewPointFormClose = () => {
  if (!isOnline()) {
    toast('You can\'t create new point offline');
  }
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

filterPresenter.init();
tripPresenter.init();

//api.getPoints()
apiPointsWithProvider.getPoints()
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
    render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(tripInfoComponent, new PriceView(getRandomInteger(200, 1000)));
    render(siteMenuElement, siteMenuComponent);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
  // .catch(() => {
  //   pointsModel.setPoints(UpdateType.INIT, []);
  //   render(tripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);
  //   render(tripInfoComponent, new PriceView(getRandomInteger(200, 1000)));
  //   render(siteMenuElement, siteMenuComponent);
  //   siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  // });

window.addEventListener('load', () => {
  //проверка сделана для старых браузеров, в которых нет поддержки serviceWorker
  //if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
  //}
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiPointsWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
