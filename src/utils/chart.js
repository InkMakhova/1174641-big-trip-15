import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Units} from '../constants.js';
import {getKeyByValue} from '../utils/common.js';

export const createChartTemplate = (labels, data, unit, formatter) => {
  const chartTitle = getKeyByValue(Units, unit);

  const formatMoney = () => unit === Units.MONEY ? Units.MONEY : '';
  const formatType = () => unit === Units.TYPE ? Units.TYPE : '';

  return {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#c0c0c0',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${formatMoney()}${formatter ? formatter(val) : val}${formatType()}`,
        },
      },
      title: {
        display: true,
        text: chartTitle,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 35,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
            padding: 5,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  };
};
