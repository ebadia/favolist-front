import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { AccountsService } from '../../services/accounts/accounts.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  user: any
  msg: string

  constructor(
    private router$: Router,
    private fb$: FormBuilder,
    private accounts$: AccountsService
  ) {}

  ngOnInit() {
    this.user = Object.assign({})
    console.log(this.user)
    this.initForm(this.user)
  }

  private initForm(data) {
    this.form = this.fb$.group({
      username: [
        data ? data.username : '',
        Validators.compose([Validators.required])
      ],
      password: [
        data ? data.password : '',
        Validators.compose([Validators.required])
      ]
    })
  }

  getErrorMessage() {
    return this.form.get('username').hasError('required')
      ? 'You must enter a value'
      : this.form.get('username').hasError('username')
        ? 'Not a valid username'
        : ''
  }

  onSubmit(form) {
    this.accounts$.login(form.value.username, form.value.password).subscribe(
      res => {
        localStorage.setItem('auth_token', res.headers.get('Authorization'))
        localStorage.setItem('user', JSON.stringify(res.body))
        localStorage.setItem('roles', JSON.stringify(res.body.roles))

        if (res.status === 200) {
          console.log('go home', res.body.id)
          this.accounts$.getUserAdminShops(res.body.id).subscribe(
            user => {
              console.log('user-shop', user)
              if (user.shop) {
                localStorage.setItem('admin_shop', user.shop.id || '')
                this.router$.navigate(['favolist', 'home', 'main'])
              } else {
                this.msg = 'Aplicación reservada para gestores de tienda'
                this.router$.navigate(['login'])
              }
            },
            error => console.log('Error in service', error)
          )
        } else {
          this.router$.navigate(['login'])
        }
      },
      error => {
        this.router$.navigate(['login'])
      }
    )
  }
}
