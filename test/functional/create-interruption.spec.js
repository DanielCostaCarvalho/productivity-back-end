'use strict'

const { test, trait } = use('Test/Suite')('Create Interruption')
const Factory = use('Factory')

const User = use('App/Models/User')
const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

trait('Test/ApiClient')
trait('Auth/Client')

test('make sure create an interruption when valid arguments are provided', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const project = await Factory.model('App/Models/Project').make()

  await user.projects().save(project)

  const activity = await Activity.create({ description: 'test', alert_date: '2020-01-01', initial_date: '2020-01-01', project_id: project.id, status: 'doing', user_id: user.id })

  await project.activities().save(activity)

  const interruption = { description: 'test', type: 'stop'}

  const response = await client.post(`/projects/${project.id}/activities/${activity.id}/interruptions`)
    .loginVia(user)
    .send(interruption)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset(interruption)
})
