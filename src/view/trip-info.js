import {FormatsDateTime} from '../constants.js';
import {
  sortPointsDay,
  formateDateTime
} from '../utils/point.js';
import AbstractView from './abstract.js';

const getTripInfo = (destinations) => {
  const getSecondPoint = () => {
    if (destinations.length < 3) {
      return '&mdash;';
    } else if (destinations.length === 3) {
      return `&mdash; ${destinations[1]} &mdash;`;
    }
    return '&mdash; ... &mdash;';
  };

  return {
    firstPoint: destinations[0],
    secondPoint: getSecondPoint(),
    lastPoint: destinations[destinations.length-1],
  };
};

const createTripInfoTemplate = (points) => {
  const sortedPoints = points.slice().sort(sortPointsDay);
  const destinations = sortedPoints.map((point) => point.destination.name);
  const tripDestinations = destinations.filter((_item, index) => {
    if (index > 0) {
      return destinations[index] !== destinations[index-1];
    }
    return true;
  });

  const firstPoint = getTripInfo(tripDestinations).firstPoint;
  const secondPoint = getTripInfo(tripDestinations).secondPoint;
  const lastPoint = getTripInfo(tripDestinations).lastPoint;

  const startDay = formateDateTime(sortedPoints[0].dateFrom, FormatsDateTime.D_MMM);
  const finishDay = formateDateTime(sortedPoints[sortedPoints.length-1].dateTo, FormatsDateTime.D_MMM);

  const totalBasePrice = sortedPoints.reduce((sum, el) => sum + el.basePrice, 0);
  const totalOffers = sortedPoints.map((point) => {
    if (point.offer && point.offer.length > 0) {
      return point.offer.reduce((sum, el) => sum + el.price, 0);
    }
    return 0;
  }).reduce((sum, el) => sum + el, 0);

  const total = totalBasePrice + totalOffers;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${firstPoint} ${secondPoint} ${lastPoint}
      </h1>
      <p class="trip-info__dates">${startDay}&nbsp;&mdash;&nbsp;${finishDay}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>
  </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();

    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}
