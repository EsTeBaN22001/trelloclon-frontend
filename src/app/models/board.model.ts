import { Card } from './card.model'
import { Colors } from './colors.model'
import { List } from './list.model'

export interface Board {
  id: string
  title: string
  backgroundColor: Colors
  creationAt: string
  updatedAt: string
  members: Member[]
  lists: List[]
  cards: Card[]
}

interface Member {
  id: number
  name: string
  email: string
  avatar: string
  creationAt: string
  updatedAt: string
}
