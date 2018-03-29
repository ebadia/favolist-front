import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { ListComponent } from './list/list.component'

export const homeRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: ListComponent }
]

export const homeRouting: ModuleWithProviders = RouterModule.forChild(
  homeRoutes
)
