'use strict'

const { test, trait } = use('Test/Suite')('Project')

const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

test('make sure can create a new project', async ({ client }) => {
  const user = await User.create({username: 'test3', password: '123456', email: 'fake3@mail'})

  const project = {name: 'test', description: 'test test', initial_date: '2020-01-01', final_date: '2020-01-01', scope: 'work' }
  const response = await client.post('/projects')
    .send(project)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset(project)
})

test('make sure cannot create a new project whithout a token', async ({ client }) => {
  const project = {name: 'test', description: 'test test', initial_date: '2020-01-01', final_date: '2020-01-01', scope: 'work' }
  const response = await client.post('/projects')
    .send(project)
    .end()

  response.assertStatus(401)
})

