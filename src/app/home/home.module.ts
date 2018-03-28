import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { OrdersModule } from './../orders/orders.module'
import { homeRouting } from './home.routing'
import { MaterialModule } from '../shared/material.module'
import { ProductsModule } from '../products/products.module'
import { ListComponent } from './list/list.component'

@NgModule({
  imports: [CommonModule, MaterialModule, homeRouting],
  declarations: [HomeComponent, ListComponent]
})
export class HomeModule {}
