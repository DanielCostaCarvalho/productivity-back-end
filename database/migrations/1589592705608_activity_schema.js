'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivitySchema extends Schema {
  up() {
    this.create('activities', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.string('description', 100)
      table.datetime('initial_date')
      table.datetime('final_date')
      table.enu('status', ['to do','stopped' ,'doing', 'done']).notNullable().defaultTo('to do')
      table.timestamps()
    })
  }

  down() {
    this.drop('activities')
  }
}

module.exports = ActivitySchema
