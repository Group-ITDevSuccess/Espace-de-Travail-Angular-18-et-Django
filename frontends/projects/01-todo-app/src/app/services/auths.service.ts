import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { LOGIN_USER_API, LOGOUT_USER_API, SIGNIN_USER_API } from '../components/environement';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthsService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', '*/*');

  loginUser = (user: User) => this.http.post<User>(`${LOGIN_USER_API}`, user);
  signinUser = (user: User) => this.http.post<User>(`${SIGNIN_USER_API}`, user);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getToken = () => {
    if (this.isBrowser()) {
      return localStorage.getItem('access_token');
    }
    return null;
  };

  setToken = (value: string) => {
    if (this.isBrowser()) {
      localStorage.setItem('access_token', value);
    }
  };

  removeToken = () => {
    if (this.isBrowser()) {
      localStorage.removeItem('access_token');
    }
  };

  get isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logoutUser = () => {
    if (this.getToken() != null) {
      this.headers = this.headers.set('Authorization', `Token ${this.getToken()}`);
      this.http.post<User>(
        `${LOGOUT_USER_API}`,
        {},
        {
          headers: this.headers,
        }
      ).subscribe();
      if (this.removeToken() == null) {
        this.router.navigate(['/accounts/login']);
      }
    }
  };

  userToken = () => {};
}
