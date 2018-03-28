import { Injectable } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { AccountsService } from './accounts.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _auth: AccountsService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url
    return this.checkLogin(url)
  }

  checkLogin(url: string): boolean {
    if (this._auth.isAuthenticated()) {
      return true
    }

    this._auth.redirectUrl = url
    this._router.navigate(['login'])
    return false
  }
}
