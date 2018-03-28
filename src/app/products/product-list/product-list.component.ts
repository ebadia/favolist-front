import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { ShopsService } from '@services/shops/shops.service'
import { AvailablesService } from '@services/availables/availables.service'
import { AvailablesSubject } from '@services/subjects/availables.subject'
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[]

  constructor(
    private _shops: ShopsService,
    private _available: AvailablesService,
    private _availableSubject: AvailablesSubject,
    private snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit() {
    const shop = localStorage.getItem('admin_shop')
    this._shops.getShopsProducts(+shop).subscribe(res => {
      console.log(res)
      this.products = res.products
    })
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

  edit(product: any) {
    this._router.navigate(['favolist', 'products', 'edit', product.id])
  }
}
