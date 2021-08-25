import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {
  FormatsDateTime,
  offersNames,
  pointTypes,
  defaultType,
  offerOptions,
  OffersSetByTypes
} from '../constants.js';
import {
  getRandomInteger,
  capitalizeFirstLetter,
  getKeyByValue
} from '../utils/common.js';
import {formateDateTime} from '../utils/point.js';
import {
  createElement,
  render,
  RenderPosition
} from '../utils/render.js';
import SmartView from './smart.js';

let destinations;

export const saveDestinations = (callback) => (
  (data) => {
    destinations = data;
    callback();
  }
);

const createPointTypesTemplate = (currentType) => (
  pointTypes.map((type) => {
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

const createDestinationsList = (destinationItems) => (
  destinationItems.map((item) => `<option value="${item.name}"></option>`)
    .join('')
);

const offerListNewTemplate = (offers) => {
  const offerList = offers
    .map((offer) => {
      const offerName = getKeyByValue(offersNames, offer.title);

      return `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${offerName}-1"
          type="checkbox"
          name="event-offer-${offerName}"
          data-offer-title="${offer.title}"
          data-offer-price="${offer.price}">
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

const getOffersTemplate = (type) => (
  createElement(offerListNewTemplate(OffersSetByTypes[type])));

const offerListEditTemplate = (offers) => {
  const offerList = offers
    .map((offer) => {
      const offerName = getKeyByValue(offersNames, offer.title);

      return `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${offerName}-1"
          type="checkbox"
          name="event-offer-${offerName}"
          data-offer-title="${offer.title}"
          data-offer-price="${offer.price}"
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

  if (offers && offers.length > 0) {
    return offerListEditTemplate(offers);
  }

  return '';
};

const createPhotoTemplate = (destination) => {
  const isOffers = destination.pictures && destination.pictures.length > 0;

  if (isOffers) {
    const pictureList = destination.pictures
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

const createDestinationSection = (destination) => (
  `<section class="event__section event__section--destination">
    <h3 class="event__section-title event__section-title--destination">Destination</h3>
    <p class="event__destination-description">
      ${destination.description}
    </p>
    ${createPhotoTemplate(destination)}
</section>`);

const createPointFormTemplate = (eventType, data) => {
  const {id, basePrice, dateFrom, dateTo, duration, destination, offer, type, isFavorite} = data;

  const isNewPoint = (eventType === 'new');

  const dataType = isNewPoint ? defaultType : type;

  const capitalizedType = isNewPoint ? capitalizeFirstLetter(defaultType) : capitalizeFirstLetter(type);

  const destinationName = isNewPoint ? '' : destination.name;

  const dataDateFrom = isNewPoint ? '' : formateDateTime(dateFrom, FormatsDateTime.DD_MM_YY_TIME);
  const dataDateTo = isNewPoint ? '' : formateDateTime(dateTo, FormatsDateTime.DD_MM_YY_TIME);

  const dataBasePrice = isNewPoint ? '' : basePrice;

  const offersSection = isNewPoint ? createOffersSection(offerOptions.slice(getRandomInteger(1, offerOptions.length - 1)), 'new') : createOffersSection(offer, 'edit');

  const destinationSection = isNewPoint ? '' : createDestinationSection(destination);

  const isFavoriteValue = isNewPoint ? false : isFavorite;

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
            src="img/icons/${dataType}.png"
            alt="Event type icon">
        </label>
        <input
          class="event__type-toggle visually-hidden"
          id="event-type-toggle-1"
          type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${createPointTypesTemplate(dataType)}
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
          ${createDestinationsList(destinations)}
        </datalist>
      </div>

      <div class="event__field-group event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input
          class="event__input event__input--time"
          id="event-start-time-1"
          type="text"
          name="event-start-time"
          value="${dataDateFrom}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input
          class="event__input event__input--time"
          id="event-end-time-1"
          type="text"
          name="event-end-time"
          value="${dataDateTo}">
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
          value="${dataBasePrice}">
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
    <input class="event__id visually-hidden"
      id="event-${id}"
      type="text"
      name="event-${id}"
      value="${id}">
  </form>
</li>`;
};

export default class PointForm extends SmartView {
  constructor (eventType = 'edit', point) {
    super();

    this._eventType = eventType;
    this._dateFromPicker = null;
    this._dateToPicker = null;
    this._data = PointForm.parsePointToData(point);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._renderOffers = this._renderOffers.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDateFromPicker();
    this._setDateToPicker();
  }

  reset(point) {
    this.updateData(
      PointForm.parsePointToData(point),
    );
  }

  getTemplate() {
    return createPointFormTemplate(this._eventType, this._data);
  }

  _dateFromChangeHandler([userDate]) {
    if (userDate > this._data.dateTo) {
      this._setDateToValidity();
    } else {
      this.updateData({
        dateFrom: userDate,
      });
    }
  }

  _setDateToValidity() {
    this.getElement()
      .querySelector('#event-end-time-1')
      .setCustomValidity('Дата начала не может быть больше даты окончания путешествия');
    this.getElement()
      .querySelector('#event-end-time-1')
      .reportValidity();
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  _setDateFromPicker() {
    if (this._dateFromPicker) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._dateFromPicker.destroy();
      this._dateFromPicker = null;
    }

    this._dateFromPicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: formateDateTime(this._data.dateFrom, FormatsDateTime.DD_MM_YY_TIME),
        onChange: this._dateFromChangeHandler,
      },
    );
  }

  _setDateToPicker() {
    if (this._dateToPicker) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._dateToPicker.destroy();
      this._dateToPicker = null;
    }

    this._dateToPicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: formateDateTime(this._data.dateTo, FormatsDateTime.DD_MM_YY_TIME),
        onChange: this._dateToChangeHandler,
        minDate: formateDateTime(this._data.dateFrom, FormatsDateTime.DD_MM_YY_TIME),
      },
    );
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    if (this.getElement().querySelector('.event__section--offers')) {
      const offersElements = this.getElement()
        .querySelector('.event__section--offers')
        .querySelectorAll('input:checked');

      const offers = new Array(offersElements.length)
        .fill(null)
        .map((_element, index) => {
          const title = offersElements[index].dataset.offerTitle;
          const price = offersElements[index].dataset.offerPrice;

          return {
            title: title,
            price: price,
          };
        });

      this.updateData({
        offer: offers,
      });
    }

    this._callback.formSubmit(PointForm.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement()
      .querySelector('form')
      .addEventListener('submit', this._formSubmitHandler);
  }

  _formCloseHandler(evt) {
    evt.preventDefault();
    this._callback.formClose();
  }

  setFormCloseHandler(callback) {
    this._callback.formClose = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._formCloseHandler);
  }

  _typeChangeHandler(evt) {
    this.updateData({
      type: evt.target.value,
      offer: [],
    });
    this._renderOffers(evt.target.value);
  }

  _renderOffers(type) {
    const pointEventsElement = this.getElement()
      .querySelector('.event__details');

    const newOffersList = getOffersTemplate(type);

    render(pointEventsElement, newOffersList, RenderPosition.AFTERBEGIN);
  }

  _offerChooseHandler(evt) {
    this.updateData({
      offer: [evt.target.value],
    });
  }

  _destinationChangeHandler(evt) {
    let description;
    let pictures;

    Object.keys(destinations).map((key) => {
      if (destinations[key].name === evt.target.value) {
        description = destinations[key].description;
        pictures = destinations[key].pictures;
      }
    });

    this.updateData({
      destination: {
        name: evt.target.value,
        description: description,
        pictures: pictures,
      },
    });
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDateFromPicker();
    this._setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._typeChangeHandler);

    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationChangeHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    return data;
  }
}
