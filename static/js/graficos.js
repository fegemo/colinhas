import { range } from './utils.js';

const graficos = {};

graficos.create = function(completudeEl, belezaEl, completudes, belezas, opts = {}) {
  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '90%',
        endingShape: 'flat'
      }
    },
    xaxis: {
      categories: [...range(0, 11)],
      labels: {
        show: true,
        style: {
          fontSize: '8px'
        }
      },
      floating: true
    },
    yaxis: {
      show: false,
      min: 0
    },
    grid: {
      show: false
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },
    stroke: {
      show: false,
      width: 1,
      colors: ['black']
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ['#333'],
        fontSize: '8px'
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '8px'
      },
      x: {
        show: false
      }
    }
  };

  [
    {el: completudeEl, nome: 'completude', valores: completudes},
    {el: belezaEl, nome: 'beleza', valores: belezas}
  ].forEach(({el, nome, valores}) => {
    const frequencies = [...range(0, 11)].map(i => valores.filter(v => v === i).length);
    const coptions = Object.assign({}, options, {
      series: [{
        name: nome,
        data: frequencies
      }],
      title: {
        text: nome,
        style: {
          fontSize: '10px'
        }
      }
    }, opts);

    const chart = new ApexCharts(el, coptions);
    chart.render();
  });
};

export default graficos;
