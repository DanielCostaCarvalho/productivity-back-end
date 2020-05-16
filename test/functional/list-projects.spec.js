'use strict'

const { test, trait } = use('Test/Suite')('List Projects')

const User = use('App/Models/User')
const Project = use('App/Models/Project')

trait('Test/ApiClient')
trait('Auth/Client')

test('make sure list all projects', async ({ assert, client }) => {
  const user = await User.create({ username: 'test4', password: '123456', email: 'fake4@mail' })

  const project = await Project.create({ user_id: user.id, name: 'test', description: 'test test', initial_date: '2020-01-01', final_date: '2020-01-01', scope: 'trabalho' })

  const response = await client.get('/projects')
    .loginVia(user)
    .end()

  response.assertStatus(200)

  assert.equal(response.body.data[0].name, project.name)
})
