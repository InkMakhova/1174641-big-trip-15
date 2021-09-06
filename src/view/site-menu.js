import AbstractView from './abstract.js';
import {MenuItem} from '../constants.js';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#">${MenuItem.STATISTICS}</a>
  </nav>`);

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this.setMenuItem(evt.target.innerText);
    this._callback.menuClick(evt.target.innerText);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const siteMenuItems = Array.from(this.getElement().querySelectorAll('a'));

    const itemActive = siteMenuItems.find((el) => el.innerText === menuItem);
    const item = siteMenuItems.find((el) => el.innerText !== menuItem);

    if (itemActive !== null) {
      itemActive.classList.add('trip-tabs__btn--active');
    }

    if (item !== null) {
      item.classList.remove('trip-tabs__btn--active');
    }
  }
}
