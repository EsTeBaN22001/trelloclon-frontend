import { Card } from './card.model'

export interface List {
  id: string
  title: string
  position: number
  cards: Card[]
  showNewCardForm?: boolean
  showEditTitleForm?: boolean
}

export interface createListDto extends Omit<List, 'id' | 'cards'> {
  boardId: string
}

export interface updateListDto {
  id?: string
  title?: string
  position?: number
  cards?: Card[]
}
