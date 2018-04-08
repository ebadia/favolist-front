import { Component, OnInit } from '@angular/core'
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { UsersService } from '@app/services/users/users.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { ConfirmDeleteDialogComponent } from '@app/shared/layouts/confirm-delete.dialog'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any[]
  filtro: string

  constructor(
    private _router: Router,
    private _service: UsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.RecuperaDatos()
  }

  private RecuperaDatos() {
    this._service.getAll().subscribe(
      res => {
        this.users = res
      },
      error => console.log('Error retrieving users')
    )
  }

  edit(user) {
    this._router.navigate(['favolist', 'users', 'edit', user.id])
  }

  delete(user) {
    console.log('DELETED CONFIRM', user)
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { pregunta: '¿Borrar de la lista?', confirm: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._service.delete(user.id).subscribe(res => {
          console.log('DELETED AVAILABLE', res)
          this.RecuperaDatos()
        })
      }
    })
  }

  new() {
    this._router.navigate(['favolist', 'users', 'edit'])
  }

  order(user) {
    //
    localStorage.setItem('current_client', user.id)
    this._router.navigate(['favolist', 'orders', 'new', user.id])
  }
}
