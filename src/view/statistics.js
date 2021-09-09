import Chart from 'chart.js';
import {Units} from '../constants.js';
import {createChartTemplate} from '../utils/chart.js';
import {
  countPointsByType,
  countCostsByType,
  countDurationByType,
  makeItemsUniq,
  typeToHex
} from '../utils/statistics.js';
import {formatDurationElement} from '../utils/common.js';
import SmartView from './smart.js';

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
const BAR_HEIGHT = 55;

const renderMoneyChart = (moneyCtx, points) => {

  const pointTypes = points.map((point) => point.type);

  const uniqTypes = makeItemsUniq(pointTypes);
  const uniqTypesUpperCase = uniqTypes.map((type) => type.toUpperCase());

  const pointByTypeCounts = uniqTypes.map((type) => countCostsByType(points, type));

  const hexTypes = uniqTypes.map((type) => typeToHex[type]);

  return new Chart(moneyCtx, createChartTemplate(uniqTypesUpperCase, pointByTypeCounts, hexTypes, Units.MONEY));
};

const renderTypeChart = (typeCtx, points) => {
  const pointTypes = points.map((point) => point.type);

  const uniqTypes = makeItemsUniq(pointTypes);
  const uniqTypesUpperCase = uniqTypes.map((type) => type.toUpperCase());

  const pointByTypeCounts = uniqTypes.map((type) => countPointsByType(points, type));

  const hexTypes = uniqTypes.map((type) => typeToHex[type]);

  return new Chart(typeCtx, createChartTemplate(uniqTypesUpperCase, pointByTypeCounts, hexTypes, Units.TYPE));
};

const renderTimeChart = (timeCtx, points) => {
  const pointTypes = points.map((point) => point.type);

  const uniqTypes = makeItemsUniq(pointTypes);
  const uniqTypesUpperCase = uniqTypes.map((type) => type.toUpperCase());

  const pointByTypeCounts = uniqTypes.map((type) => countDurationByType(points, type));

  const hexTypes = uniqTypes.map((type) => typeToHex[type]);

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

  return new Chart(timeCtx,  createChartTemplate(uniqTypesUpperCase, pointByTypeCounts, hexTypes, Units.TIME, formatDuration));
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

