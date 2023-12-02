import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { checkToken } from '@interceptors/token.interceptor'
import { Card, UpdateCardDto } from '@models/card.model'

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = `${environment.API_URL}/cards`

  constructor(private http: HttpClient) {}

  // Actualiza la posición de la card
  updateCard(id: Card['id'], changes: UpdateCardDto) {
    return this.http.put(`${this.apiUrl}/${id}`, changes, { context: checkToken() })
  }
}
