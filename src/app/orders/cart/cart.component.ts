import { Component, OnInit } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { CartSubject } from '@services/subjects/cart.subject'
import { CartDateSubject } from '@services/subjects/cart-date.subject'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { ConfirmDeleteDialogComponent } from '@app/shared/layouts/confirm-delete.dialog'
import * as moment from 'moment'
import * as _ from 'lodash'
import { OrdersService } from '@app/services/orders/orders.service'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/forkJoin'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(100)
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  cart: any[]
  date: string

  constructor(
    private _cartSubject: CartSubject,
    private _cartDateSubject: CartDateSubject,
    private dialog: MatDialog,
    private _router: Router,
    private _orders: OrdersService
  ) {
    this._cartSubject.cartChangedAnnounced().subscribe(res => {
      if (res) {
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
      }
    })
    this._cartDateSubject.cartDateChangedAnnounced().subscribe(res => {
      if (res) {
        this.date =
          localStorage.getItem('order-date') || moment().format('YYYY-MM-DD')
        localStorage.removeItem('cart')
        this.cart = []
      }
    })
  }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || []
    this._cartSubject.cartChangedAnnounced().subscribe(res => {
      if (res) {
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
      }
    })
    this._cartDateSubject.cartDateChangedAnnounced().subscribe(res => {
      if (res) {
        this.date =
          localStorage.getItem('order-date') || moment().format('YYYY-MM-DD')
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
      day: moment(this.date).format('YYYY-MM-DD'),
      hour: moment().format('HH:mm'),
      status: 'ORDERING',
      user: +localStorage.getItem('current_client'),
      shop: +localStorage.getItem('admin_shop')
    }
    // console.log('EL PEDIDO', order)
    const isEdit = localStorage.getItem('order-edit')
    console.log('ORDER EDITION', isEdit)

    if (!_.isNull(isEdit) && !_.isUndefined(isEdit)) {
      console.log('NO CREA ORDER')
      const items = JSON.parse(localStorage.getItem('cart'))
      this.saveItems(JSON.parse(isEdit).id, items)
    } else {
      console.log('CREA ORDER')
      this._orders.add(order).subscribe(
        neworder => {
          const items = JSON.parse(localStorage.getItem('cart'))
          console.log('CREA ITEMS', items)

          this.saveItems(neworder['id'], items)
          localStorage.removeItem('order-date')
        },
        error => console.log('error creating order', error)
      )
    }
  }

  saveItems(orderId: number, items: any[]) {
    console.log('ORDER', orderId)
    console.log('ORDER ITEMS', items)

    const allItems = []

    for (let i = 0; i < items.length; i++) {
      // console.log('ONE ORDER ITEM', items[i])
      let isInOrder = null
      if (localStorage.getItem('order-edit')) {
        isInOrder = _.find(
          JSON.parse(localStorage.getItem('order-edit')).items,
          ['product.id', items[i].productId]
        )
      }

      console.log('IN ORDER', isInOrder)

      if (!_.isNull(isInOrder) && !_.isUndefined(isInOrder)) {
        // item IS in order-edit UPDATE
        console.log('IN ORDER')
        allItems.push(
          this._orders.updateItem(items[i].itemId, {
            quantity: items[i].quantity,
            product: { id: items[i].productId }
          })
        )
      } else {
        // item NOT in order-edit NEW
        console.log('NOT IN ORDER')
        allItems.push(
          this._orders.addItem(orderId, {
            quantity: items[i].quantity,
            place: localStorage.getItem('current_order_place'),
            product: { id: items[i].productId }
          })
        )
      }
    }

    Observable.forkJoin(allItems).subscribe(() => {
      this.vaciaCarro()
      this._orders.sendMsg('item updated')
      this._router.navigate(['favolist', 'orders', 'orders-list', 'process'])
      console.log('se supone que habia terminado')
    })
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
    localStorage.removeItem('order-edit')
    this._cartSubject.announceCartChanged(true)
  }
}
