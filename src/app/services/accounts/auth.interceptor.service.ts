import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('login') !== -1) {
      // console.log('--- sin')
      return next.handle(req)
    } else {
      const token = localStorage.getItem('auth_token')
      const authReq = req.clone({
        headers: req.headers.append('Authorization', token)
      })
      return next.handle(authReq)
    }
  }
}
