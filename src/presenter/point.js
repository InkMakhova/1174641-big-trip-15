import {
  UserAction,
  UpdateType,
  FormType
} from '../constants.js';
import {
  isOnline,
  isEscEvent
} from '../utils/common.js';
import {
  render,
  replace,
  remove
} from '../utils/render.js';
import {
  isDatesEqual,
  isEqual
} from '../utils/point.js';
import {toast} from '../utils/toast.js';
import PointView from '../view/point.js';
import PointFormView from '../view/add-edit-point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point, destinations, offers) {
    this._point = point;
    this._destinations = destinations;
    this._offers = offers;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointFormView(FormType.EDIT, point, this._destinations, this._offers);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setFormCloseHandler(this._handleFormClose);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointListContainer, this._pointComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointComponent, prevPointEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._pointComponent.shake(resetFormState);
        this._pointEditComponent.shake(resetFormState);
        break;
    }
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    if (!isOnline()) {
      toast('You can\'t edit point offline');
      return;
    }

    this._replacePointToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(update) {
    if (!isOnline()) {
      toast('You can\'t save point offline');
      return;
    }

    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    const isMinorUpdate =
      !isDatesEqual(this._point.dateFrom, update.dateFrom) ||
      !isDatesEqual(this._point.dateTo, update.dateTo) ||
      !isEqual(this._point.basePrice, update.basePrice) ||
      !isEqual(this._point.destination.name, update.destination.name) ||
      !isEqual(this._point.offer, update.offer);

    this._changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  }

  _handleDeleteClick(point) {
    if (!isOnline()) {
      toast('You can\'t delete point offline');
      return;
    }

    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleFormClose() {
    this._pointEditComponent.reset(this._point);
    this._replaceFormToPoint();
  }
}

