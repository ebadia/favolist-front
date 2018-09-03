import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class CartSubject {
  // Observable string sources
  private cartChanged = new Subject<boolean>()

  // Observable string streams
  cartChangedAnnounced(): Observable<any> {
    return this.cartChanged.asObservable()
  }

  // Service message commands
  announceCartChanged(status: boolean) {
    this.cartChanged.next(status)
  }
}
