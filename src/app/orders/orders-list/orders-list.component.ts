import { Component, OnInit } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { OrdersService } from './../../services/orders/orders.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: any[]
  shop: string
  status: string
  filtro: string

  constructor(
    private _orders: OrdersService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.shop = localStorage.getItem('admin_shop')
    // update from SOCKET
    this._orders.messages.subscribe(msg => {
      if (msg.event === 'new order') {
        console.log(msg)
        setTimeout(() => this.refresh(), 2000)
      }
    })
    //
    this._route.params.subscribe(params => {
      this.status = params['status']
      this.RecuperaDatos()
    })
  }

  private RecuperaDatos() {
    this._orders.getTodayOrders(+this.shop).subscribe(res => {
      this.orders = _.filter(res, item => {
        if (this.status === 'process') {
          return item.status === 'ORDERING' || item.status === 'OPENED'
        } else if (this.status === 'ready') {
          return item.status === 'READY' || item.status === 'CLOSED'
        } else {
          return res
        }
      })
    })
  }

  // done(order: any, item: any) {
  done(event: any) {
    const order = event.order
    const item = event.item
    this._orders.setItemDone(item.id).subscribe(ready => {
      this._orders.update(order.id, { status: 'OPENED' }).subscribe(opened => {
        this._orders.getTodayOrders(+this.shop).subscribe(res => {
          this.orders = res
        })
      })
    })
  }

  orderReady(order: any) {
    this._orders.update(order.id, { status: 'READY' }).subscribe(opened => {
      this._orders.sendMsg('order ready')
      this.RecuperaDatos()
    })
  }

  orderClosed(order: any) {
    this._orders.update(order.id, { status: 'CLOSED' }).subscribe(opened => {
      this._orders.sendMsg('order closed')
      this.RecuperaDatos()
    })
  }

  refresh() {
    this._orders.getTodayOrders(+this.shop).subscribe(res => {
      console.log('REFRESCA', res)
      this.RecuperaDatos()
    })
  }

  order() {
    this._router.navigate(['favolist', 'users', 'list'])
  }
}
