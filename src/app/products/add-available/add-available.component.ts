import { Component, OnInit, Input } from '@angular/core'
import * as moment from 'moment'
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'

import { AvailablesService } from '@services/availables/availables.service'
import { AvailablesSubject } from '@services/subjects/availables.subject'
import { MatSnackBar } from '@angular/material'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { ConfirmDeleteDialogComponent } from '@app/shared/layouts/confirm-delete.dialog'
import { CartSubject } from '@app/services/subjects/cart.subject'

@Component({
  selector: 'app-add-available',
  templateUrl: './add-available.component.html',
  styleUrls: ['./add-available.component.css']
})
export class AddAvailableComponent implements OnInit {
  day: string
  dayName: string
  shop: string
  availables: any[]
  ruta: string
  cart: any[]
  date: any

  constructor(
    private _available: AvailablesService,
    private _availableSubject: AvailablesSubject,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cartSubject: CartSubject
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
  }

  ngOnInit() {
    moment.locale('es')
    this._route.params.subscribe(
      params => {
        if ( params.day ) {
          this.day = params.day
        } else {
          this.day =  moment(this.day).format('YYYY-MM-DD')
        }
        this.dayName = moment(this.day).format('dddd')
        console.log('DAY FROM ADD', this.day)
      }
    )

    this._route.url.subscribe(res => {
      // console.log('ROUTA', res[0].path)
      this.ruta = res[0].path
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

  action(product) {
    switch (this.ruta) {
      case 'new':
        this.addToCart(product)
        break
      case 'dash':
        this.delete(product)
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
    this.cart.push(product)
    localStorage.setItem('cart', JSON.stringify(this.cart))
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

  add(date: any) {
    console.log('ADD AVAILABLE ON', date.day)
    localStorage.setItem('date', date.day)
    this._router.navigate(['favolist', 'products', 'add-availables', this.day])
  }

  back() {
    this._router.navigate(['favolist', 'products', 'dash'])
  }
}

