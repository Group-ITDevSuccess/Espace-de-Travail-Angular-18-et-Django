import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_LINK, LOGIN_USER_API } from '../components/environement';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthsService {
  private http = inject(HttpClient);

  loginUser = (user: User) => this.http.post<User>(`${API_LINK}/${LOGIN_USER_API}`, user);
}
