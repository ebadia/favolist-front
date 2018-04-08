import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import * as _ from 'lodash'

import { UsersService } from '@services/users/users.service'

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  user: any
  isNew = false
  form: FormGroup
  id: number
  shop: string

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _service: UsersService
  ) {}

  ngOnInit() {
    this.shop = localStorage.getItem('admin_shop')

    this._route.params.subscribe(params => {
      this.id = params['id']
      if (this.id) {
        this.RecuperaDatos()
      } else {
        this.isNew = true
        this.user = {}
        this.initForm()
      }
    })
  }

  RecuperaDatos() {
    this._service.getOne(+this.id).subscribe(res => {
      this.user = res
      this.initForm()
    })
  }

  private initForm() {
    // init form with data from api (EDIT) or empty (NEW)
    const data = this.user
    this.form = this._fb.group({
      username: [data ? data.username : ''],
      first_name: [data ? data.first_name : '', Validators.required],
      last_name: [data ? data.last_name : '', Validators.required],
      email: [data ? data.email : '', Validators.required],
      mobile: [data ? data.mobile : '', Validators.required],
      shopId: [this.shop ? this.shop : '', Validators.required]
    })
    // console.log('FORM DATA >>> ', this.form)
  }

  onSubmit() {
    if (this.form.dirty && this.form.valid) {
      console.log('ALL', this.form.value)
      const obj = _.omit(this.form.value, ['shopId'])
      if ( _.isNull(this.form.value.username) || this.form.value.username === '' ) {
        const uname = this.form.value.email.split('@')[0]
        obj.username = uname
        console.log('UNAME', uname)
      }
      console.log('USER', obj)
      if (this.isNew) {
        const password = this.randomPassword(8)
        obj.password = password
        this._service.create(obj).subscribe(
          res => {
            console.log('User created')
            // add user to shop
            this._service
              .addUserToShop(res.id, { id: +this.form.value.shopId })
              .subscribe(cliente => {
                console.log('Cliente añadido a la tienda', cliente)
                // add user buyer role = 2
                this._service.addUserToRole(res.id, { id: 2 } ).subscribe(
                  role => this._router.navigate(['favolist', 'users', 'list']),
                  () => ( this.deleteUser(res.id) )
                )
              },
                () => ( this.deleteUser(res.id) )
          )
          },
          error => console.log('No he podido crear el nuevo cliente', error)
        )
      } else {
        this._service.update(this.id, obj).subscribe(
          res => {
            console.log('User updated', res)
            // add user to shop
          },
          error => console.log('No he podido actualizar el cliente', error)
        )
      }
    }
  }

  private deleteUser( id: number ) {
    this._service.delete(id).subscribe(res => {
      console.log('Anulado nuevo cliente', res)
    })
  }

  randomPassword(length) {
    const chars =
      'abcdefghijklmnopqrstuvwxyz!@#$%&*ABCDEFGHIJKLMNOP1234567890'
    let pass = ''
    for (let x = 0; x < length; x++) {
      const i = Math.floor(Math.random() * chars.length)
      pass += chars.charAt(i)
    }
    return pass
  }
}
