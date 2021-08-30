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
//import {updateItem} from '../utils/common.js';
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

    //this._sortComponent = new SortView(SortType);
    this._sortComponent = null;
    this._emptyListComponent = null;

    this._pointListComponent = new PointListView();
    //this._emptyListComponent = new EmptyListView();

    //this._handlePointChange = this._handlePointChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._pointListComponent, this._handleViewAction, this._destinations);
  }

  // init(tripPoints) {
  //   this._tripPoints = tripPoints.slice();
  //   this._sourcedTripPoints = tripPoints.slice();
  init() {
    this._renderTrip();
  }

  createPoint() {
    this._currentSortType = defaultSortType;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    //return this._pointsModel.getPoints();

    //const filterType = this._filterModel.getFilter();
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    // const filtredPoints = filter[filterType](points);
    const filtredPoints = filter[this._filterType](points);

  //добвлено из _sortPoints(sortType)
    switch (this._currentSortType) {
      case SortType.TIME:
        //this._tripPoints.sort(sortPointsTime);
        //this._pointsModel.getPoints().slice().sort(sortPointsTime);
        filtredPoints.sort(sortPointsTime);
        break;
      case SortType.PRICE:
        //this._tripPoints.sort(sortPointsPrice);
        //this._pointsModel.getPoints().slice().sort(sortPointsPrice);
        filtredPoints.sort(sortPointsPrice);
        break;
      default:
        //this._tripPoints.sort(sortPointsDay);
        this._pointsModel.getPoints().slice().sort(sortPointsDay);
        filtredPoints.sort(sortPointsDay);
    }
    return filtredPoints;
  }

  // _sortPoints(sortType) {
  //   this._currentSortType = sortType;

  //   switch (this._currentSortType) {
  //     case SortType.TIME:
  //       this._tripPoints.sort(sortPointsTime);
  //       break;
  //     case SortType.PRICE:
  //       this._tripPoints.sort(sortPointsPrice);
  //       break;
  //     default:
  //       this._tripPoints.sort(sortPointsDay);
  //   }
  // }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    //this._sortPoints(sortType);
    //this._clearPointList();
    //this._renderPointList();
    //this._renderPoints();

    this._clearTrip();
    this._renderTrip();
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  // _handlePointChange(updatedPoint) {
  //   // this._tripPoints = updateItem(this._tripPoints, updatedPoint);
  //   // this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
  //   this._pointPresenters.get(updatedPoint.id).init(updatedPoint, this._destinations);
  // }

  _handleViewAction(actionType, updateType, update) {
    //console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
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
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        //this._pointPresenters.get(data.id).init(data);
        this._pointPresenters.get(data.id).init(data, this._destinations);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _renderSort() {
    //render(this._tripContainer, this._sortComponent);
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
    //const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point, this._destinations);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  // _renderPoints() {
  //   this._tripPoints
  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderEmptyList() {
    this._emptyListComponent = new EmptyListView(this._filterType);
    render(this._tripComponent, this._emptyListComponent);
  }

  // _clearPointList() {
  //   this._pointPresenters.forEach((presenter) => presenter.destroy());
  //   this._pointPresenters.clear();
  // }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();

    remove(this._sortComponent);
    //remove(this._emptyListComponent);

    if (this._emptyListComponent) {
      remove(this._emptyListComponent);
    }

    if (resetSortType) {
      this._currentSortType = defaultSortType;
    }
  }

  _renderTrip() {
    this._renderSort();

    //if (this._tripPoints.length === 0) {
    if (this._getPoints().length === 0) {
      this._renderEmptyList();
      return;
    }

    this._renderPointList();

    this._renderPoints(this._pointsModel.getPoints());
  }
}
