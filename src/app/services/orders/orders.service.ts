import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/map'
import { Compiler } from '@angular/core'
import { WebsocketService } from '../subjects/websocket.service'

import { environment } from '@env/environment'

@Injectable()
export class OrdersService {
  apiUrl = environment.apiUrl
  messages: Subject<any>

  constructor(private http$: HttpClient, private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response
      })
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg)
  }

  // API

  update(orderId: number, order: any): Observable<any> {
    return this.http$.patch(`${this.apiUrl}/orders/${orderId}`, order)
  }

  delete(orderId: number): Observable<any> {
    return this.http$.delete(`${this.apiUrl}/orders/${orderId}`)
  }

  getTodayOrders(shopId: number): Observable<any> {
    return this.http$.get(`${this.apiUrl}/orders/today/shops/${shopId}`, {
      headers: new HttpHeaders().append('Cache-control', 'no-cache')
    })
  }

  setItemDone(itemId: number): Observable<any> {
    return this.http$.patch(`${this.apiUrl}/items/${itemId}`, {
      status: 'READY'
    })
  }

  // orders from user

  add(obj: any) {
    return this.http$.post(this.apiUrl + `/orders`, obj)
  }

  get(orderId: number) {
    return this.http$.get(this.apiUrl + `/orders/${orderId}`)
  }

  addItem(id: number, obj: any) {
    return this.http$.post(this.apiUrl + `/orders/${id}/items`, obj)
  }

  updateItem(id: number, obj: any) {
    return this.http$.patch(this.apiUrl + `/items/${id}`, obj)
  }

  orderedToday(userId: string, shopId: number): Observable<any> {
    return this.http$.get(
      this.apiUrl + `/orders/today/users/${userId}/shops/${shopId}`
    )
  }

  orderedFromToday(userId: string, shopId: number): Observable<any> {
    return this.http$.get(
      this.apiUrl + `/orders/fromtoday/users/${userId}/shops/${shopId}`
    )
  }

  dashboard(date: string, shopid: number): Observable<any> {
    return this.http$.get(
      this.apiUrl + `/orders/dashboard/${date}/shop/${shopid}`
    )
  }
}
