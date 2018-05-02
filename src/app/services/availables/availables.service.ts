import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

import { environment } from '@env/environment'

@Injectable()
export class AvailablesService {
  apiUrl = environment.apiUrl

  constructor(private http$: HttpClient) {}

  getAll(): Observable<any> {
    return this.http$.get(`${this.apiUrl}/availables`)
  }

  getTodayFromShop(id: number): Observable<any> {
    return this.http$.get(`${this.apiUrl}/availables/today/shops/${id}`)
  }

  getFromShopInDate(id: number, date: string): Observable<any> {
    return this.http$.get(`${this.apiUrl}/availables/shops/${id}`, {
      params: {
        date
      }
    })
  }

  add(product: any): Observable<any> {
    return this.http$.post(`${this.apiUrl}/availables`, product)
  }

  update(id: number, product: any): Observable<any> {
    return this.http$.patch(`${this.apiUrl}/availables/${id}`, product)
  }

  delete(id: number): Observable<any> {
    return this.http$.delete(`${this.apiUrl}/availables/${id}`)
  }
}
