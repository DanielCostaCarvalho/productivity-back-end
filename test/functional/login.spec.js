'use strict'

const { test, trait } = use('Test/Suite')('Login')

trait('Test/ApiClient')

test('make sure that a valid user can log in', async ({ assert, client }) => {
  const user = {username: 'test2', password: '123456', email: 'fake2@mail'}
  await client.post('/users').send(user).end()

  const response = await client.post('/login').send(user).end()

  response.assertStatus(200)
  assert.exists(response.body.token)
})

test('make sure that do not create a user when duplicated arguments are provided', async ({ client }) => {
  const user = {username: 'invalid name', password: '123456', email: 'invalid@mail'}
  const response = await client.post('/login').send(user).end()

  response.assertStatus(401)
})

