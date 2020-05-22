'use strict'

const { test, trait } = use('Test/Suite')('Delete Interruption')
const Factory = use('Factory')

const User = use('App/Models/User')
const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

trait('Test/ApiClient')
trait('Auth/Client')

test('make sure delete the activity', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const project = await Factory.model('App/Models/Project').make()

  await user.projects().save(project)

  const activity = await Activity.create({ description: 'test', alert_date: '2020-01-01', initial_date: '2020-01-01', project_id: project.id, status: 'doing', user_id: user.id })

  await project.activities().save(activity)

  const response = await client.delete(`/projects/${project.id}/activities/${activity.id}`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  response.assertJSON({ sucess: true })
})
