import { Component, OnInit } from '@angular/core'

import { AccountsService } from '@services/accounts/accounts.service'
import { ConfirmDeleteDialogComponent } from '@shared/layouts/confirm-delete.dialog'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private _auth: AccountsService, private dialog: MatDialog) {}

  ngOnInit() {}

  salir() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '350px',
      data: { pregunta: '¿Estas seguro de desconectarte de la tienda?', confirm: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._auth.logout()
      }
    })

  }
}
