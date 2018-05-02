import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { ProductsComponent } from './products.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductEditComponent } from './product-edit/product-edit.component'
import { ProductDashComponent } from './product-dash/product-dash.component'
import { AvailableListComponent } from '@app/products/available-list/available-list.component'
import { AddAvailableComponent } from '@app/products/add-available/add-available.component'

export const productsRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ProductListComponent },
  { path: 'edit', component: ProductEditComponent },
  { path: 'edit/:id', component: ProductEditComponent },

  { path: 'dash', component: ProductDashComponent },
  { path: 'availables', component: AvailableListComponent },
  { path: 'add-availables/:day', component: AddAvailableComponent },
]

export const productsRouting: ModuleWithProviders = RouterModule.forChild(
  productsRoutes
)
