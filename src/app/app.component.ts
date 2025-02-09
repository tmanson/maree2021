import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MockServerService} from './mock-server.service';

import janvier from '../assets/hauteurs/janvier.json';
import fevrier from '../assets/hauteurs/fevrier.json';
import mars from '../assets/hauteurs/mars.json';
import avril from '../assets/hauteurs/avril.json';
import mai from '../assets/hauteurs/mai.json';
import juin from '../assets/hauteurs/juin.json';
import juillet from '../assets/hauteurs/juillet.json';
import aout from '../assets/hauteurs/aout.json';
import septembre from '../assets/hauteurs/septembre.json';
import octobre from '../assets/hauteurs/octobre.json';
import novembre from '../assets/hauteurs/novembre.json';
import decembre from '../assets/hauteurs/decembre.json';

import coeffjanvier from '../assets/coeff/coeffJanvier.json';
import coefffevrier from '../assets/coeff/coeffFevrier.json';
import coeffmars from '../assets/coeff/coeffMars.json';
import coeffavril from '../assets/coeff/coeffAvril.json';
import coeffmai from '../assets/coeff/coeffMai.json';
import coeffjuin from '../assets/coeff/coeffJuin.json';
import coeffjuillet from '../assets/coeff/coeffJuillet.json';
import coeffaout from '../assets/coeff/coeffAout.json';
import coeffseptembre from '../assets/coeff/coeffSeptembre.json';
import coeffoctobre from '../assets/coeff/coeffOctobre.json';
import coeffnovembre from '../assets/coeff/coeffNovembre.json';
import coeffdecembre from '../assets/coeff/coeffDecembre.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  options = {
    title: {
      text: '',
      textStyle: {
        color: '#5c7aff',
        fontFamily: 'Roboto Mono',
      }
    },
    grid: {
      left: 60,
      top: 30,
      bottom: 30,
      right: 20
    },
    xAxis: {
      type: 'category',
      data: [],
      show: true,
      axisLabel: {show: true, interval: 288, rotate: 0, padding: [-15, -155, 0, 0], 'font-family': 'Roboto Mono',
			fontSize: 35,
			fontWeight: 'normal'},
      axisLine: {lineStyle: {color: '#ff7b5c', width: 3}},
	  axisTick: {lineStyle: {color: '#ff7b5c', width: 3}, length:15},
    },
    yAxis: {
      type: 'value',
      max: 7.9,
      min: -0.7,
      show: false,
      position: 'right',
      axisLabel: {show: false},
      axisLine: {lineStyle: {color: '#ff7b5c'}}
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
		lineStyle: {
			width: 5
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
          symbol: 'roundRect',
          symbolSize: 60,
          itemStyle: {color: '#7997ff'},
          label: {
            color: '#fff',
            'font-family': 'Roboto Mono',
			fontSize: 35,
			fontWeight: 'normal'
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
          symbol: 'circle',
          symbolSize: 1,
          label: {
            color: '#7997ff',
            opacity: 1,
            'font-family': 'Roboto Mono',
			fontSize: 26,
			fontWeight: 'bold'
          },
          data: []
        }
      }
    ],
  };
  optionsJanvier = null;
  optionsFevrier = null;
  optionsMars = null;
  optionsAvril = null;
  optionsMai = null;
  optionsJuin = null;
  optionsJuillet = null;
  optionsAout = null;
  optionsSeptembre = null;
  optionsOctobre = null;
  optionsNovembre = null;
  optionsDecembre = null;

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
      {month: 'Janvier', days: 31, monthDatas: janvier, options: this.optionsJanvier, coeffDatas: coeffjanvier},
      {month: 'Février', days: 28, monthDatas: fevrier, options: this.optionsFevrier, coeffDatas: coefffevrier},
      {month: 'Mars', days: 31, monthDatas: mars, options: this.optionsMars, coeffDatas: coeffmars},
      {month: 'Avril', days: 30, monthDatas: avril, options: this.optionsAvril, coeffDatas: coeffavril},
      {month: 'Mai', days: 31, monthDatas: mai, options: this.optionsMai, coeffDatas: coeffmai},
      {month: 'Juin', days: 30, monthDatas: juin, options: this.optionsJuin, coeffDatas: coeffjuin},
      {month: 'Juillet', days: 31, monthDatas: juillet, options: this.optionsJuillet, coeffDatas: coeffjuillet},
      {month: 'Août', days: 31, monthDatas: aout, options: this.optionsAout, coeffDatas: coeffaout},
      {month: 'Septembre', days: 30, monthDatas: septembre, options: this.optionsSeptembre, coeffDatas: coeffseptembre},
      {month: 'Octobre', days: 31, monthDatas: octobre, options: this.optionsOctobre, coeffDatas: coeffoctobre},
      {month: 'Novembre', days: 30, monthDatas: novembre, options: this.optionsNovembre, coeffDatas: coeffnovembre},
      {month: 'Décembre', days: 31, monthDatas: decembre, options: this.optionsDecembre, coeffDatas: coeffdecembre},
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
    const OFFSET_Y = 1;
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
        const xAxisLAbel = [];
        console.log('Month', month, m);
        let showCoeff = true;
        let forceShowCoeff = false;
        let forceShowHeureBm = false;
        let prevCoeff = undefined;
        let hauteurPrev;
        for (let d = 0; d < month.days; d++) {
          const date = '2021-' + ('0' + (m + 1)).slice(-2) + '-' + ('0' + (d + 1)).slice(-2);
          console.log('Date', date);
          const coefficients: number[] = [];
          const heuresPm: string[] = [];
          const heuresBm: string[] = [];
          for (let i = 0; i < NB_COEFF; i++) {
            const coeffInfos = month.coeffDatas[d][date][i];
            if (coeffInfos[0] === 'tide.high') {
              const coeff = coeffInfos;
              coefficients.push(coeff);
              heuresPm.push(coeffInfos[OFFSET_HEURE_PM_BM]);
            }
            if (coeffInfos[0] === 'tide.low') {
              heuresBm.push(coeffInfos[OFFSET_HEURE_PM_BM]);
            }
          }
          for (let heure = 0; heure < this.NB_VALUES; heure++) {
            if (month.monthDatas[d][date][heure] === undefined) {
              continue;
            }
            const hauteurInfoHeure = month.monthDatas[d][date][heure];
            const hauteurVal = (hauteurInfoHeure[OFFSET_HAUTEUR] + OFFSET_Y) * 1.0;
            const heureVal = hauteurInfoHeure[OFFSET_HEURE];
            const currentDate = Date.parse(date.concat(' ').concat(heureVal).concat(':00 GMT'));
            const heurePMDate = Date.parse(date.concat(' ').concat(heuresPm.values().next().value).concat(':00 GMT'));
            const heureBMDate = Date.parse(date.concat(' ').concat(heuresBm.values().next().value).concat(':00 GMT'));
            //console.log(date.concat(' ').concat(heureVal).concat(':00 GMT'), date.concat(' ').concat(heuresBm.values().next().value).concat(':00 GMT'));
            // Axe X
            const xIndex = heure + d * this.NB_VALUES;
            xAxisLAbel[xIndex] = date;
            month.options.xAxis.data.push(xIndex);
            if (heure === this.NB_VALUES - 1 && heuresPm.length > 0) {
              forceShowCoeff = true;
            }
            if (heure === this.NB_VALUES - 1 && heuresBm.length > 0) {
              forceShowHeureBm = true;
            }
            // Coefficients de marée 
            if ((currentDate > heurePMDate && showCoeff) || forceShowCoeff) {
              const heurePM = heuresPm.shift();
              const coeff = coefficients.shift();
              // TODO calculer la hauteur avec les hauteur PM/BM pas avec les coeff
              const currentIndex = coefficients.indexOf(coeff);
              const nextIndex = (currentIndex + 1);
              const nextCoeff = coefficients[nextIndex];
              const hCurr: number = coeff[OFFSET_HAUTEUR_PM_BM] * 1.0 + OFFSET_Y;
              const hPrev: number = (prevCoeff === undefined) ? hCurr : (prevCoeff) * 1.0 + OFFSET_Y;
              const hNext: number = (nextCoeff === undefined) ? hCurr : (nextCoeff[OFFSET_HAUTEUR_PM_BM]) * 1.0 + OFFSET_Y;
              let h = hauteurVal;
              //console.log(heure);
              //console.log('lissage', hPrev, hNext, (hPrev + hNext) / 2.0);
              h = ((hPrev + hNext) / 2.0);
              //console.log('hauteurs ', h,  hauteurVal, hPrev, hCurr, hNext);
              //console.log('coeff', coeff[OFFSET_COEFF]);
              month.options.series[COEFF_SERIE].data.push(-1);
              month.options.series[COEFF_SERIE].markPoint.data.push({
                name: 'Coefficient',
                value: coeff[OFFSET_COEFF].toString(),
                xAxis: xIndex,
                yAxis: h + 1.9
              });
              month.options.series[HEURE_SERIE].markPoint.data.push({
                name: 'Coefficient',
                value: heurePM,
                xAxis: xIndex,
                yAxis: h + 1.0
              });
              showCoeff = false;
              forceShowCoeff = false;
              prevCoeff = hPrev - OFFSET_Y;
            } else {

              if (!(currentDate > heurePMDate)) {
                showCoeff = true;
              }
              month.options.series[COEFF_SERIE].data.push(-1);

            }
            if (currentDate > heureBMDate || forceShowHeureBm) {
              //console.log("heurBM")
              const heureBM = heuresBm.shift();
              let hauteurNext = (month.monthDatas[d][date][heure] === undefined) ? hauteurVal : (month.monthDatas[d][date][heure][OFFSET_HAUTEUR]) * 1.0 + OFFSET_Y;
              hauteurPrev = (hauteurPrev === undefined) ? hauteurVal : hauteurPrev;
              let hauteur = (hauteurPrev + hauteurNext) / 2.0;
              month.options.series[HEURE_SERIE].data.push(-1);
              month.options.series[HEURE_SERIE].markPoint.data.push({
                name: 'Coefficient',
                value: heureBM.toString(),
                xAxis: xIndex,
                yAxis: hauteur - 0.8
              });
              hauteurPrev = hauteur;
              forceShowHeureBm = false;
            }

            // Hauteur de marée
            month.options.series[HAUTEUR_SERIE].data.push(hauteurVal);
          }
        }
        month.options.xAxis.axisLabel.formatter = function(value, index) {
          return xAxisLAbel[index].substr(xAxisLAbel[index].length - 2);
        };
        for (let i = 0; i < 15; i++) {
          console.log('ad');
          month.options.series[HAUTEUR_SERIE].data.push(null);
          month.options.xAxis.data.push(month.options.xAxis.data.length + 1);
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
    data: Array<number>,

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
        data: []
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
        data: []
      },
    }
  ];
}
