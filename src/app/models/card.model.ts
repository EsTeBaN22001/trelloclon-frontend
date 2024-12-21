import { List } from './list.model'

export interface Card {
  id: string
  title: string
  description?: string
  position: number
  listId: List['id']
}

export interface CreateCardDto extends Omit<Card, 'id'> {}

export interface UpdateCardDto {
  id?: string
  title?: string
  description?: string
  position?: number
  listId?: number
  boardId?: string
}
