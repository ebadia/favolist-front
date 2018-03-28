import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { tokenNotExpired } from 'angular2-jwt'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { Compiler } from '@angular/core'

import { environment } from '@env/environment'

@Injectable()
export class AccountsService {
  apiUrl = environment.apiUrl
  redirectUrl: string

  constructor(
    private _router: Router,
    private http$: HttpClient,
    private _compiler: Compiler
  ) {}

  login(username: string, password: string): Observable<any> {
    const send = {
      username,
      password
    }
    return this.http$.post(this.apiUrl + '/accounts/login', send, {
      observe: 'response',
      // responseType: 'text',
      headers: new HttpHeaders().append(
        'Access-Control-Expose-Headers',
        'Total, Link, Authorization'
      )
    })
  }

  logout(): void {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('userTokenExpiration')
    localStorage.removeItem('user')
    localStorage.removeItem('roles')
    localStorage.removeItem('current_client')
    localStorage.removeItem('admin_shop')
    localStorage.removeItem('cart')

    this._compiler.clearCache()

    this._router.navigate(['login'])
  }

  isAuthenticated() {
    // user must have authToken and token not expired to be authenticated
    const authToken = localStorage.getItem('auth_token')

    if (tokenNotExpired('auth_token') && authToken) {
      // Valid user //
      return true
    } else {
      // Invalid user //
      this.logout()
      return false
    }
  }

  getUserAdminShops(userId: number): Observable<any> {
    return this.http$.get(`${this.apiUrl}/users/${userId}/admins`)
  }
}
