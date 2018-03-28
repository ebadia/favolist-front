import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component'
import { AuthGuard } from '@app/services/accounts/auth-guard.service'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'favolist',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: AuthLayoutComponent,
    loadChildren: 'app/auth/auth.module#AuthModule'
  },

  {
    path: 'favolist',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: 'app/home/home.module#HomeModule'
      },
      {
        path: 'orders',
        loadChildren: 'app/orders/orders.module#OrdersModule'
      },
      {
        path: 'products',
        loadChildren: 'app/products/products.module#ProductsModule'
      },
      {
        path: 'users',
        loadChildren: 'app/users/users.module#UsersModule'
      }
    ]
  },

  { path: '**', redirectTo: 'error404' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// export const routing = RouterModule.forRoot( routes, {useHash: true})
