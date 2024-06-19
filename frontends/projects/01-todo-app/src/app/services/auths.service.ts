import { LOGOUT_USER_API } from './../components/environement';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_LINK, LOGIN_USER_API } from '../components/environement';
import { User } from '../models/User';
import { Router } from 'express';

@Injectable({
  providedIn: 'root',
})
export class AuthsService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  getToken = () => localStorage.getItem('access_token');

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  logoutUser = (user: User) => {
    let removeToken = localStorage.removeItem('access_token');
    this.http.post<User>(`${API_LINK}/${LOGOUT_USER_API}`, user, {
      headers: this.headers.set('Authorization', `Token ${this.getToken}`),
    });
    if (removeToken == null) {
      this.router.navigate(['/accounts/login']);
    }
  };

  loginUser = (user: User) =>
    this.http.post<User>(`${API_LINK}/${LOGIN_USER_API}`, user);
}
