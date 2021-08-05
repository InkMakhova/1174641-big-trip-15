import dayjs from 'dayjs';
import {
  formateDateTime,
  humanizedTimeDuration,
  capitalizeFirstLetter
} from '../util.js';
import {formatsDateTime} from '../constants.js';

const createOffersList = (dataOffers) => {
  if (dataOffers && dataOffers.length > 0) {
    const offerList = dataOffers
      .map((offer) => `<li class="event__offer">
          <span class="event__offer-title">
            ${offer.title}
          </span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">
            ${offer.price}
          </span>
        </li>`).join('');

    return `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offerList}
      </ul>`;
  }
  return '';
};

const createTimeDurationElement = (duration) => {
  let days = '';
  let hours = '';
  let minutes = '';

  if (humanizedTimeDuration(duration).days !== 0) {
    days = `0${humanizedTimeDuration(duration).days}D `.slice(-4);
    hours = '00H ';
  }

  if (humanizedTimeDuration(duration).hours !== 0) {
    hours = `0${humanizedTimeDuration(duration).hours}H `.slice(-4);
  }

  minutes = `0${humanizedTimeDuration(duration).minutes}M`.slice(-3);

  return `${days}${hours}${minutes}`;
};

export const createPointTemplate = (dataPoint) => {
  const dateFrom = dayjs(dataPoint.dateFrom);
  const dateTo = dayjs(dataPoint.dateTo);
  const diffTime = {
    diffDays: dateTo.diff(dateFrom, 'day'),
    diffHours: dateTo.diff(dateFrom, 'hour'),
    diffMinutes: dateTo.diff(dateFrom, 'minute'),
  };

  return `<li class="trip-events__item">
    <div class="event">
      <time
        class="event__date"
        datetime=${formateDateTime(dataPoint.dateFrom, formatsDateTime.yearMonthDay)}>
          ${formateDateTime(dataPoint.dateFrom, formatsDateTime.monthDay)}
      </time>
      <div class="event__type">
        <img
          class="event__type-icon"
          width="42"
          height="42"
          src="img/icons/${dataPoint.type}.png"
          alt="Event type icon">
      </div>
      <h3 class="event__title">
        ${capitalizeFirstLetter(dataPoint.type)} ${dataPoint.destination.name}
      </h3>
      <div class="event__schedule">
        <p class="event__time">
          <time
            class="event__start-time"
            datetime=${formateDateTime(dataPoint.dateFrom, formatsDateTime.dateTimeMachine)}}>
              ${formateDateTime(dataPoint.dateFrom, formatsDateTime.time)}
          </time>
          &mdash;
          <time
            class="event__end-time"
            datetime=${formateDateTime(dataPoint.dateTo, formatsDateTime.dateTimeMachine)}>
              ${formateDateTime(dataPoint.dateTo, formatsDateTime.time)}
          </time>
        </p>
        <p class="event__duration">
          ${createTimeDurationElement(diffTime)}
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;
        <span class="event__price-value">
          ${dataPoint.basePrice}
        </span>
      </p>
      ${createOffersList(dataPoint.offer)}
      <button
        class="event__favorite-btn${dataPoint.isFavorite === true ? ' event__favorite-btn--active' : ''}"
        type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145
          8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
