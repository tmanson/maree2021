import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockServerService } from './mock-server.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EChartOption } from 'echarts';

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

import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  options: Options = {
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
      max: 100
    },
    series: [
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
      { month: "January", days: 31, monthDatas: janvier, options: this.optionsJanvier, coeffDatas: coeffjanvier },
      { month: "February", days: 28, monthDatas: fevrier, options: this.optionsFevrier, coeffDatas: coefffevrier },
      { month: "March", days: 31, monthDatas: mars, options: this.optionsMars, coeffDatas: coeffmars },
      { month: "April", days: 30, monthDatas: avril, options: this.optionsAvril, coeffDatas: coeffavril },
      { month: "May", days: 31, monthDatas: mai, options: this.optionsMai, coeffDatas: coeffmai },
      { month: "June", days: 30, monthDatas: juin, options: this.optionsJuin, coeffDatas: coeffjuin },
      { month: "July", days: 31, monthDatas: juillet, options: this.optionsJuillet, coeffDatas: coeffjuillet },
      { month: "August", days: 31, monthDatas: aout, options: this.optionsAout, coeffDatas: coeffaout },
      { month: "September", days: 30, monthDatas: septembre, options: this.optionsSeptembre, coeffDatas: coeffseptembre },
      { month: "October", days: 31, monthDatas: octobre, options: this.optionsOctobre, coeffDatas: coeffoctobre },
      { month: "November", days: 30, monthDatas: novembre, options: this.optionsNovembre, coeffDatas: coeffnovembre },
      { month: "December", days: 31, monthDatas: decembre, options: this.optionsDecembre , coeffDatas: coeffdecembre},
    ]
   }

  ngOnInit() {
    const OFFSET_HEURE = 0;
    const OFFSET_HAUTEUR = 1;
    let m = 0;
    const NB_COEFF = 4;
    const COEFF_SERIE = 1;
    this.months.forEach((month) => {
      console.log("Month", month, m);
      for (let d = 0; d < month.days; d++) {
        console.log("Day", d);
        let date = "2021-" + ("0" + (m + 1)).slice(-2) + "-" + ("0" + (d + 1)).slice(-2);
        console.log("Date", date);
        for (let i = 0; i < this.NB_VALUES; i++) {
          month.options.xAxis.data.push(month.monthDatas[d][date][i][OFFSET_HEURE]);
          month.options.series[0].data.push(month.monthDatas[d][date][i][OFFSET_HAUTEUR]);
        }
        for (let i = 0; i < NB_COEFF; i++) {
          let coeff = month.coeffDatas[d][date][i];
          if(coeff[0] == 'tide.high') {
            month.options.series[COEFF_SERIE].data.push(coeff[3]);
          }
        }
      }
      month.options.series[0].label.formatter = (params) => { params.value[params.encode.y[0]]};
      m++;
    });
  }
  static deepCopy(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = AppComponent.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = AppComponent.deepCopy(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }
}
interface MonthObj { month: string, days: number, monthDatas: Array<Object>, options: Options, coeffDatas: Object }
interface Options {
  xAxis: {
    type: string,
    data: Array<string>,
  },
  yAxis: {
    type: string,
    max: number
  },
  series: [
    {
      data: Array<Number>,
      type: string,
      label: {
        normal: {
          show: true,
          position: 'top'
        },
        formatter: any
      },
    },
    {
      data: Array<Number>,
      type: string,
      label: {
        normal: {
          show: true,
          position: 'top'
        },
        formatter: any
      },
    }
  ],
};