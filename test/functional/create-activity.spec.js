'use strict'

const { test, trait } = use('Test/Suite')('Create Activity')

const User = use('App/Models/User')
const Project = use('App/Models/Project')

trait('Test/ApiClient')
trait('Auth/Client')

test('make sure create an activity when valid arguments are provided', async ({ assert, client }) => {
  const user = await User.create({ username: 'test5', password: '123456', email: 'fake5@mail' })

  const project = await Project.create({ user_id: user.id, name: 'test', description: 'test test', initial_date: '2020-01-01', final_date: '2020-01-01', scope: 'work' })

  const activity = { description: 'test', initial_date: '2020-01-01', alert_date: '2020-01-01' }

  const response = await client.post(`/projects/${project.id}/activities`)
    .loginVia(user)
    .send(activity)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset(activity)
})
