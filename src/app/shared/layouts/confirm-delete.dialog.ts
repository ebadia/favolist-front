import { Component, OnInit, Inject } from '@angular/core'
import * as moment from 'moment'
import { MatSnackBar } from '@angular/material'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: 'confirm-delete-dialog.html'
})
export class ConfirmDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
}
