import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

import { OrdersComponent } from './orders.component'
import { OrdersListComponent } from './orders-list/orders-list.component'
import { OrdersNewComponent } from './orders-new/orders-new.component'

export const ordersRoutes: Routes = [
  { path: '', redirectTo: 'orders-list/process', pathMatch: 'full' },
  { path: 'orders-list', component: OrdersListComponent },
  { path: 'orders-list/:status', component: OrdersListComponent },
  { path: 'new/:client', component: OrdersNewComponent }
]

export const ordersRouting: ModuleWithProviders = RouterModule.forChild(
  ordersRoutes
)
