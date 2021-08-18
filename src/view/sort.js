import {disabledSortFields} from '../constants.js';
import {capitalizeFirstLetter} from '../utils/common.js';
import AbstractView from './abstract.js';

const createSortItemTemplate = (sort, isChecked) => {
  const checkedValue = isChecked === true ? 'checked' : '';
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
    .map((el) => createSortItemTemplate(el, sortItems[el])).join('');

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsElement}
    </form>`;
};
export default class Sort extends AbstractView {
  constructor (sort) {
    super();

    this._sort = sort;
    this._sortChangeHandler = this._sortChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._sort);
  }

  _sortChangeHandler(evt) {
    this._callback.sortChange(evt);
  }

  setSortChangeHandler(callback) {
    this._callback.sortChange = callback;
    this.getElement().addEventListener('change', this._sortChangeHandler);
  }
}
