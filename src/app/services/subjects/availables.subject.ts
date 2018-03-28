import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class AvailablesSubject {
  // Observable string sources
  private availableAddedSource = new Subject<boolean>()

  // Observable string streams
  availableAnnounced$ = this.availableAddedSource.asObservable()

  // Service message commands
  announceAvailable(status: boolean) {
    this.availableAddedSource.next(status)
  }
}
