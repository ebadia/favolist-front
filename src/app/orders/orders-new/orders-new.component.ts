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
  selector: 'app-orders-new',
  templateUrl: './orders-new.component.html',
  styleUrls: ['./orders-new.component.css']
})
export class OrdersNewComponent implements OnInit {
  shop: string
  client: string
  today: any[]
  orders: any[]
  status: string

  constructor(
    private _orders: OrdersService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.shop = localStorage.getItem('admin_shop')
    //
    this._route.params.subscribe(params => {
      this.client = params['client']
      this.RecuperaDatos()
    })
  }

  private RecuperaDatos() {
    this._orders.orderedToday(this.client, +this.shop).subscribe(res => {
      this.orders = _.filter(res, item => {
        if (this.status === 'process') {
          return item.status === 'ORDERING' || item.status === 'OPENED'
        } else if (this.status === 'ready') {
          return item.status === 'READY' || item.status === 'CLOSED'
        } else {
          return res
        }
      })
      console.log('PEDIDOS', this.orders)
    })
  }
}
