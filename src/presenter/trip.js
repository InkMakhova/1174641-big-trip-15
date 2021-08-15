import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import EmptyListView from '../view/point-list-empty.js';
import PointView from '../view/point.js';
import PointFormView from '../view/add-edit-point.js';
import PointPresenter from '../presenter/point.js';
import {
  render,
//  replace
} from '../utils/render.js';
//import {isEscEvent} from '../utils/common.js';
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
    const pointPresenter = new PointPresenter(this._pointListComponent);
    pointPresenter.init(point);
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
