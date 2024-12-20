import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '@environments/environment'
import { checkToken } from '@interceptors/token.interceptor'
import { Board } from '@models/board.model'
import { Card } from '@models/card.model'
import { Colors } from '@models/colors.model'
import { List } from '@models/list.model'
import { BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  private apiUrl = `${environment.API_URL}/boards`
  // Constante para la posición de las cards
  private readonly BUFFER_SPACE = 65535

  backgroundColor$ = new BehaviorSubject<Colors>('sky')

  constructor(private http: HttpClient) {}

  getBoard(id: Board['id']) {
    return this.http
      .get<Board>(`${this.apiUrl}/${id}`, { context: checkToken() })
      .pipe(tap(board => this.setBackgroundColor(board.backgroundColor)))
  }

  // Obtiene la posición en la que se encuentra una card dentro de la lista/columna
  getPosition(cards: Card[] | List[], currentIndex: number) {
    if (cards.length === 1) {
      return this.BUFFER_SPACE
    }

    // Card in the top
    if (cards.length > 1 && currentIndex === 0) {
      const firstItemPos = cards[1].position
      return firstItemPos / 2
    }

    const lastIndex = cards.length - 1

    // Card in the middle
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) {
      const prevItemPos = cards[currentIndex - 1].position
      const afterItemPos = cards[currentIndex + 1].position
      return (prevItemPos + afterItemPos) / 2
    }

    // Card in the bottom
    if (cards.length > 1 && currentIndex === lastIndex) {
      const lastItemPos = cards[lastIndex - 1].position
      return lastItemPos + this.BUFFER_SPACE
    }

    return 0
  }

  getPositionNewCard(cards: Card[] | List[]) {
    if (cards.length === 0) {
      return this.BUFFER_SPACE
    }
    const lastIndex = cards.length - 1
    const lastItemPos = cards[lastIndex].position
    return lastItemPos + this.BUFFER_SPACE
  }

  createBoard(title: string, backgroundColor: Colors) {
    return this.http.post<Board>(this.apiUrl, { title, backgroundColor }, { context: checkToken() })
  }

  setBackgroundColor(color: Colors) {
    this.backgroundColor$.next(color)
  }

  deleteBoard(id: Board['id']) {
    return this.http.delete(`${this.apiUrl}/${id}`, { context: checkToken() })
  }
}
