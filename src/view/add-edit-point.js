import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {
  FormatsDateTime,
  POINT_TYPES,
  DEFAULT_TYPE,
  FormType
} from '../constants.js';
import {capitalizeFirstLetter} from '../utils/common.js';
import {formateDateTime} from '../utils/point.js';
import SmartView from './smart.js';

const createPointTypesTemplate = (currentType, isDisabled) => (
  POINT_TYPES.map((type) => {
    const checkedStatus = currentType === type ? 'checked' : '';

    return `<div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${checkedStatus}
        ${isDisabled ? 'disabled' : ''}>
      <label
        class="event__type-label event__type-label--${type}"
        for="event-type-${type}-1"
        >${capitalizeFirstLetter(type)}</label>
    </div>`;
  }).join(''));

const createDestinationsList = (destinationItems, isDisabled) => (
  destinationItems.map((item) =>
    `<option value="${item.name} ${isDisabled ? 'disabled' : ''}">
    </option>`)
    .join('')
);

const offerListNewTemplate = (offers, isDisabled) => {
  const offerList = offers
    .map((offer) => (
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${offer.title}-1"
          type="checkbox"
          name="event-offer-${offer.title}"
          data-offer-title="${offer.title}"
          data-offer-price="${offer.price}"
          ${isDisabled ? 'disabled' : ''}>
        <label
          class="event__offer-label"
          for="event-offer-${offer.title}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`)).join('');

  return `<section class="event__section event__section--offers">
    <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offerList}
      </div>
  </section>`;
};

const offerListEditTemplate = (offers, offersOptions, isDisabled) => {
  const offerList = offersOptions
    .map((offer) => {
      const checkedOffer = offers ?
        offers.find((item) => (item.title === offer.title && item.price === offer.price)) :
        null;
      const isChecked = !!checkedOffer;

      return `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${offer.title}-1"
        type="checkbox"
        name="event-offer-${offer.title}"
        data-offer-title="${offer.title}"
        data-offer-price="${offer.price}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}>
      <label
        class="event__offer-label"
        for="event-offer-${offer.title}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
    }).join('');

  return `<section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offerList}
        </div>
    </section>`;
};

const createOffersSection = (offers, offersOptions, eventType, isDisabled) => {
  if (eventType === FormType.NEW) {
    if (offersOptions !== null) {
      return offerListNewTemplate(offersOptions, isDisabled);
    }
    return '';
  }

  if (offersOptions && offersOptions.length > 0) {
    return offerListEditTemplate(offers, offersOptions, isDisabled);
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

const createPointFormTemplate = (eventType, data, destinations, offersOptions) => {
  const {
    id,
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offer,
    type,
    isFavorite,
    isDisabled,
    isSaving,
    isDeleting} = data;

  const isNewPoint = (eventType === FormType.NEW);

  const dataType = isNewPoint && !type ? DEFAULT_TYPE : type;
  const capitalizedType = capitalizeFirstLetter(dataType);

  const destinationList = destinations.length > 0 ? createDestinationsList(destinations, isDisabled) : '';

  const destinationTitle = isNewPoint && !data.destination ? '' : destination.name;

  const placeholderText = destinations.length > 0 ? '' : 'There is no destination data';
  const destinationPlaceholder = isNewPoint && destinations.length > 0 ? '' : placeholderText;

  const dataDateFrom =
    isNewPoint && !data.dateFrom ? '' : formateDateTime(dateFrom, FormatsDateTime.DD_MM_YY_TIME);

  const dataDateTo =
    isNewPoint && !data.dateTo ? '' : formateDateTime(dateTo, FormatsDateTime.DD_MM_YY_TIME);

  const dataBasePrice = isNewPoint && !basePrice ? '' : basePrice;

  const newPointOffers = offersOptions.find((option) => option.type === dataType);
  const newPointOffersByType = newPointOffers ? newPointOffers.offers : null;

  const foundOffersOptionsByType = offersOptions.find((option) => option.type === type);
  const offersOptionsByType = foundOffersOptionsByType ? foundOffersOptionsByType.offers : null;

  const offersSection =
    isNewPoint && (!offer || offer.length === 0) ?
      createOffersSection(null, newPointOffersByType, FormType.NEW, isDisabled) :
      createOffersSection(offer, offersOptionsByType, FormType.EDIT, isDisabled);

  const destinationSection =
    isNewPoint && !destination ? '' : createDestinationSection(destination);

  const isFavoriteValue = isNewPoint ? false : isFavorite;

  const idValue = isNewPoint ? nanoid() : id;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-1">
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
              ${createPointTypesTemplate(dataType, isDisabled)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group event__field-group--destination">
        <label class="event__label event__type-output" for="event-destination-1">
          ${capitalizedType}
        </label>
        <input
          class="event__input event__input--destination"
          id="event-destination-1"
          type="text"
          name="event-destination"
          value="${destinationTitle}"
          list="destination-list-1" autocomplete="off"
          placeholder="${destinationPlaceholder}"
          required>
        <datalist id="destination-list-1">
          ${destinationList}
        </datalist>
      </div>

      <div class="event__field-group event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input
          class="event__input event__input--time"
          id="event-start-time-1"
          type="text"
          name="event-start-time"
          value="${dataDateFrom}"
          readonly
          required>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input
          class="event__input event__input--time"
          id="event-end-time-1"
          type="text"
          name="event-end-time"
          value="${dataDateTo}"
          readonly
          required>
      </div>

      <div class="event__field-group event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input
          class="event__input event__input--price"
          id="event-price-1"
          type="number"
          min="0"
          step="1"
          name="event-price"
          value="${dataBasePrice}"
          required>
      </div>

      <button
        class="event__save-btn btn btn--blue"
        type="submit"
        ${isDisabled ? 'disabled' : ''}>
        ${isSaving ? 'saving...' : 'Save'}
      </button>
      <button
        class="event__reset-btn"
        type="reset"
        ${isDisabled ? 'disabled' : ''}>
        ${isDeleting ? 'deleting...' : 'Delete'}
      </button>
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
      id="event-${idValue}"
      type="text"
      name="event-id"
      value="${idValue}">
  </form>
</li>`;
};

export default class PointForm extends SmartView {
  constructor (eventType = FormType.EDIT, point, destinations, offers) {
    super();

    this._eventType = eventType;
    this._destinations = destinations;
    this._offers = offers;
    this._dateFromPicker = null;
    this._dateToPicker = null;
    this._data = PointForm.parsePointToData(point);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offerChooseHandler = this._offerChooseHandler.bind(this);

    this._setInnerHandlers();
    this._setDateFromPicker();
    this._setDateToPicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(point) {
    this.updateData(
      PointForm.parsePointToData(point),
    );
  }

  getTemplate() {
    return createPointFormTemplate(this._eventType, this._data, this._destinations, this._offers);
  }

  _dateFromChangeHandler([userDate]) {
    if (userDate > this._data.dateTo) {
      this._setDateToValidity();
    } else {
      this.updateData({
        dateFrom: userDate,
        get duration() {
          const dateStart = dayjs(this.dateFrom);
          const dateFinish = dayjs(this.dateTo);
          return dateFinish.diff(dateStart);
        },
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
      get duration() {
        const dateStart = dayjs(this.dateFrom);
        const dateFinish = dayjs(this.dateTo);
        return dateFinish.diff(dateStart);
      },
    });
  }

  _priceChangeHandler(evt) {
    this.updateData({
      basePrice: Number(evt.target.value),
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
        //defaultDate: formateDateTime(this._data.dateFrom, FormatsDateTime.DD_MM_YY_TIME),
        onChange: this._dateFromChangeHandler,
        maxDate: formateDateTime(this._data.dateTo, FormatsDateTime.DD_MM_YY_TIME),
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
        //defaultDate: formateDateTime(this._data.dateTo, FormatsDateTime.DD_MM_YY_TIME),
        onChange: this._dateToChangeHandler,
        minDate: formateDateTime(this._data.dateFrom, FormatsDateTime.DD_MM_YY_TIME),
      },
    );
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    this.updateData({
      isFavorite: false,
    });

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
  }

  _offerChooseHandler(evt) {
    let offers = this._data.offer.slice();

    if (evt.target.checked === true) {
      const price = Number(evt.target.dataset.offerPrice);

      offers.push({
        title: evt.target.dataset.offerTitle,
        price: price,
      });

      this.updateData({
        offer: offers,
      });
    } else {
      offers = offers.filter((offer) => offer.title !== evt.target.dataset.offerTitle);

      this.updateData({
        offer: offers,
      });
    }
  }

  _destinationChangeHandler(evt) {
    let description;
    let pictures;

    if (!this._destinations) {
      this.updateData({
        destination: [],
      });
    } else {
      Object.keys(this._destinations).map((key) => {
        if (this._destinations[key].name === evt.target.value) {
          description = this._destinations[key].description;
          pictures = this._destinations[key].pictures;
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
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDateFromPicker();
    this._setDateToPicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._typeChangeHandler);

    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationChangeHandler);

    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('change', this._priceChangeHandler);

    if (this.getElement().querySelector('.event__section--offers')) {
      this.getElement().querySelectorAll('.event__offer-checkbox')
        .forEach((checkbox) => checkbox.addEventListener('change', this._offerChooseHandler));
    }

  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointForm.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelector('.event__reset-btn')
      .addEventListener('click', this._formDeleteClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
