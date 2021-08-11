import {destinations} from '../constants.js';
import {getRandomInteger} from '../utils/common.js';
import AbstractView from './abstract.js';

const getTripInfo = () => (
  {
    firstPoint: destinations[getRandomInteger(0, destinations.length - 1)],
    secondPoint: destinations[getRandomInteger(0, destinations.length - 1)],
    lastPoint: destinations[getRandomInteger(0, destinations.length - 1)],
  }
);

const createTripInfoTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${getTripInfo().firstPoint} &mdash; ${getTripInfo().secondPoint} &mdash; ${getTripInfo().lastPoint}
      </h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
  </section>`);

export default class TripInfo extends AbstractView {
  getTemplate() {
    return createTripInfoTemplate(this._element);
  }
}
