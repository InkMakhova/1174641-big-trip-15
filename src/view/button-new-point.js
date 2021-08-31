import AbstractView from './abstract.js';

const createNewPointButtonTemplate = () => (
  `<button
      class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button">
        New event
  </button>`);

export default class NewPointButton extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);

    this._setClickHandler();
  }

  getTemplate() {
    return createNewPointButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this.getElement().disabled = true;
  }

  _setClickHandler() {
    this.getElement().addEventListener('click', this._clickHandler);
  }

  activateButton() {
    this.getElement().disabled = false;
    this._setClickHandler();
  }
}
