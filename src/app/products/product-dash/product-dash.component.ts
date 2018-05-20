import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'app-product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.css']
})
export class ProductDashComponent implements OnInit {
  days: any[]

  constructor() {}

  ngOnInit() {
    moment.locale('es')
    localStorage.setItem('today', '0')
    this.getDates()
  }

  private getDates() {
    this.days = []
    const init = +localStorage.getItem('today')
    for ( let i = init; i < (init + 7); i++) {
      const obj = {
        day: moment().add(i, 'days').format('YYYY-MM-DD'),
        dayName: moment().add(i, 'days').format('dddd')
      }
      this.days.push( obj )
    }
  }

  today() {
    const init = +localStorage.getItem('today')
    localStorage.setItem('today', '0')
    this.getDates()
  }

  prevWeek() {
    const init = +localStorage.getItem('today')
    localStorage.setItem('today', (init - 7).toString())
    this.getDates()
  }

  nextWeek() {
    const init = +localStorage.getItem('today')
    localStorage.setItem('today', (init + 7).toString())
    this.getDates()
  }
}
