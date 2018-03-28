import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

import { environment } from '@env/environment'

@Injectable()
export class ShopsService {
  apiUrl = environment.apiUrl

  constructor(private http$: HttpClient) {}

  getShopsProducts(shopId: number): Observable<any> {
    return this.http$.get(`${this.apiUrl}/shops/${shopId}/products`)
  }
}
