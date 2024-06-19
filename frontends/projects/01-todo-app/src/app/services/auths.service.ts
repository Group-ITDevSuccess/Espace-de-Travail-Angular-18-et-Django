import { LOGOUT_USER_API } from './../components/environement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LOGIN_USER_API } from '../components/environement';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthsService {
  private http = inject(HttpClient);
  private router = inject(Router);
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', '*/*');
  

  loginUser = (user: User) => this.http.post<User>(`${LOGIN_USER_API}`, user);
  getToken = () => localStorage.getItem('access_token');
  setToken = (value: string) => localStorage.setItem('access_token', value);
  removeToken = () => localStorage.removeItem('access_token');

  get isLoggedIn(): boolean {
    return this.getToken() !== null ? true : false;
  }

  logoutUser = () => {
    if (this.getToken != null) {
      this.headers.set('Authorization', `Token ${this.getToken()}`);
      this.http.post<User>(
        `${LOGOUT_USER_API}`,
        {},
        {
          headers: this.headers,
        }
      );
      if (this.removeToken() == null) {
        this.router.navigate(['/accounts/login']);
      }
    }
  };

  userToken = () => {};
}
