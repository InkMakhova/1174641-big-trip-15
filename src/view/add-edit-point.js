import {
  getRandomInteger,
  capitalizeFirstLetter,
  formateDateTime,
  getKeyByValue
} from '../util.js';
import {
  FormatsDateTime,
  OfferNames,
  DESTINATIONS,
  POINT_TYPES,
  TYPE_DEFAULT,
  OFFERS
} from '../constants.js';
import AbstractView from './abstract.js';

const createPointTypesTemplate = (currentType) => (
  POINT_TYPES.map((type) => {
    const checkedStatus = currentType === type ? 'checked' : '';

    return `<div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${checkedStatus}>
      <label
        class="event__type-label  event__type-label--${type}"
        for="event-type-${type}-1"
        >${capitalizeFirstLetter(type)}</label>
    </div>`;
  }).join(''));

const createDestinationsList = () => (
  DESTINATIONS.map((destination) => `<option value="${destination}"></option>`)
    .join('')
);

const offerListNewTemplate = (offers) => {
  const offerList = offers
    .map((offer) => {
      const offerName = getKeyByValue(OfferNames, offer.title);

      return `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${offerName}-1"
          type="checkbox"
          name="event-offer-${offerName}">
        <label
          class="event__offer-label"
          for="event-offer-${offerName}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;}).join('');

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offerList}
      </div>
  </section>`;
};

const offerListEditTemplate = (offers) => {
  const offerList = offers.offer
    .map((offer) => {
      const offerName = getKeyByValue(OfferNames, offer.title);

      return `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${offerName}-1"
          type="checkbox"
          name="event-offer-${offerName}"
          checked>
        <label
          class="event__offer-label"
          for="event-offer-${offerName}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
    }).join('');

  return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offerList}
        </div>
    </section>`;
};

const createOffersSection = (offers, eventType) => {
  if (eventType === 'new') {
    return offerListNewTemplate(offers);
  }

  if (offers.offer && offers.offer.length > 0) {
    return offerListEditTemplate(offers);
  }

  return '';
};

const createPhotoTemplate = (point) => {
  const isOffers = point.destination.pictures && point.destination.pictures.length > 0;

  if (isOffers) {
    const pictureList = point.destination.pictures
      .map((picture) => `<img
        class="event__photo"
        src="${picture.src}"
        alt="${picture.description}">`)
      .join('');

    return `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictureList}
        </div>
      </div>`;
  }
  return '';
};

const createDestinationSection = (point) => (
  `<section class="event__section event__section--destination">
    <h3 class="event__section-title event__section-title--destination">Destination</h3>
    <p class="event__destination-description">
      ${point.destination.description}
    </p>
    ${createPhotoTemplate(point)}
</section>`);

const createPointFormTemplate = (eventType, point) => {
  const isNewPoint = (eventType === 'new');

  const type = isNewPoint ? TYPE_DEFAULT : point.type;

  const capitalizedType = isNewPoint ? capitalizeFirstLetter(TYPE_DEFAULT) : capitalizeFirstLetter(point.type);

  const destinationName = isNewPoint ? '' : point.destination.name;

  const dateFrom = isNewPoint ? '' : formateDateTime(point.dateFrom, FormatsDateTime.dateTimeHumanize);
  const dateTo = isNewPoint ? '' : formateDateTime(point.dateTo, FormatsDateTime.dateTimeHumanize);

  const basePrice = isNewPoint ? '' : point.basePrice;

  const offersSection = isNewPoint ? createOffersSection(OFFERS.slice(getRandomInteger(1, OFFERS.length - 1)), 'new') : createOffersSection(point, 'edit');

  const destinationSection = isNewPoint ? '' : createDestinationSection(point);

  const isFavoriteValue = isNewPoint ? false : point.isFavorite;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img
            class="event__type-icon"
            width="17"
            height="17"
            src="img/icons/${type}.png"
            alt="Event type icon">
        </label>
        <input
          class="event__type-toggle visually-hidden"
          id="event-type-toggle-1"
          type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${createPointTypesTemplate(type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${capitalizedType}
        </label>
        <input
          class="event__input event__input--destination"
          id="event-destination-1"
          type="text"
          name="event-destination"
          value="${destinationName}"
          list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationsList()}
        </datalist>
      </div>

      <div class="event__field-group event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input
          class="event__input event__input--time"
          id="event-start-time-1"
          type="text"
          name="event-start-time"
          value="${dateFrom}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input
          class="event__input event__input--time"
          id="event-end-time-1"
          type="text"
          name="event-end-time"
          value="${dateTo}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input
          class="event__input event__input--price"
          id="event-price-1"
          type="text"
          name="event-price"
          value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${offersSection}
      ${destinationSection}
    </section>
    <input class="event__input event__input--favorite visually-hidden"
      id="event-favorite"
      type="text"
      name="event-favorite"
      value="${isFavoriteValue}">
  </form>
</li>`;
};

export default class PointForm extends AbstractView {
  constructor (eventType, point) {
    super();

    this._eventType = eventType;
    this._point = point;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._rollUpClickHandler = this._rollUpClickHandler.bind(this);
  }

  getTemplate() {
    return createPointFormTemplate(this._eventType, this._point);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _rollUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollUpClick();
  }

  setRollUpHandler(callback) {
    this._callback.rollUpClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollUpClickHandler);
  }
}
