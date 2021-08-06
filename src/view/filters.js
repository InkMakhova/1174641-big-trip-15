import {
  capitalizeFirstLetter,
  createElement
} from '../util.js';

const createFilterItemTemplate = (filter, isChecked) => (
  `<div class="trip-filters__filter">
    <input
        id="filter-${filter}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filter}"
        ${isChecked === true ? 'checked' : ''}>
    <label
      class="trip-filters__filter-label"
      for="filter-${filter}">${capitalizeFirstLetter(filter)}</label>
  </div>`);

const createFiltersTemplate = (filterItems) => {
  const filterItemsElement = Object.keys(filterItems)
    .map((el) => createFilterItemTemplate(el, filterItems[el])).join('');

  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsElement}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class Filters {
  constructor (filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
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
