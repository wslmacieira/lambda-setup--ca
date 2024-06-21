import { randomUUID } from 'node:crypto'

export class User {
  public id?: string
  public name: string
  public email: string
  public password: string

  constructor(user: typeof User.prototype) {
    if (!user.id) {
      user.id = randomUUID()
    }
    Object.assign(this, user)
  }
}
