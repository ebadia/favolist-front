import { Component, OnInit } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { CartSubject } from '@services/subjects/cart.subject.'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { ConfirmDeleteDialogComponent } from '@app/shared/layouts/confirm-delete.dialog'
import * as moment from 'moment'
import { OrdersService } from '@app/services/orders/orders.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[]

  constructor(
    private _cartSubject: CartSubject,
    private dialog: MatDialog,
    private _router: Router,
    private _orders: OrdersService
  ) {}

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || []
    this._cartSubject.cartChangedAnnounced().subscribe(res => {
      if (res) {
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
      }
    })
  }

  delete(product) {
    console.log(product)
    this.cart.splice(product, 1)
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this._cartSubject.announceCartChanged(true)
  }

  comprar() {
    console.log('DELETED CONFIRM')
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { pregunta: '¿Pasar el pedido?', confirm: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmOrder()
      }
    })
  }

  private confirmOrder() {
    const order = {
      day: moment().format('YYYY-MM-DD'),
      hour: moment().format('HH:mm'),
      status: 'ORDERING',
      user: +localStorage.getItem('current_client'),
      shop: +localStorage.getItem('admin_shop')
    }
    this._orders.add(order).subscribe(
      neworder => {
        const items = JSON.parse(localStorage.getItem('cart'))
        this.saveItems(neworder['id'], items)
      },
      error => console.log('error creating order', error)
    )
  }

  saveItems(orderId: number, items: any[]) {
    console.log('ORDER', orderId)
    for (let i = 0; i < items.length; i++) {
      this._orders
        .addItem(orderId, {
          quantity: 1,
          product: { id: items[i].productId }
        })
        .subscribe(res => this._orders.sendMsg('item updated')
        )
    }
    this.vaciaCarro()
    // this._router.navigate(['favolist', 'orders-list'])
  }

  vaciar() {
    console.log('DELETED CONFIRM')
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { pregunta: '¿Borrar de la lista?', confirm: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vaciaCarro()
      }
    })
  }

  vaciaCarro() {
    this.cart = []
    localStorage.setItem('cart', JSON.stringify(this.cart))
    this._cartSubject.announceCartChanged(true)
  }
}
