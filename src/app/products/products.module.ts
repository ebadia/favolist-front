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
import { AddAvailableComponent } from './add-available/add-available.component'
import { ProductListDayComponent } from './product-list-day/product-list-day.component'
import { AvailableEditComponent } from './available-edit/available-edit.component'
import { ProductDefaultsComponent } from './product-defaults/product-defaults.component'
import { StockListComponent } from '@app/products/stock-list/stock-list.component'
import { StockDayComponent } from './stock-day/stock-day.component'

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
    ProductDashComponent,
    AddAvailableComponent,
    ProductListDayComponent,
    AvailableEditComponent,
    ProductDefaultsComponent,
    StockListComponent,
    StockDayComponent
  ],
  exports: [
    ProductsComponent,
    ProductListComponent,
    ProductEditComponent,
    AvailableListComponent,
    StockListComponent,
    StockDayComponent
  ]
})
export class ProductsModule {}
