'use strict'

const { test, trait } = use('Test/Suite')('User')

trait('Test/ApiClient')

test('make sure that create a user when valid arguments are provided', async ({ client }) => {
  const user = {username: 'test', password: '123456', email: 'fake@mail'}
  const response = await client.post('/users').send(user).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    username: user.username,
    email: user.email
  })
})

test('make sure that do not create a user when duplicated arguments are provided', async ({ client }) => {
  const user = {username: 'test', password: '123456', email: 'fake@mail'}
  await client.post('/users').send(user).end()
  const response = await client.post('/users').send(user).end()

  response.assertStatus(500)
})
