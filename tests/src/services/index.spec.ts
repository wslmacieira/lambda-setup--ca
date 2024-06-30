it('should returns name', () => {
  const person = {
    name: 'wagner',
    email: 'teste@mail.com',
    password: '123',
  }
  expect(person.name).toBe('wagner')
})
