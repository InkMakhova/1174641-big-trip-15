import {
  UserAction,
  UpdateType,
  FormType
} from '../constants.js';
import {
  remove,
  render,
  RenderPosition
} from '../utils/render.js';
import {isEscEvent} from '../utils/common.js';
import AddEditPointView from '../view/add-edit-point.js';
import PointNewModel from '../model/point-new.js';

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._destinations = [];

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._data = new PointNewModel().initData();

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback, destinations, offers) {
    this._destroyCallback = callback;
    this._destinations = destinations;
    this._offers = offers;

    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new AddEditPointView(FormType.NEW, this._data, this._destinations, this._offers);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointEditComponent.setFormCloseHandler(this._handleFormClose);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    document.removeEventListener('keydown', this._escKeyDownHandler);

    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleFormClose() {
    this.destroy();
  }
}
