import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup
  user: any

  constructor(
    private fb$: FormBuilder,
  ) { }

  ngOnInit() {
    this.user = Object.assign({})
    console.log(this.user)
    this.initForm( this.user )
  }

  private initForm( data ) {
    this.form = this.fb$.group({
      username: [ (data) ? data.username : '', Validators.compose([Validators.required])],
      password: [ (data) ? data.password : '', Validators.compose([Validators.required])],
      first_name: [ (data) ? data.first_name : ''],
      last_name: [ (data) ? data.last_name : ''],
      email: [ (data) ? data.email : '', Validators.compose([Validators.email, Validators.required])],
      mobile: [ (data) ? data.mobile : ''],
      phone: [ (data) ? data.phone : ''],
    })
  }

  getErrorMessage() {
  return this.form.get('username').hasError('required') ? 'You must enter a value' :
      this.form.get('username').hasError('username') ? 'Not a valid username' :
          '';
  }

  onSubmit( form ) {
    console.log( form )
  }

  checkUsername( form ) {
    console.log(form.value.username)
  }


}
