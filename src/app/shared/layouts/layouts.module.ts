import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { MaterialModule } from '../material.module'

import { AuthLayoutComponent } from './auth-layout/auth-layout.component'
import { MainLayoutComponent } from './main-layout/main-layout.component'
import { NavigationModule } from './navigation/navigation.module'
import { ConfirmDeleteDialogComponent } from '@app/shared/layouts/confirm-delete.dialog'

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, NavigationModule],
  declarations: [
    AuthLayoutComponent,
    MainLayoutComponent,
    ConfirmDeleteDialogComponent
  ],
  entryComponents: [ConfirmDeleteDialogComponent],
  exports: [ConfirmDeleteDialogComponent]
})
export class LayoutsModule {}
