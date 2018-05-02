import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from './shared/material.module'
import { AppComponent } from './app.component'
// import { AppRoutingModule } from './app.routing'
import { appRouting } from './app.routing'
import { LayoutsModule } from './shared/layouts/layouts.module'
import { AuthGuard } from './services/accounts/auth-guard.service'

import { AccountsService } from './services/accounts/accounts.service'
import { AuthInterceptorService } from './services/accounts/auth.interceptor.service'
import { ShopsService } from './services/shops/shops.service'
import { ProductsService } from './services/products/products.service'
import { AvailablesService } from '@app/services/availables/availables.service'
import { AvailablesSubject } from './services/subjects/availables.subject'
import { OrdersService } from '@app/services/orders/orders.service'
import { WebsocketService } from '@app/services/subjects/websocket.service'
import { JWTInteceptor } from '@app/services/accounts/JWT.interceptor'
import { UsersService } from '@app/services/users/users.service'
import { CartSubject } from '@app/services/subjects/cart.subject.'
import { AvailablesEditSubject } from '@services/subjects/availables-edit.subject'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    LayoutsModule,
    // AppRoutingModule,
    appRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AccountsService,
    AuthGuard,
    ShopsService,
    ProductsService,
    AvailablesService,
    AvailablesSubject,
    AvailablesEditSubject,
    OrdersService,
    WebsocketService,
    UsersService,
    CartSubject,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JWTInteceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
