import Person from '.'

it('should returns name', () => {
  const person = new Person()
  expect(person.sayMyname()).toBe('Wagner')
})
