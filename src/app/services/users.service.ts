import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { TokenService } from './token.service'
import { environment } from '@environments/environment'
import { User } from '@models/user.model'
import { checkToken } from '@interceptors/token.interceptor'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private token: TokenService
  ) {}

  getUsers() {
    return this.http.get<User[]>(`${environment.API_URL}/users`, { context: checkToken() })
  }
}
