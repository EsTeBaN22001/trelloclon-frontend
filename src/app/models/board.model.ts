import { Colors } from './colors.model'

export interface Board {
  id: number
  title: string
  backgroundColor: Colors
  creationAt: string
  updatedAt: string
  members: Member[]
}

interface Member {
  id: number
  name: string
  email: string
  avatar: string
  creationAt: string
  updatedAt: string
}
