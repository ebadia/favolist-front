import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

import { UsersListComponent } from './users-list/users-list.component'

export const usersRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: UsersListComponent }
]
// { path: 'list', component: ProductListComponent },
// { path: 'edit', component: ProductEditComponent },
// { path: 'edit/:id', component: ProductEditComponent }

export const usersRouting: ModuleWithProviders = RouterModule.forChild(
  usersRoutes
)
