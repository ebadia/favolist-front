import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Compiler } from '@angular/core'

import { environment } from '@env/environment'
@Injectable()
export class ProductsService {
  apiUrl = environment.apiUrl

  constructor(private http$: HttpClient) {}

  getOne(id: number): Observable<any> {
    return this.http$.get(`${this.apiUrl}/products/edit/${id}`)
  }

  getAllDays(): Observable<any> {
    return this.http$.get(`${this.apiUrl}/products/all/days`)
  }

  getShopsProducts(shopId: number): Observable<any> {
    return this.http$.get(`${this.apiUrl}/shops/${shopId}/products`)
  }

  add(id: number, obj: any): Observable<any> {
    return this.http$.post(`${this.apiUrl}/products`, obj)
  }

  update(id: number, obj: any): Observable<any> {
    return this.http$.patch(`${this.apiUrl}/products/${id}`, obj)
  }

  delete(id: number): Observable<any> {
    return this.http$.delete(`${this.apiUrl}/products/${id}`)
  }

  updateDay(id: number, dayId: number, status: boolean): Observable<any> {
    return this.http$.get(
      `${this.apiUrl}/products/${id}/days/${dayId}/status/${status}`
    )
  }
}
