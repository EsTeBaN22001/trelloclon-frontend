import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AvailabilityResponse } from '@models/request-status.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/auth/login`, {
      email,
      password,
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${environment.API_URL}/auth/register`, {
      name,
      email,
      password,
    });
  }

  isAvailable(email: string) {
    return this.http.post<AvailabilityResponse>(
      `${environment.API_URL}/auth/is-available`,
      { email },
    );
  }

  recovery(email: string) {
    return this.http.post<{ recoveryToken: string; link: string }>(
      `${environment.API_URL}/auth/recovery`,
      { email },
    );
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${environment.API_URL}/auth/change-password`, {
      token,
      newPassword,
    });
  }
}
