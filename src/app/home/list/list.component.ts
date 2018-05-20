import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  days: any[]
  isToday = false
  hoy: string

  constructor() {}

  ngOnInit() {
    moment.locale('es')
    localStorage.setItem('today', '0')
    this.getDates()
  }

  private getDates() {
    this.days = []
    const init = +localStorage.getItem('today')
    for (let i = init; i < init + 7; i++) {
      const obj = {
        day: moment()
          .add(i, 'days')
          .format('YYYY-MM-DD'),
        dayName: moment()
          .add(i, 'days')
          .format('dddd')
      }
      this.days.push(obj)
    }
  }

  today() {
    const init = +localStorage.getItem('today')
    localStorage.setItem('today', '0')
    this.isToday = false
    this.getDates()
  }

  todayOnly(day: string) {
    localStorage.setItem('today', '0')
    this.isToday = true
    this.hoy = day
  }

  prevWeek() {
    const init = +localStorage.getItem('today')
    localStorage.setItem('today', (init - 7).toString())
    this.isToday = false
    this.getDates()
  }

  nextWeek() {
    const init = +localStorage.getItem('today')
    localStorage.setItem('today', (init + 7).toString())
    this.isToday = false
    this.getDates()
  }
}
