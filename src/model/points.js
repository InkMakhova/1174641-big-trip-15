import AbstractObserver from '../utils/abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      //вот тут дальше засада
      {
        dateFrom: point.dateFrom !== null ? new Date(point.dateFrom) : point.dateFrom,
        dateTo: point.dateTo !== null ? new Date(point.dateTo) : point.dateTo, // На клиенте дата хранится как экземпляр Date
        isFavorite: point['is_favorite'],
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  static adaptToServer(task) {
    const adaptedTask = Object.assign(
      {},
      task,
      {
        'due_date': task.dueDate instanceof Date ? task.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
        'is_archived': task.isArchive,
        'is_favorite': task.isFavorite,
        'repeating_days': task.repeating,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedTask.dueDate;
    delete adaptedTask.isArchive;
    delete adaptedTask.isFavorite;
    delete adaptedTask.repeating;

    return adaptedTask;
  }
}
