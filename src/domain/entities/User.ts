import { randomUUID } from 'node:crypto'

export type UserSchema = typeof User.prototype

export class User {
  public id?: string
  public name: string
  public email: string
  public password: string

  constructor(user: UserSchema) {
    if (!user.id) {
      user.id = randomUUID()
    }
    Object.assign(this, user)
  }
}
