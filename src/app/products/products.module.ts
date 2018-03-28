import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '@shared/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { productsRouting } from './products.routing'
import { ProductsComponent } from './products.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductEditComponent } from './product-edit/product-edit.component'
import { AvailableListComponent } from './available-list/available-list.component'
import { ProductDashComponent } from './product-dash/product-dash.component'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    productsRouting
  ],
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductEditComponent,
    AvailableListComponent,
    ProductDashComponent
  ],
  exports: [
    ProductsComponent,
    ProductListComponent,
    ProductEditComponent,
    AvailableListComponent
  ]
})
export class ProductsModule {}
