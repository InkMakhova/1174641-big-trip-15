import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import EmptyListView from '../view/point-list-empty.js';
import PointView from '../view/point.js';
import PointFormView from '../view/add-edit-point.js';
import {
  render,
  replace
} from '../utils/render.js';
import {isEscEvent} from '../utils/common.js';
import {sortList} from '../constants.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new SortView(sortList);
    this._pointListComponent = new PointListView();
    this._emptyListComponent = new EmptyListView();
    this._pointComponent = new PointView();
    this._pointFormComponent = new PointFormView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent);
  }

  _renderPointList() {
    render(this._tripContainer, this._pointListComponent);
  }

  _renderPoint(point) {
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointFormView('edit', point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const pointClickEscHandler = (evt) => {
      if (isEscEvent(evt)) {
        replaceFormToPoint();

        document.removeEventListener('keydown', pointClickEscHandler);
      }
    };

    pointComponent.setRollUpHandler(() => {
      replacePointToForm();

      document.addEventListener('keydown', pointClickEscHandler);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();

      document.removeEventListener('keydown', pointClickEscHandler);
    });

    pointEditComponent.setRollUpHandler(() => {
      replaceFormToPoint();

      document.removeEventListener('keydown', pointClickEscHandler);
    });

    render(this._pointListComponent, pointComponent);
  }

  _renderPoints() {
    this._tripPoints
      .forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderEmptyList() {
    render(this._tripContainer, this._emptyListComponent);
  }

  _renderTrip() {
    this._renderSort();

    if (this._tripPoints.length === 0) {
      this._renderEmptyList();
    }

    this._renderPointList();

    this._renderPoints();
  }
}
