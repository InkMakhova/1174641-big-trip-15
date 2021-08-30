import {SortType} from '../constants.js';
import {render} from '../utils/render.js';
//import {updateItem} from '../utils/common.js';
import {
  sortPointsTime,
  sortPointsPrice,
  sortPointsDay
} from '../utils/point.js';
import SortView from '../view/sort.js';
import PointListView from '../view/point-list.js';
import EmptyListView from '../view/point-list-empty.js';
import PointPresenter from '../presenter/point.js';

export default class Trip {
  constructor(tripContainer, destinations, pointsModel) {
    this._pointsModel = pointsModel;
    this._destinations = destinations;
    this._tripContainer = tripContainer;
    this._pointPresenters = new Map();

    this._sortComponent = new SortView(SortType);
    this._pointListComponent = new PointListView();
    this._emptyListComponent = new EmptyListView();

    //this._handlePointChange = this._handlePointChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  // init(tripPoints) {
  //   this._tripPoints = tripPoints.slice();
  //   this._sourcedTripPoints = tripPoints.slice();
  init() {

    this._renderTrip();
  }

  _getPoints() {
    //return this._pointsModel.getPoints();

  //добвлено из _sortPoints(sortType)
    switch (this._currentSortType) {
      case SortType.TIME:
        //this._tripPoints.sort(sortPointsTime);
        this._pointsModel.getTasks().slice().sort(sortPointsTime);
        break;
      case SortType.PRICE:
        //this._tripPoints.sort(sortPointsPrice);
        this._pointsModel.getTasks().slice().sort(sortPointsPrice);
        break;
      default:
        //this._tripPoints.sort(sortPointsDay);
        this._pointsModel.getTasks().slice().sort(sortPointsDay);
    }
    return this._pointsModel.getPoints();
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
    this._clearPointList();
    this._renderPointList();
    this._renderPoints();
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  // _handlePointChange(updatedPoint) {
  //   // this._tripPoints = updateItem(this._tripPoints, updatedPoint);
  //   // this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
  //   this._pointPresenters.get(updatedPoint.id).init(updatedPoint, this._destinations);
  // }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPointList() {
    render(this._tripContainer, this._pointListComponent);
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
    points.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderEmptyList() {
    render(this._tripContainer, this._emptyListComponent);
  }

  _clearPointList() {
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();
  }

  _renderTrip() {
    this._renderSort();

    //if (this._tripPoints.length === 0) {
    if (this._getPoints().length === 0) {
      this._renderEmptyList();
    }

    this._renderPointList();

    this._renderPoints();
  }
}
