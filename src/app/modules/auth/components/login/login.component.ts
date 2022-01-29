import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResponseAutentication } from '../../interfaces/responseautentication.inteface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
   isLoading: boolean = false;
  constructor( public formBuilder: FormBuilder, public auth: AuthService, private _snackBar: MatSnackBar,
    public router: Router) {
    this.loginForm =  this.buildForm() ;
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl(
        { value: '', disabled: false },
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ),
      password: new FormControl(
        { value: '', disabled: false },
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ])
      ),
    });
  }

  ngOnInit(): void {

  }

  login() {
    this.loginForm.disable();
    this.isLoading = true;
    this.auth.login(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password)
      .then((res: ResponseAutentication) => {
        const { token } = res;
        this.isLoading = false;
        this.auth.setStatusLogin(true);
        this.auth.setToken(token);
        this.router.navigate(['/campaign']);
      })
      .catch((err) => {
        this.isLoading = false;
        this.openSnackBar(err.error?.message || err.error, 'Cerrar');
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
