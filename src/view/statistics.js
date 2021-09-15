import Chart from 'chart.js';
import {Units} from '../constants.js';
import {createChartTemplate} from '../utils/chart.js';
import {
  countPointsByType,
  countCostsByType,
  countDurationByType,
  makeItemsUniq
} from '../utils/statistics.js';
import {formatDurationElement} from '../utils/common.js';
import SmartView from './smart.js';

const BAR_HEIGHT = 55;

const renderMoneyChart = (moneyCtx, points) => {

  const pointTypes = points.map((point) => point.type);

  const uniqTypes = makeItemsUniq(pointTypes);

  const pointsByTypeCounts = uniqTypes.map((type) => {
    const costsByType = countCostsByType(points, type);

    return {
      'type': type,
      'costs': costsByType,
    };
  });

  const sortedPointsByCosts = pointsByTypeCounts.slice().sort((a, b) => b.costs-a.costs);

  const labels = sortedPointsByCosts.map((point) => point.type.toUpperCase());
  const costs = sortedPointsByCosts.map((point) => point.costs);

  return new Chart(moneyCtx, createChartTemplate(labels, costs, Units.MONEY));
};

const renderTypeChart = (typeCtx, points) => {
  const pointTypes = points.map((point) => point.type);

  const uniqTypes = makeItemsUniq(pointTypes);

  const pointsByTypeCounts = uniqTypes.map((type) => {
    const number = countPointsByType(points, type);

    return {
      'type': type,
      'numberOfTimes': number,
    };
  });

  const sortedPointsByNumber = pointsByTypeCounts.slice().sort((a, b) => b.numberOfTimes-a.numberOfTimes);

  const labels = sortedPointsByNumber.map((point) => point.type.toUpperCase());
  const numberOfTimes = sortedPointsByNumber.map((point) => point.numberOfTimes);

  return new Chart(typeCtx, createChartTemplate(labels, numberOfTimes, Units.TYPE));
};

const renderTimeChart = (timeCtx, points) => {
  const pointTypes = points.map((point) => point.type);

  const uniqTypes = makeItemsUniq(pointTypes);

  const pointsByTypeCounts = uniqTypes.map((type) => {
    const duration = countDurationByType(points, type);

    return {
      'type': type,
      'duration': duration,
    };
  });

  const sortedPointsByDuration = pointsByTypeCounts.slice().sort((a, b) => b.duration-a.duration);

  const labels = sortedPointsByDuration.map((point) => point.type.toUpperCase());
  const timeSpend = sortedPointsByDuration.map((point) => point.duration);

  const formatDuration = (duration) => {
    const minutes = parseInt((duration / (1000 * 60)), 10);
    const hours = parseInt((duration / (1000 * 60 * 60)), 10);
    const days = parseInt((duration / (1000 * 60 * 60 * 24)), 10);

    const diffTime = {
      diffDays: days,
      diffHours: hours,
      diffMinutes: minutes,
    };

    return formatDurationElement(diffTime);
  };

  return new Chart(timeCtx,  createChartTemplate(labels, timeSpend, Units['TIME-SPEND'], formatDuration));
};

const createStatisticsTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`
);

export default class Statistics extends SmartView {
  constructor(points) {
    super();

    this._data = {
      points: points,
    };

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const {points} = this._data;

    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;


    this._moneyChart = renderMoneyChart(moneyCtx, points);
    this._typeChart = renderTypeChart(typeCtx, points);
    this._timeChart = renderTimeChart(timeCtx, points);
  }
}

