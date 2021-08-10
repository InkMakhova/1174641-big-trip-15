import AbstractView from './abstract.js';

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


export default class EmptyList extends AbstractView {
  constructor (filterValue) {
    super();

    this._filter = filterValue;
  }

  getTemplate() {
    return createEmptyListPoints(this._filter);
  }
}
