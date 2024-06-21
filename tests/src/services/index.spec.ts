import Person from '@/main'

it('should returns name', () => {
  const person = new Person({
    name: 'wagner',
    email: 'teste@mail.com',
    password: '123',
  })
  expect(person.sayMyname()).toBe('Wagner')
})
