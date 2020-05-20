'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InterruptionSchema extends Schema {
  up () {
    this.create('interruptions', (table) => {
      table.integer('project_id').unsigned().references('id').inTable('projects').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('activity_id').unsigned().references('id').inTable('activities').notNullable()
      table.text('description').notNullable()
      table.date('initial_date').notNullable()
      table.date('final_date')
      table.enu('type', ['stop','pause']).notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('interruptions')
  }
}

module.exports = InterruptionSchema
