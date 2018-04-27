import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.css']
})
export class ConfirmPasswordResetComponent implements OnInit {

  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: string,) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
