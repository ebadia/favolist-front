import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NavigationComponent } from './navigation.component'
import { MaterialModule } from '../../material.module'

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent]
})
export class NavigationModule {}
