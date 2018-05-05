import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class CartDateSubject {
  // Observable string sources
  private cartDateChanged = new Subject<boolean>()

  // Observable string streams
  // cartChangedAnnounced$ = this.cartChanged.asObservable()
  cartDateChangedAnnounced(): Observable<any> {
    return this.cartDateChanged.asObservable()
  }

  // Service message commands
  announceDateCartChanged(status: boolean) {
    this.cartDateChanged.next(status)
  }
}
