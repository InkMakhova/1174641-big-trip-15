import AbstractObserver from '../utils/abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  setTasks(points) {
    this._points = points.slice();
  }

  getTasks() {
    return this._points;
  }
}
