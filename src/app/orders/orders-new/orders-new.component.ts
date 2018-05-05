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
import * as moment from 'moment'
import { UsersService } from '@services/users/users.service'

@Component({
  selector: 'app-orders-new',
  templateUrl: './orders-new.component.html',
  styleUrls: ['./orders-new.component.css']
})
export class OrdersNewComponent implements OnInit {
  shop: string
  client: string
  today: any[]
  day: string
  orders: any[]
  status: string
  user: any

  constructor(
    private _orders: OrdersService,
    private _usersSrv: UsersService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.day = moment().format('YYYY-MM-DD')
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

    this._usersSrv.getOne(+this.client).subscribe(
      res => this.user = res
    )
  }
}
