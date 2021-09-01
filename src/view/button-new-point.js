import AbstractView from './abstract.js';

const createNewPointButtonTemplate = () => (
  `<button
      class="trip-main__event-add-btn btn btn--big  btn--yellow"
      type="button">
        New event
  </button>`);

export default class NewPointButton extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
    this._restoreClickHandler = this._restoreClickHandler.bind(this);
  }

  getTemplate() {
    return createNewPointButtonTemplate(this._element);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.buttonClick();

    this.getElement().disabled = true;

    this.getElement().removeEventListener('click', this._clickHandler);
  }

  setClickHandler(callback) {
    this._callback.buttonClick = callback;

    this._restoreClickHandler();
  }

  activateButton() {
    this.getElement().disabled = false;

    this._restoreClickHandler();
  }

  _restoreClickHandler() {
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
