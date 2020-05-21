'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Interruption')

const User = use('App/Models/User')
const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

trait('Test/ApiClient')
trait('Auth/Client')

test('make sure return all activities not done', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const project = await Factory.model('App/Models/Project').make()

  await user.projects().save(project)

  const activity = await Activity.create({ description: 'test', alert_date: '2020-01-01', initial_date: '2020-01-01', project_id: project.id, status: 'doing', user_id: user.id })

  await project.activities().save(activity)

  const interruption = {user_id: user.id, project_id: project.id, description: 'test', initial_date:new Date(), activity_id: activity.id, type: 'stop'}

  const created_interruption = await activity.interruptions().create(interruption)

  const response = await client.get(`/projects/${project.id}/interruptions`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(response.body.data[0].id, created_interruption.id)
})
