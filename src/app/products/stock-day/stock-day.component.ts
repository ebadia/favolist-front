import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import * as moment from 'moment'
import * as _ from 'lodash'
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'

import { AvailablesService } from '@services/availables/availables.service'
import { AvailablesSubject } from '@services/subjects/availables.subject'
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { ConfirmDeleteDialogComponent } from '@app/shared/layouts/confirm-delete.dialog'
import { CartSubject } from '@app/services/subjects/cart.subject'
import { CartDateSubject } from '@app/services/subjects/cart-date.subject'
import { AvailablesEditSubject } from '@services/subjects/availables-edit.subject'
import { OrdersService } from '@app/services/orders/orders.service'

@Component({
  selector: 'app-stock-day',
  templateUrl: './stock-day.component.html',
  styleUrls: ['./stock-day.component.css']
})
export class StockDayComponent implements OnInit {
  @Input() date: any

  shop: string
  availables: any[]
  ruta: string
  cart: any[]
  day: string
  dayName: string
  isEditing = false

  constructor(
    private _service: OrdersService,
    private _availableSubject: AvailablesSubject,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cartSubject: CartSubject,
    private _cartDateSubject: CartDateSubject,
    private _availableEditSubject: AvailablesEditSubject
  ) {
    this._availableSubject.availableAnnounced$.subscribe(changed => {
      if (changed) {
        this._service.dashboard(this.day, +this.shop).subscribe(
          res => {
            this.availables = res
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
    })
    this._availableEditSubject.availableEditAnnounced$.subscribe(
      changed => (this.isEditing = changed)
    )
  }

  ngOnInit() {
    // update from SOCKET
    this._service.messages.subscribe(msg => {
      if (msg.event === 'order ready') {
        console.log('I HAVE RECEIVED AN ITEM UPDATED MSG I MUST REFRESH...')
        console.log(msg)
        setTimeout(() => this.RecuperaDatos(), 2000)
      }
    })

    this._route.url.subscribe(res => {
      // console.log('ROUTA', res[0].path)
      this.ruta = res[0].path
      console.log('THE ROUTE', this.ruta)
    })

    this.shop = localStorage.getItem('admin_shop')
    this.cart = JSON.parse(localStorage.getItem('cart')) || []
    this._cartSubject.cartChangedAnnounced().subscribe(res => {
      if (res) {
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
      }
    })

    this.RecuperaDatos()
  }

  private RecuperaDatos() {
    this._service.dashboard(this.date, +this.shop).subscribe(
      res => {
        this.availables = res
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
}
