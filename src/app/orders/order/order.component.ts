import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ConfirmDeleteDialogComponent } from '@shared/layouts/confirm-delete.dialog'
import { MatDialog } from '@angular/material'
import { OrdersService } from '@services/orders/orders.service'
import { ActivatedRoute, Router } from '@angular/router'
import { CartSubject } from '@services/subjects/cart.subject'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order: any
  @Input() status: string
  @Output() ready: EventEmitter<any> = new EventEmitter()
  @Output() closed: EventEmitter<any> = new EventEmitter()
  @Output() done: EventEmitter<any> = new EventEmitter()
  @Output() delete: EventEmitter<any> = new EventEmitter()

  ruta: string

  constructor(
    private dialog: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router,
    private order$: OrdersService,
    private _cartSubject: CartSubject,
  ) {}

  ngOnInit() {
    this._route.url.subscribe(res => {
      // console.log('ROUTA', res[0].path)
      this.ruta = res[0].path
      console.log('THE ROUTE', this.ruta)
    })
  }

  orderReady(order: any) {
    this.ready.emit(order)
    // this._orders.update(order.id, { status: 'READY' }).subscribe(opened => {
    //   this._orders.sendMsg('order ready')
    //   this.RecuperaDatos()
    // })
  }

  edit( order: any ) {
    console.log('EDIT ORDER', order)
    const newOrderItem = []
    order.items.forEach( item => {
      const obj = {
        availablePrice: item.product.price,
        availableStock: item.product.stockOut,
        availableStockOut: item.product.stockOut,
        name: item.product.name,
        price: item.product.price,
        productId: item.product.id,
        quantity: item.quantity,
        itemId: item.id
      }
      newOrderItem.push(obj)
    })
    localStorage.setItem('cart', JSON.stringify(newOrderItem))
    localStorage.setItem('order-edit', JSON.stringify(order))
    this._cartSubject.announceCartChanged(true)

  }

  orderClosed(order: any) {
    this.closed.emit(order)
    // this._orders.update(order.id, { status: 'CLOSED' }).subscribe(opened => {
    //   this._orders.sendMsg('order closed')
    //   this.RecuperaDatos()
    // })
  }

  doDone(order: any, item: any) {
    this.done.emit({ order, item })
  }

  doDelete(order: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { pregunta: '¿Estas seguro de borrar el pedido?', confirm: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.order$.delete(order['id']).subscribe(
          () => this.delete.emit(),
          () => console.log('CANNOT DELETE ORDER ')
        )
      }
    })

  }

  goto(user: any) {
    this._router.navigate(['favolist', 'orders', 'new', user.id])
  }
}
