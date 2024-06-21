import Person from '@/index'

it('should returns name', () => {
  const person = new Person()
  expect(person.sayMyname()).toBe('Wagner')
})
