'use strict'

const { test, trait } = use('Test/Suite')('Finish Interruption')
const Factory = use('Factory')

const User = use('App/Models/User')
const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')
const Interruption = use('App/Models/Interruption')

trait('Test/ApiClient')
trait('Auth/Client')

test('make sure set the final date of interruption when finish', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const project = await Factory.model('App/Models/Project').make()

  await user.projects().save(project)

  const activity = await Activity.create({ description: 'test', alert_date: '2020-01-01', initial_date: '2020-01-01', project_id: project.id, status: 'doing', user_id: user.id })

  await project.activities().save(activity)

  const interruption = await Interruption.create({ description: 'test', type: 'stop', project_id: project.id, user_id: user.id, activity_id: activity.id})

  const response = await client.put(`/projects/${project.id}/activities/${activity.id}/interruptions/${interruption.id}/finish`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.isNotNull(response.body.final_date)
})
