import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MockServerService} from './mock-server.service';

import janvier from '../assets/hauteurs/janvier.json';

import coeffjanvier from '../assets/coeff/coeffJanvier.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  options = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
      max: 6,
      min: 0
    },
    series: [
      {
        data: [],
        type: 'line',
        symbol: 'none',
        label: {
          normal: {
            show: false,
            position: 'top'
          },
          formatter: null
        },
        markPoint: {
          symbol: 'arrow',
          data: []
        },
      },
      {
        data: [],
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top'
          },
          formatter: null
        },
        markPoint: {
          symbol: 'roundRect',
          symbolSize: 25,
          label: {
            color: '#fff',
            'font-family': 'Roboto Mono'
          },
          data: []
        }
      },
      {
        data: [],
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'top'
          },
          formatter: null
        },
        markPoint: {
          symbol: 'rect',
          symbolSize: 35,
          label: {
            color: '#fff',
            opacity: 1,
            'font-family': 'Roboto Mono'
          },
          data: []
        }
      }
    ],
  };
  optionsJanvier: Options = null;
  optionsFevrier: Options = null;
  optionsMars: Options = null;
  optionsAvril: Options = null;
  optionsMai: Options = null;
  optionsJuin: Options = null;
  optionsJuillet: Options = null;
  optionsAout: Options = null;
  optionsSeptembre: Options = null;
  optionsOctobre: Options = null;
  optionsNovembre: Options = null;
  optionsDecembre: Options = null;

  public months: Array<MonthObj> = null;
  NB_VALUES = 288;

  constructor(private api: MockServerService, private http: HttpClient) {
    this.optionsJanvier = AppComponent.deepCopy(this.options);
    this.optionsFevrier = AppComponent.deepCopy(this.options);
    this.optionsMars = AppComponent.deepCopy(this.options);
    this.optionsAvril = AppComponent.deepCopy(this.options);
    this.optionsMai = AppComponent.deepCopy(this.options);
    this.optionsJuin = AppComponent.deepCopy(this.options);
    this.optionsJuillet = AppComponent.deepCopy(this.options);
    this.optionsAout = AppComponent.deepCopy(this.options);
    this.optionsSeptembre = AppComponent.deepCopy(this.options);
    this.optionsOctobre = AppComponent.deepCopy(this.options);
    this.optionsNovembre = AppComponent.deepCopy(this.options);
    this.optionsDecembre = AppComponent.deepCopy(this.options);
    this.months = [
      {month: 'January', days: 31, monthDatas: janvier, options: this.optionsJanvier, coeffDatas: coeffjanvier},
      /* {month: 'February', days: 28, monthDatas: fevrier, options: this.optionsFevrier, coeffDatas: coefffevrier},
       {month: 'March', days: 31, monthDatas: mars, options: this.optionsMars, coeffDatas: coeffmars},
       {month: 'April', days: 30, monthDatas: avril, options: this.optionsAvril, coeffDatas: coeffavril},
       {month: 'May', days: 31, monthDatas: mai, options: this.optionsMai, coeffDatas: coeffmai},
       {month: 'June', days: 30, monthDatas: juin, options: this.optionsJuin, coeffDatas: coeffjuin},
       {month: 'July', days: 31, monthDatas: juillet, options: this.optionsJuillet, coeffDatas: coeffjuillet},
       {month: 'August', days: 31, monthDatas: aout, options: this.optionsAout, coeffDatas: coeffaout},
       {month: 'September', days: 30, monthDatas: septembre, options: this.optionsSeptembre, coeffDatas: coeffseptembre},
       {month: 'October', days: 31, monthDatas: octobre, options: this.optionsOctobre, coeffDatas: coeffoctobre},
       {month: 'November', days: 30, monthDatas: novembre, options: this.optionsNovembre, coeffDatas: coeffnovembre},
       {month: 'December', days: 31, monthDatas: decembre, options: this.optionsDecembre, coeffDatas: coeffdecembre},*/
    ];
  }

  static deepCopy(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' !== typeof obj) {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = AppComponent.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = AppComponent.deepCopy(obj[attr]);
        }
      }
      return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
  }

  ngOnInit() {
    const OFFSET_HEURE = 0;
    const OFFSET_HAUTEUR = 1;
    const OFFSET_COEFF = 3;
    const OFFSET_HAUTEUR_PM_BM = 2;
    const OFFSET_HEURE_PM_BM = 1;
    let m = 0;
    const NB_COEFF = 4;
    const HAUTEUR_SERIE = 0;
    const COEFF_SERIE = 1;
    const HEURE_SERIE = 2;
    this.months.forEach((month) => {
        console.log('Month', month, m);
        let showCoeff = true;
        for (let d = 0; d < month.days; d++) {
          console.log('Day', d);
          const date = '2021-' + ('0' + (m + 1)).slice(-2) + '-' + ('0' + (d + 1)).slice(-2);
          console.log('Date', date);
          const coefficients: number[] = [];
          let j = 0;
          const heuresPmBm: string[] = [];
          for (let i = 0; i < NB_COEFF; i++) {
            const coeffInfos = month.coeffDatas[d][date][i];
            if (coeffInfos[0] === 'tide.high') {
              const coeff = coeffInfos[OFFSET_COEFF];
              coefficients.push(coeff);
              heuresPmBm.push(coeffInfos[OFFSET_HEURE_PM_BM]);
            }
          }
          console.log(coefficients);
          for (let heure = 0; heure < this.NB_VALUES; heure++) {
            const hauteurInfoHeure = month.monthDatas[d][date][heure];
            const hauteurVal = hauteurInfoHeure[OFFSET_HAUTEUR] * 1.0;
            const heureVal = hauteurInfoHeure[OFFSET_HEURE];
            const currentDate = Date.parse(date.concat(' ').concat(heureVal).concat(':00 GMT'));
            const heurePMDate = Date.parse(date.concat(' ').concat(heuresPmBm.values().next().value).concat(':00 GMT'));
            // Axe X
            const xIndex = heure + d * this.NB_VALUES;
            month.options.xAxis.data.push(xIndex.toString());
            // Coefficients de marée
            if (currentDate > heurePMDate && showCoeff) {
              const heurePM = heuresPmBm.shift();
              const coeff = coefficients.shift();
              console.log('local max', currentDate, heurePMDate, coeff, xIndex);
              month.options.series[COEFF_SERIE].data.push(-1);
              month.options.series[COEFF_SERIE].markPoint.data.push({
                name: 'Coefficient',
                value: coeff.toString(),
                xAxis: xIndex,
                yAxis: hauteurVal + 0.4
              });
              month.options.series[HEURE_SERIE].markPoint.data.push({
                name: 'Coefficient',
                value: heurePM,
                xAxis: xIndex,
                yAxis: 6
              });
              showCoeff = false;
            } else /*if (prevHauteurVal > hauteurVal && hauteurVal < nextHauteurVal) {
              descend = hauteurVal < prevHauteurVal;
              // on ignore les coeff en basse mer
              // coefficients.pop();
              // récupération de l'heure
            } else */{

              if (!(Date.parse(currentDate) > Date.parse(heurePMDate))) {
                showCoeff = true;
              }
              month.options.series[COEFF_SERIE].data.push(-1);

            }

            // Hauteur de marée
            month.options.series[HAUTEUR_SERIE].data.push(hauteurVal);
          }
        }
        m++;
      }
    );
  }
}

interface MonthObj {
  month: string;
  days: number;
  monthDatas: Array<object>;
  options: Options;
  coeffDatas: object;
}

interface Options {
  xAxis: {
    type: string,
    data: Array<string>,
  };
  yAxis: {
    type: string,
    max: number
  };
  series: [
    {
      data: Array<number>,
      type: string,
      yAxisIndex: Array<number>,
      label: {
        normal: {
          show: true,
          position: 'top'
        },
        formatter: any
      },
      markPoint: {
        data: [
          { name: 'Coefficient', value: number, xAxis: number, yAxis: number }
        ]
      },
    },
    {
      data: Array<number>,
      type: string,
      label: {
        normal: {
          show: true,
          position: 'top'
        },
        formatter: any
      },
      markPoint: {
        data: [
          { name: 'Coefficient', value: -2, xAxis: 1, yAxis: -1.5 }
        ]
      },
    },
    {
      data: Array<number>,
      type: string,
      label: {
        normal: {
          show: true,
          position: 'top'
        },
        formatter: any
      },
      markPoint: {
        data: [
          { name: 'Coefficient', value: -2, xAxis: 1, yAxis: -1.5 }
        ]
      },
    }
  ];
}
