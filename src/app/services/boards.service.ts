import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { checkToken } from '@interceptors/token.interceptor'
import { Board } from '@models/board.model'
import { tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private apiUrl = `${environment.API_URL}/me/boards`

  constructor(private http: HttpClient) {}

  getBoards() {
    return this.http.get<Board[]>(this.apiUrl, { context: checkToken() })
  }
}
