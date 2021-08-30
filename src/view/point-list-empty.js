import AbstractView from './abstract.js';
import {FilterType} from '../constants.js';

// const createEmptyListText = (filterValue) => {
//   if (filterValue) {
//     switch (filterValue) {
//       case 'past':
//         return 'There are no past events now';

//       case 'future':
//         return 'There are no future events now';

//       default:
//         return 'Click New Event to create your first point';
//     }
//   }
//   return 'Click New Event to create your first point';
// };

const emptyListTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createEmptyListPoints = (filterType) => {
  const emptyListTextValue = emptyListTextType[filterType];
  return `<p class="trip-events__msg">
    ${emptyListTextValue}
  </p>`;
};

export default class EmptyList extends AbstractView {
  constructor (data) {
    super();

    this._data = data;
  }

  getTemplate() {
    return createEmptyListPoints(this._data);
  }
}
