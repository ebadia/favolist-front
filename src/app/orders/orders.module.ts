import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '../shared/material.module'
import { ordersRouting } from '@app/orders/orders.routing'
import { OrdersComponent } from './orders.component'
import { OrdersListComponent } from './orders-list/orders-list.component'
import { FormsModule } from '@angular/forms'
import { OrdersNewComponent } from './orders-new/orders-new.component'
import { ProductsModule } from '@app/products/products.module'
import { OrderComponent } from './order/order.component'
import { CartComponent } from './cart/cart.component'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ordersRouting,
    ProductsModule
  ],
  declarations: [
    OrdersComponent,
    OrdersListComponent,
    OrdersNewComponent,
    OrderComponent,
    CartComponent,
  ],
  exports: [OrdersListComponent]
})
export class OrdersModule {}
