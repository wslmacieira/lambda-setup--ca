import { User } from './domain/entities/User'

class Person extends User {
  sayMyname() {
    return 'Wagner'
  }
}

export default Person
