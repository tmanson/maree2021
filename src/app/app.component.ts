import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockServerService } from './mock-server.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EChartOption } from 'echarts';

import janvier from '../assets/janvier.json';
import fevrier from '../assets/fevrier.json';
import mars from '../assets/mars.json';
import avril from '../assets/avril.json';
import mai from '../assets/mai.json';
import juin from '../assets/juin.json';
import juillet from '../assets/juillet.json';
import aout from '../assets/aout.json';
import septembre from '../assets/septembre.json';
import octobre from '../assets/octobre.json';
import novembre from '../assets/novembre.json';
import decembre from '../assets/decembre.json';
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
      max: 6
    },
    series: [
      {
        data: [],
        type: 'line',
      },
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
      { month: "January", days: 31, monthDatas: janvier, options: this.optionsJanvier },
      { month: "February", days: 28, monthDatas: fevrier, options: this.optionsFevrier },
      { month: "March", days: 31, monthDatas: mars, options: this.optionsMars },
      { month: "April", days: 30, monthDatas: avril, options: this.optionsAvril },
      { month: "May", days: 31, monthDatas: mai, options: this.optionsMai },
      { month: "June", days: 30, monthDatas: juin, options: this.optionsJuin },
      { month: "July", days: 31, monthDatas: juillet, options: this.optionsJuillet },
      { month: "August", days: 31, monthDatas: aout, options: this.optionsAout },
      { month: "September", days: 30, monthDatas: septembre, options: this.optionsSeptembre },
      { month: "October", days: 31, monthDatas: octobre, options: this.optionsOctobre },
      { month: "November", days: 30, monthDatas: novembre, options: this.optionsNovembre },
      { month: "December", days: 31, monthDatas: decembre, options: this.optionsDecembre },
    ]
   }

  ngOnInit() {
    const OFFSET_HEURE = 0;
    const OFFSET_HAUTEUR = 1;
    let m = 0;
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
      }
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
interface MonthObj { month: string, days: number, monthDatas: Array<Object>, options: Options }
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
    },
  ],
};