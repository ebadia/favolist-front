import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ConfirmDeleteDialogComponent } from '@shared/layouts/confirm-delete.dialog'
import { MatDialog } from '@angular/material'
import { OrdersService } from '@services/orders/orders.service'

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

  constructor(private dialog: MatDialog, private order$: OrdersService) {}

  ngOnInit() {}

  orderReady(order: any) {
    this.ready.emit(order)
    // this._orders.update(order.id, { status: 'READY' }).subscribe(opened => {
    //   this._orders.sendMsg('order ready')
    //   this.RecuperaDatos()
    // })
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

  delete(order: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { pregunta: '¿Estas seguro de borrar el pedido?', confirm: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.order$.delete(order['id']).subscribe(
        //   () => console.log('ORDER DELETED'),
        //   () => console.log('CANNOT DELETE ORDER ')
        // )
      }
    })

  }
}
