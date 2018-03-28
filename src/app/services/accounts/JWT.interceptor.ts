/**
 * Interceptor to go to login after JWT Token has expired (status 401 // invalid_token )
 */

import { ActivatedRoute, Router } from '@angular/router'
import { HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'

@Injectable()
export class JWTInteceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // nada
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // JWT expired return to home
            this._router.navigate(['login'])
          }
          if (err.status === 500) {
            // JWT expired return to home
            console.log('General system fail')
            this._router.navigate(['login'])
          }
        }
      }
    )
  }
}
