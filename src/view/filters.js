import {capitalizeFirstLetter} from '../util.js';
import AbstractView from './abstract.js';

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

export default class Filters extends AbstractView {
  constructor (filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }
}
