import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            console.log('false');
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }
}


// const form = new FormGroup({
//     password: new FormControl('', Validators.minLength(2)),
//     passwordConfirm: new FormControl('', Validators.minLength(2)),
//   }, passwordMatchValidator);
  
//   function passwordMatchValidator(g: FormGroup) {
//      return g.get('password').value === g.get('passwordConfirm').value
//         ? null : {'mismatch': true};
//   }