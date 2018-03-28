import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '@shared/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { usersRouting } from './users.routing'
import { UsersListComponent } from './users-list/users-list.component'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    usersRouting
  ],
  declarations: [UsersListComponent],
  exports: [UsersListComponent]
})
export class UsersModule {}
