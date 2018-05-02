import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class AvailablesEditSubject {
  // Observable string sources
  private availableEditSource = new Subject<boolean>()

  // Observable string streams
  availableEditAnnounced$ = this.availableEditSource.asObservable()

  // Service message commands
  announceEditAvailable(status: boolean) {
    this.availableEditSource.next(status)
  }
}
