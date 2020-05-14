'use strict'

const { test, trait } = use('Test/Suite')('Routes')

trait('Test/ApiClient')

test('make sure that route works', async ({ assert, client }) => {
  const response = await client.get('/').end()

  response.assertStatus(200)
  assert.equal(response.body.ok. true)
})
