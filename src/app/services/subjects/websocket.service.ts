import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
// import * as Rx from 'rxjs/Rx'
import { environment } from '../../../environments/environment'

@Injectable()
export class WebsocketService {
  // Our socket connection
  private socket

  constructor() {}

  connect(): Subject<MessageEvent> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    this.socket = io(environment.ws_url)

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    const observable = new Observable(anObserver => {
      this.socket.on('today orders', data => {
        anObserver.next(data)
      })
      this.socket.on('new order', data => {
        // console.log('Received [new order] message from Websocket Server', data)
        anObserver.next(data)
      })
      this.socket.on('order ready', data => {
        console.log(
          'Received [order ready] message from Websocket Server',
          data
        )
        anObserver.next(data)
      })
      return () => {
        this.socket.disconnect()
      }
    })

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    const observer = {
      next: (data: Object) => {
        console.log('TO SEND TO SOCKET', data)
        this.socket.emit('order ready', JSON.stringify(data))
      }
    }

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable)
  }
}
