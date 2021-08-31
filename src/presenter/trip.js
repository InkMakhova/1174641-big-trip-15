import {
  SortType,
  defaultSortType,
  FilterType,
  UpdateType,
  UserAction
} from '../constants.js';
import {
  render,
  remove
} from '../utils/render.js';
import {
  sortPointsTime,
  sortPointsPrice,
  sortPointsDay
} from '../utils/point.js';
import {filter} from '../utils/filter.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import EmptyListView from '../view/point-list-empty.js';
import PointPresenter from '../presenter/point.js';
import PointNewPresenter from './point-new.js';

export default class Trip {
  constructor(tripContainer, destinations, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._destinations = destinations;
    this._tripComponent = tripContainer;
    this._pointPresenters = new Map();

    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = defaultSortType;

    this._sortComponent = null;
    this._emptyListComponent = null;

    this._pointListComponent = new PointListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._pointListComponent, this._handleViewAction, this._destinations);
  }

  init() {
    this._renderTrip();
  }

  createPoint() {
    this._currentSortType = defaultSortType;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();

    const points = this._pointsModel.getPoints();

    const filtredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        filtredPoints.sort(sortPointsTime);
        break;
      case SortType.PRICE:
        filtredPoints.sort(sortPointsPrice);
        break;
      default:
        this._pointsModel.getPoints().slice().sort(sortPointsDay);
        filtredPoints.sort(sortPointsDay);
    }
    return filtredPoints;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearTrip();
    this._renderTrip();
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenters.get(data.id).init(data, this._destinations);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(SortType, this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripComponent, this._sortComponent);
  }

  _renderPointList() {
    render(this._tripComponent, this._pointListComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point, this._destinations);

    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderEmptyList() {
    this._emptyListComponent = new EmptyListView(this._filterType);
    render(this._tripComponent, this._emptyListComponent);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();

    remove(this._sortComponent);

    if (this._emptyListComponent) {
      remove(this._emptyListComponent);
    }

    if (resetSortType) {
      this._currentSortType = defaultSortType;
    }
  }

  _renderTrip() {
    this._renderSort();

    const points = this._getPoints();

    if (points.length === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderPointList();

    this._renderPoints(points);
  }
}
