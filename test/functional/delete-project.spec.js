'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Delete Project')

const User = use('App/Models/User')
const Project = use('App/Models/Project')

trait('Test/ApiClient')
trait('Auth/Client')

test('make sure delete the project', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create()
  const project = await Factory.model('App/Models/Project').make()

  await user.projects().save(project)

  const response = await client.delete(`/projects/${project.id}`)
    .loginVia(user)
    .end()

  response.assertStatus(200)
  response.assertJSON({sucess: true})
})
