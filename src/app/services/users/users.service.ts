import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

import { environment } from '@env/environment'
@Injectable()
export class UsersService {
  apiUrl = environment.apiUrl

  constructor(private http$: HttpClient) {}

  getAll(): Observable<any> {
    return this.http$.get(`${this.apiUrl}/users`)
  }

  getOne(id: number): Observable<any> {
    return this.http$.get(`${this.apiUrl}/users/${id}`)
  }

  delete(id: number): Observable<any> {
    return this.http$.delete(`${this.apiUrl}/users/${id}`)
  }

  getAllDays(): Observable<any> {
    return this.http$.get(`${this.apiUrl}/users/all/days`)
  }

  getShopsProducts(shopId: number): Observable<any> {
    return this.http$.get(`${this.apiUrl}/shops/${shopId}/users`)
  }

  create(obj: any): Observable<any> {
    return this.http$.post(`${this.apiUrl}/users/`, obj)
  }

  addUserToShop(userId: number, obj: any): Observable<any> {
    return this.http$.post(`${this.apiUrl}/users/${userId}/shops`, obj)
  }

  addUserToRole(userId: number, obj: any): Observable<any> {
    return this.http$.post(`${this.apiUrl}/users/${userId}/roles`, obj)
  }

  update(id: number, obj: any): Observable<any> {
    return this.http$.patch(`${this.apiUrl}/users/${id}`, obj)
  }

  updateDay(id: number, dayId: number, status: boolean): Observable<any> {
    return this.http$.get(
      `${this.apiUrl}/users/${id}/days/${dayId}/status/${status}`
    )
  }
}
