import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { checkToken } from '@interceptors/token.interceptor'
import { createListDto, List } from '@models/list.model'

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private readonly apiUrl = `${environment.API_URL}/lists`

  constructor(private http: HttpClient) {}

  create(dto: createListDto) {
    return this.http.post<List>(this.apiUrl, dto, { context: checkToken() })
  }
}
