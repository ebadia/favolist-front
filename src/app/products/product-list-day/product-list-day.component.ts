import { Component, Input, OnInit } from '@angular/core'
import { ShopsService } from '@services/shops/shops.service'
import { ProductsService } from '@services/products/products.service'
import { AvailablesService } from '@services/availables/availables.service'
import { Router } from '@angular/router'
import { AvailablesSubject } from '@services/subjects/availables.subject'
import { MatDialog, MatSnackBar } from '@angular/material'

import * as moment from 'moment'
import * as mt from 'moment-timezone'
import * as _ from 'lodash'

@Component({
  selector: 'app-product-list-day',
  templateUrl: './product-list-day.component.html',
  styleUrls: ['./product-list-day.component.css']
})
export class ProductListDayComponent implements OnInit {
  @Input() date: any
  day: string
  dayName: string
  products: any[]
  shop: string

  constructor(
    private _shops: ShopsService,
    private dialog: MatDialog,
    private _available: AvailablesService,
    private _availableSubject: AvailablesSubject,
    private snackBar: MatSnackBar,
    private _service: ProductsService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.day = this.date
    this.dayName = moment(this.date).format('dddd')
    console.log('DEL DIA', this.dayName)
    this.shop = localStorage.getItem('admin_shop')
    this.getProducts()
    this.RecuperaDatos()
  }

  private getProducts() {
    const shop = localStorage.getItem('admin_shop')
    this._shops.getShopsProducts(+shop).subscribe(res => {
      console.log(res)
      this.products = res.products
    })
  }

  private RecuperaDatos() {
    this._available.getFromShopInDate(+this.shop, this.day ).subscribe(
      res => {
        console.log('AVAILABLES', res)
        // this.availables = res
      },
      error => {
        console.log('ERROR', error)
        const snackBarRef = this.snackBar.open(
          'Error al recuperar la lista de hoy',
          '',
          {
            duration: 3000
          }
        )
      }
    )
  }

  addAvailable(product: any, dayObj: any, day: string) {
    console.log('ADD AVAILABLE ', product)
    console.log('ADD AVAILABLE DAY', dayObj)
    console.log('ADD AVAILABLE DAY LOGIC', !_.isNull(dayObj))

    const obj = {
      day,
      stock: !_.isNull(dayObj) ? dayObj.stock : product.stock,
      stockOut: !_.isNull(dayObj) ? dayObj.stockOut : product.stockOut,
      product: {
        id: product.id
      }
    }
    this._available.add(obj).subscribe(
      res => {
        this._availableSubject.announceAvailable(true)
      },
      error => {
        console.log('ERROR', error)

        const snackBarRef = this.snackBar.open(
          'El producto ya está en la lista de hoy',
          '',
          {
            duration: 3000
          }
        )
      }
    )
  }


  hoy() {
    this.products.forEach(product => {
      const isToday = product.days.find(day => {
        console.log('soy el dia', +mt.tz(this.date, 'Europe/Madrid').format('e') )
        return day.code === +mt.tz(this.date, 'Europe/Madrid').format('e')
      })
      console.log('IS TODAY', isToday)
      if (isToday && isToday.stock > 0) {
        this.addAvailable(product, isToday, this.date)
      }
    })
  }

  add(product: any) {
    this.addAvailable(product, null, this.day)
  }

}
