import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResponseAutentication } from '../../interfaces/responseautentication.inteface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading: boolean = false;
  constructor(public formBuilder: FormBuilder, public auth: AuthService, private _snackBar: MatSnackBar,
    public router: Router) {
    this.registerForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ),
      password: new FormControl(
        '',
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

  signUp() {
    this.registerForm.disable();
    this.isLoading = true;
    this.auth.register(this.registerForm.getRawValue().email, this.registerForm.getRawValue().password)
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
