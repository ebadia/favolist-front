import { Component, OnInit, Input } from '@angular/core'
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

@Component({
  selector: 'app-available-list',
  templateUrl: './available-list.component.html',
  styleUrls: ['./available-list.component.css']
})
export class AvailableListComponent implements OnInit {
  @Input() date: any
  shop: string
  availables: any[]
  ruta: string
  cart: any[]
  day: string
  dayName: string
  isEditing = false

  constructor(
    private _available: AvailablesService,
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
        this._available.getFromShopInDate(+this.shop, this.day).subscribe(
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
      changed => this.isEditing = changed
    )
  }



  ngOnInit() {
    this._route.url.subscribe(res => {
      // console.log('ROUTA', res[0].path)
      this.ruta = res[0].path
      console.log('THE ROUTE', this.ruta)
    })

    this.setDates()

    this.shop = localStorage.getItem('admin_shop')
    this.cart = JSON.parse(localStorage.getItem('cart')) || []
    this._cartSubject.cartChangedAnnounced().subscribe(res => {
      if (res) {
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
      }
    })

    this.RecuperaDatos()
  }

  private setDates() {
    this.day = moment(this.date).format('YYYY-MM-DD')
    this.dayName = moment(this.date).format('dddd')
    localStorage.setItem('order-date', this.date)
    this._cartDateSubject.announceDateCartChanged(true)
  }

  private RecuperaDatos() {
    this._available.getFromShopInDate(+this.shop, this.date).subscribe(
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

  action(product) {
    switch (this.ruta) {
      case 'new':
        this.addToCart(product)
        break
      case 'add-availables':
        this.edit(product)
        break

      default:
        break
    }
  }

  delete(product) {
    console.log('DELETED CONFIRM', product)
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { pregunta: '¿Borrar de la lista?', confirm: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._available.delete(product.availableId).subscribe(res => {
          console.log('DELETED AVAILABLE', res)
          this.RecuperaDatos()
        })
      }
    })
  }

  addToCart(product) {
    const carro = JSON.parse( localStorage.getItem('cart') )
    const inCart = _.find( carro, ['productId', product.productId])
    if (inCart) {
      // if item is in the cart update quantity
      inCart.quantity = inCart.quantity + 1
      localStorage.setItem('cart', JSON.stringify(carro))
    } else {
      // else add new
      product.quantity = 1
      this.cart.push(product)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
    this._cartSubject.announceCartChanged(true)
  }

  vaciar() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { pregunta: '¿Borrar toda la lista?', confirm: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const lista = Object.assign([], this.availables)
        this.availables = []
        for (let i = 0; i < lista.length; i++) {
          this._available
            .delete(lista[i]['availableId'])
            .subscribe(
              () => (console.log('DELETED AVAILABLES', i)),
              () => (console.log('DELETED AVAILABLES ERROR', i)),
            )
        }
        // this.RecuperaDatos()
      }
    })
  }

  add() {
    console.log('ADD AVAILABLE ON', this.date)
    localStorage.setItem('date', this.date)
    this._router.navigate(['favolist', 'products', 'add-availables', this.date])
  }

  edit(product: any) {
    if ( !this.isEditing ) {
      console.log('EDIT THIS PRODUCT', product)
      if ( _.isNull(localStorage.getItem('edit-available')) ) {
        localStorage.setItem('edit-available', JSON.stringify(product))
        this._availableEditSubject.announceEditAvailable(true)
      } else {
        this._availableEditSubject.announceEditAvailable(false)
        localStorage.setItem('edit-available', null)
        localStorage.setItem('edit-available', JSON.stringify(product))
        this._availableEditSubject.announceEditAvailable(true)
      }
    }
  }

  ayer() {
    this.date = moment(this.date).subtract(1, 'days').format('YYYY-MM-DD')
    this.setDates()
    this.RecuperaDatos()
  }
  hoy() {
    this.date = moment().format('YYYY-MM-DD')
    this.setDates()
    this.RecuperaDatos()
  }
  tomorrow() {
    this.date = moment(this.date).add(1, 'days').format('YYYY-MM-DD')
    this.setDates()
    this.RecuperaDatos()
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = moment(event.value).format('YYYY-MM-DD')
    this.setDates()
    this.RecuperaDatos()
  }

}
