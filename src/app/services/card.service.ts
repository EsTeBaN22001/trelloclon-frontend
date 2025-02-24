import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { checkToken } from '@interceptors/token.interceptor'
import { Card, CreateCardDto, UpdateCardDto } from '@models/card.model'

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = `${environment.API_URL}/cards`

  constructor(private http: HttpClient) {}

  // Crea una nueva card
  create(dto: CreateCardDto) {
    return this.http.post<Card>(this.apiUrl, dto, { context: checkToken() })
  }

  // Actualiza la posición de la card
  updateCard(dto: UpdateCardDto) {
    return this.http.patch(`${this.apiUrl}/${dto.id}`, dto, { context: checkToken() })
  }

  // Elimina una card
  delete(id: Card['id']) {
    return this.http.delete(`${this.apiUrl}/${id}`, { context: checkToken() })
  }
}
