import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module'

import { routing } from './auth.routing'
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing,
    MaterialModule,
  ],
  declarations: [
    AuthComponent,
    SignupComponent,
    LoginComponent,
  ]
})
export class AuthModule { }
