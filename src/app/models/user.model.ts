export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export interface changeUserinfoDto {
  email: User['email']
  newName?: User['name']
  newEmail?: User['email']
}
