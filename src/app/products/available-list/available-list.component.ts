import { Component, OnInit } from '@angular/core'
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
import * as _ from 'lodash'
import { CartSubject } from '@app/services/subjects/cart.subject.'

@Component({
  selector: 'app-available-list',
  templateUrl: './available-list.component.html',
  styleUrls: ['./available-list.component.css']
})
export class AvailableListComponent implements OnInit {
  shop: string
  availables: any[]
  ruta: string
  cart: any[]

  constructor(
    private _available: AvailablesService,
    private _availableSubject: AvailablesSubject,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _route: ActivatedRoute,
    private _cartSubject: CartSubject
  ) {
    this._availableSubject.availableAnnounced$.subscribe(changed => {
      if (changed) {
        this._available.getTodayFromShop(+this.shop).subscribe(
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
    this._available.getTodayFromShop(+this.shop).subscribe(
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
        for (let i = 0; i < this.availables.length; i++) {
          this._available.delete(this.availables[i].availableId).subscribe()
        }
        this.RecuperaDatos()
      }
    })
  }
}
