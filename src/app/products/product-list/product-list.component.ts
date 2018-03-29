import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { ConfirmDeleteDialogComponent } from '@app/shared/layouts/confirm-delete.dialog'

import * as moment from 'moment'
import { ShopsService } from '@services/shops/shops.service'
import { AvailablesService } from '@services/availables/availables.service'
import { AvailablesSubject } from '@services/subjects/availables.subject'
import { MatSnackBar } from '@angular/material'
import { ProductsService } from '@app/services/products/products.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[]
  availables: any[]
  shop: string

  constructor(
    private _shops: ShopsService,
    private dialog: MatDialog,
    private _available: AvailablesService,
    private _availableSubject: AvailablesSubject,
    private snackBar: MatSnackBar,
    private _service: ProductsService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.shop = localStorage.getItem('admin_shop')
    this.getProducts()
    this.RecuperaDatos()
  }

  private getProducts() {
    const shop = localStorage.getItem('admin_shop')
    this._shops.getShopsProducts(+shop).subscribe(res => {
      console.log(res)
      this.products = res.products
    })
  }

  private RecuperaDatos() {
    this._available.getTodayFromShop(+this.shop).subscribe(
      res => {
        this.availables = res
      },
      error => {
        console.log('ERROR', error)
        const snackBarRef = this.snackBar.open(
          'Error al recuperar la lista de hoy',
          '',
          {
            duration: 3000
          }
        )
      }
    )
  }

  addAvailable(product) {
    console.log(product)
    const obj = {
      day: moment().format('YYYY-MM-DD'),
      stock: 0,
      product: {
        id: product.id
      }
    }
    this._available.add(obj).subscribe(
      res => {
        this._availableSubject.announceAvailable(true)
      },
      error => {
        console.log('ERROR', error)

        const snackBarRef = this.snackBar.open(
          'El producto ya está en la lista de hoy',
          '',
          {
            duration: 3000
          }
        )
      }
    )
  }

  delete(producto) {
    console.log('DELETED CONFIRM')
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { pregunta: 'Borrar el producto?', confirm: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(producto)
      }
    })
  }

  deleteProduct(producto) {
    this._service.delete(producto.id).subscribe(res => {
      console.log('DELETED PRODUCT', producto)
      this.getProducts()
    })
  }

  new() {
    this._router.navigate(['favolist', 'products', 'edit'])
  }

  edit(product: any) {
    this._router.navigate(['favolist', 'products', 'edit', product.id])
  }

  hoy() {
    this.products.forEach(product => {
      const isToday = product.days.find(day => {
        return day.code === +moment().format('e')
      })

      if (isToday) {
        this.addAvailable(product)
      }
    })
  }
}
