import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseAutentication } from '../../../modules/auth/interfaces/responseautentication.inteface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public sessionStatus = new BehaviorSubject(false);

  constructor(public httpClient: HttpClient, public router: Router) { }

  login(email: string, password: string): Promise<ResponseAutentication> {
    return new Promise((resolve, reject) => {
      this.httpClient.post<any>(`${environment.API_URL}/users/login`, { email, password }).subscribe(res => {
        resolve(res);
      }
        , err => {
          reject(err);
        })
    })
  }

  register(email: string, password: string): Promise<ResponseAutentication> {
    return new Promise((resolve, reject) => {
      this.httpClient.post<any>(`${environment.API_URL}/users/register`, { email, password }).subscribe(res => {
        resolve(res);
      }
        , err => {
          reject(err);
        })
    })
  }

  setStatusLogin(status: boolean) {
    this.sessionStatus.next(status);
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  isLoggedInObservable(): BehaviorSubject<boolean> {
    return this.sessionStatus;
  }

  isLoggedIn(): boolean {
    return this.sessionStatus.value;
  }

}
