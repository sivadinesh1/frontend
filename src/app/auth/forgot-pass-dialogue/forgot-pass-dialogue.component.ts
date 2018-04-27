import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmPasswordResetComponent } from './confirm-password-reset/confirm-password-reset.component';

@Component({
  selector: 'app-forgot-pass-dialogue',
  templateUrl: './forgot-pass-dialogue.component.html',
  styleUrls: ['./forgot-pass-dialogue.component.css', '../auth-style.component.css']
})
export class ForgotPassDialogueComponent implements OnInit {

  recoverauth: string;
  emailsent: boolean = false;
  responsemsg: any;
  apiresponse: any;

  recoverForm: FormGroup;

  profiles: string[] = ['Seeker', 'Provider', 'Expert', 'Industry', 'University'];

  constructor(private _authservice: AuthService, private _cdr: ChangeDetectorRef,
    private _router: Router, private _fb: FormBuilder, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  ngOnInit() {
    this.recoverForm =  this._fb.group({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'profile': new FormControl(null, Validators.required),
    }
  );
  }

  onSubmit() {
    let email = this.recoverForm.value.email;
    let profile = this.recoverForm.value.profile;

    this.emailsent = true;
    this._authservice.recoverPassforProfile(email, profile).subscribe(
      data => {
        this.apiresponse = data;
          if(this.apiresponse.message === 'EMAIL-NF') {
            this.responsemsg = "EMAIL not Found";
          } else if(this.apiresponse.message === 'ERROR') {
            this.responsemsg = "Oops! Something Went wrong. Contact Admin.";
          } else if(this.apiresponse.message === 'SUCCESS') {
        //    this.responsemsg = "Temporary Password is sent to your registered Email. Use 'Change Password' in settings option to reset password.";

           
              this.dialog.closeAll();
              
              this.dialog.open(ConfirmPasswordResetComponent, {
                width: '400px',
                data: 'Your password has been reset and an email has also been sent notifying you of the change.'
                
              });
            }

          
          this._cdr.markForCheck();
        
      } 
    );  

}

}
