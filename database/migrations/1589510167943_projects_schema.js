'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectsSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.string('name', 80).notNullable()
      table.enu('scope', ['work', 'personal', 'study']).notNullable()
      table.text('description')
      table.date('initial_date')
      table.date('final_date')
      table.bool('active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectsSchema
