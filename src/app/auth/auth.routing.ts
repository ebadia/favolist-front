import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'

export const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
