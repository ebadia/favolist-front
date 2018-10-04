import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { ProductsService } from '@services/products/products.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: any
  isNew = false
  form: FormGroup
  id: number
  shop: string
  days: any[]
  checked: any[] = [false, false, false, false, false, false, false]

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _service: ProductsService
  ) {}

  ngOnInit() {
    this.shop = localStorage.getItem('admin_shop')

    // this._service.getAllDays().subscribe(res => (this.days = res))

    this._route.params.subscribe(params => {
      this.id = params['id']
      if (this.id) {
        this.RecuperaDatos()
      } else {
        this.isNew = true
        this.product = {}
        this.initForm()
      }
    })
  }

  RecuperaDatos() {
    this._service.getOne(+this.id).subscribe(res => {
      this.product = res
      _.forEach(res.days, day => (this.checked[day.code] = true))
      this.initForm()
    })
  }

  private initForm() {
    // init form with data from api (EDIT) or empty (NEW)
    const data = this.product
    this.form = this._fb.group({
      name: [data ? data.name : '', Validators.required],
      price: [data ? data.price : ''],
      stock: [data ? data.stock : 0],
      stockOut: [data ? data.stockOut : 0],
      description: [data ? data.description : ''],
      image: [data ? data.image : ''],
      shopId: [data ? data.shopId : '', Validators.required],
      file: [null]
    })
    // console.log('FORM DATA >>> ', this.form)
  }

  upload(event) {
    console.log('event :', event)
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0]
      const formData: FormData = new FormData()
      // formData.append(event.target.id, file, file.name);
      formData.append('file', file, file.name)

      console.log('DOCUMENT FORMDATA', formData)
      this._service.upload(this.id, formData).subscribe(
        data => {
          this.product = data
        },
        error => {}
      )
    }
    // form.clear()
  }

  onSubmit() {
    //
    console.log(this.form.value)
    if (this.isNew) {
      const obj = {
        name: this.form.value.name,
        price: this.form.value.price,
        description: this.form.value.description,
        image: this.form.value.image,
        shop: {
          id: localStorage.getItem('admin_shop')
        }
      }

      this._service.add(this.id, obj).subscribe(res => {
        this.RecuperaDatos()
        // for (let i = 0; i < this.checked.length; i++) {
        //   this._service
        //     .updateDay(res.id, i + 1, this.checked[i])
        //     .subscribe(days => {
        //       console.log(days)
        //       this.RecuperaDatos()
        //     })
        // }
      })
    } else {
      this._service.update(this.id, this.form.value).subscribe(res => {
        this.RecuperaDatos()
        // for (let i = 0; i < this.checked.length; i++) {
        //   this._service
        //     .updateDay(this.id, i + 1, this.checked[i])
        //     .subscribe(days => {
        //       console.log(days)
        //       this.RecuperaDatos()
        //     })
        // }
      })
      console.log(this.checked)
    }
  }
}
