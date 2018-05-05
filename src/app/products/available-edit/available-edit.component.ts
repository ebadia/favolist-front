import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { AvailablesEditSubject } from '@services/subjects/availables-edit.subject'
import { ActivatedRoute } from '@angular/router'
import { AvailablesService } from '@services/availables/availables.service'
import { ConfirmDeleteDialogComponent } from '@shared/layouts/confirm-delete.dialog'
import { MatDialog } from '@angular/material'
import { AvailablesSubject } from '@services/subjects/availables.subject'

@Component({
  selector: 'app-available-edit',
  templateUrl: './available-edit.component.html',
  styleUrls: ['./available-edit.component.css']
})
export class AvailableEditComponent implements OnInit {
  editing = false
  product: any
  form: FormGroup

  constructor(
    private _availableEditSubject: AvailablesEditSubject,
    private _availableSubject: AvailablesSubject,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _service: AvailablesService,
    private dialog: MatDialog,
  ) {
    this._availableEditSubject.availableEditAnnounced$.subscribe(
      res => {
        this.editing = res
        this.product = JSON.parse( localStorage.getItem('edit-available') )
        this.initForm()
      }
    )
  }

  ngOnInit() {
    this.product = JSON.parse( localStorage.getItem('edit-available') )
    this.initForm()
  }

  private initForm() {
    // init form with data from api (EDIT) or empty (NEW)
    const data = this.product
    this.form = this._fb.group({
      name: [data ? data.name : '', Validators.required],
      price: [ data ?
        ( data.availablePrice ? data.availablePrice : data.price )
        : 0],
      availableStock: [data ? data.availableStock : 0],
      availableStockOut: [data ? data.availableStockOut : 0],
      shopId: [data ? data.shopId : 0],
      id: [data ? data.id : 0],
    })
    // console.log('FORM DATA >>> ', this.form)
  }

  eliminar() {
    console.log('DELETED CONFIRM')
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { pregunta: 'Borrar el producto?', confirm: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct()
      }
    })
  }

  deleteProduct() {
    this._service.delete(this.product.availableId).subscribe(res => {
      console.log('DELETED PRODUCT', this.product)
      this._availableSubject.announceAvailable(true)
      this.cancel()
    })
  }

  save() {
    // save available product
    console.log('AVAILABLE SAVE', this.form.value )
    const obj = {
      stock: this.form.value.stock,
      stockOut: this.form.value.stockOut,
      price: this.form.value.price,
    }
    this._service.update( this.product.availableId, obj).subscribe(
      res => {
        this._availableSubject.announceAvailable(true)
        this.cancel()
      }
    )
  }

  cancel() {
    localStorage.setItem('edit-available', null)
    this._availableEditSubject.announceEditAvailable(false)

  }
}
