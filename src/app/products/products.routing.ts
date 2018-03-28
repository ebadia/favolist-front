import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { ProductsComponent } from './products.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductEditComponent } from './product-edit/product-edit.component'
import { ProductDashComponent } from './product-dash/product-dash.component'

export const productsRoutes: Routes = [
  { path: '', redirectTo: 'dash', pathMatch: 'full' },
  { path: 'dash', component: ProductDashComponent },
  { path: 'list', component: ProductListComponent },
  { path: 'edit', component: ProductEditComponent },
  { path: 'edit/:id', component: ProductEditComponent }
]

export const productsRouting: ModuleWithProviders = RouterModule.forChild(
  productsRoutes
)
