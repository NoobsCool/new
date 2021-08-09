import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent implements OnInit {



  constructor(private dialogRef:MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)private data: any) {
  }

  ngOnInit(): void {
  }

  noClick(): void{
    this.dialogRef.close()
  }


}
