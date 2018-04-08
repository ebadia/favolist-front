import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

import { UsersListComponent } from './users-list/users-list.component'
import { UsersEditComponent } from './users-edit/users-edit.component'

export const usersRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: UsersListComponent },
  { path: 'edit', component: UsersEditComponent },
  { path: 'edit/:id', component: UsersEditComponent },
]

export const usersRouting: ModuleWithProviders = RouterModule.forChild(
  usersRoutes
)
