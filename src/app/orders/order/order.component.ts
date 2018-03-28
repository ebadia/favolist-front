import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

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

  constructor() {}

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
}
