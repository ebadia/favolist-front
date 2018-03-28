import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  fecha: string
  constructor() {}

  ngOnInit() {
    this.fecha = moment().format('DD-MM-YYYY')
  }
}
