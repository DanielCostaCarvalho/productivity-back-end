'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    password: faker.string(),
    email: faker.email()
  }
})

Factory.blueprint('App/Models/Activity', (faker) => {
  return {
    description: faker.string(),
    alert_date: new Date(new Date().getDate() + 1)
  }
})

Factory.blueprint('App/Models/Project', (faker) => {
  return {
    name: faker.string(),
    description: faker.string(),
    initial_date: new Date(new Date().getDate() + 1),
    scope: 'work'
  }
})

