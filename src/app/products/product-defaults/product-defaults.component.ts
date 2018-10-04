import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { ProductsService } from '@services/products/products.service'
import * as _ from 'lodash'
import { MatSnackBar } from '@angular/material'

const days = [
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
  'domingo'
]

@Component({
  selector: 'app-product-defaults',
  templateUrl: './product-defaults.component.html',
  styleUrls: ['./product-defaults.component.css']
})
export class ProductDefaultsComponent implements OnChanges {
  @Input()
  product: any
  days: any[]
  checked: any[] = [{}, {}, {}, {}, {}, {}, {}]
  form: FormGroup

  constructor(
    private _service: ProductsService,
    private snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {}

  ngOnChanges() {
    // inicializa los dias de la semana
    for (let i = 0; i < this.checked.length; i++) {
      this.checked[i] = {
        code: i,
        name: days[i],
        stock: 0,
        stockOut: 0
      }
    }

    //
    // this._service.getAllDays().subscribe(res => (this.days = res))
    if (this.product) {
      console.log('PRODUCT', this.product)
      _.forEach(this.product.days, day => {
        this.checked[day.code].stock = day.stock
        this.checked[day.code].stockOut = day.stockOut
      })
    }
  }

  updateStock(item: number) {
    if (+this.checked[item].stock >= +this.checked[item].stockOut) {
      // guardalo en la bbdd
      const obj = {
        ...this.checked[item],
        stock: +this.checked[item].stock,
        stockOut: +this.checked[item].stockOut
      }
      console.log('update stock', obj)
      this._service.addDay(this.product.id, obj).subscribe(res => {
        const snackBarRef = this.snackBar.open('Producto actualizado', '', {
          duration: 1000
        })
      })
    } else {
      const snackBarRef = this.snackBar.open(
        'El stock para pedidos no puede ser mayor que el total',
        '',
        {
          duration: 3000
        }
      )
      this.checked[item].stockOut = 0
    }
  }
}
