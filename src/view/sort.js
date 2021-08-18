import {
  defaultSortType,
  disabledSortFields
} from '../constants.js';
import {capitalizeFirstLetter} from '../utils/common.js';
import AbstractView from './abstract.js';

const createSortItemTemplate = (sort) => {
  const checkedValue = defaultSortType === sort ? 'checked' : '';
  const disabledValue = disabledSortFields.includes(sort) ? 'disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sort}">
      <input
        id="sort-${sort}"
        class="trip-sort__input visually-hidden"
        data-sort-type = "${sort}"
        type="radio"
        name="trip-sort"
        value="sort-${sort}"
        ${checkedValue}
        ${disabledValue}>
      <label
        class="trip-sort__btn"
        for="sort-${sort}">${capitalizeFirstLetter(sort)}
      </label>
    </div>`;
};

const createSortTemplate = (sortItems) => {
  const sortItemsElement = Object.keys(sortItems)
    .map((key) => createSortItemTemplate(sortItems[key])).join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsElement}
    </form>`;
};
export default class Sort extends AbstractView {
  constructor (sort) {
    super();

    this._sort = sort;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._sort);
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('change', this._sortTypeChangeHandler);
  }
}
