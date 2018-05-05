import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-order-block',
  templateUrl: './order-block.component.html',
  styleUrls: ['./order-block.component.css']
})
export class OrderBlockComponent implements OnInit {

  @Input() orders: any
  @Input() status: string
  @Output() done: EventEmitter<any> = new EventEmitter()
  @Output() orderReady: EventEmitter<any> = new EventEmitter()
  @Output() orderClosed: EventEmitter<any> = new EventEmitter()
  @Output() refresh: EventEmitter<any> = new EventEmitter()

  filtro: string

  constructor() { }

  ngOnInit() {
    this.filtro = ''
  }

  // done(order: any, item: any) {
  doDone(event: any) {
    this.done.emit(event)
  }

  doOrderReady(order: any) {
    this.orderReady.emit(order)
  }

  doOrderClosed(order: any) {
    this.orderClosed.emit(order)
  }

  doRefresh() {
    this.refresh.emit()
  }

}
