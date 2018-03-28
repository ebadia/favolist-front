import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { ListComponent } from './list/list.component'

export const homeRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent, data: { title: 'Home' } }
]

export const homeRouting: ModuleWithProviders = RouterModule.forChild(
  homeRoutes
)
