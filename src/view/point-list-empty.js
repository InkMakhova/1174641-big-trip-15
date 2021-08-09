import {createElement} from '../util.js';

const createEmptyListText = (filterValue) => {
  if (filterValue) {
    switch (filterValue) {
      case 'past':
        return 'There are no past events now';

      case 'future':
        return 'There are no future events now';

      default:
        return 'Click New Event to create your first point';
    }
  }
  return 'Click New Event to create your first point';
};

const createEmptyListPoints = (filterValue) => (
  `<p class="trip-events__msg">
    ${createEmptyListText(filterValue)}
  </p>`);


export default class EmptyList {
  constructor (filterValue) {
    this._filter = filterValue;
    this._element = null;
  }

  getTemplate() {
    return createEmptyListPoints(this._filter);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
