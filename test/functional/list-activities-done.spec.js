'use strict'

const { test, trait } = use('Test/Suite')('List Activities')

const User = use('App/Models/User')
const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

trait('Test/ApiClient')
trait('Auth/Client')

test('make sure return activities done from a project', async ({ assert, client }) => {
  const user = await User.create({ username: 'test10', password: '123456', email: 'fake10@mail' })

  const project = await Project.create({ user_id: user.id, name: 'test', description: 'test test', initial_date: '2020-01-01', final_date: '2020-01-01', scope: 'work' })

  const activity = await Activity.create({ description: 'test', alert_date: '2020-01-01', initial_date: '2020-01-01', final_date: '2020-01-01', project_id: project.id, status: 'done', user_id: user.id })

  const response = await client.get(`/projects/${project.id}/activities/done`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(response.body.data[0].id, activity.id)
})
