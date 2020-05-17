'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivitySchema extends Schema {
  up() {
    this.create('activities', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.string('description', 100).notNullable()
      table.datetime('initial_date').notNullable().defaultTo(new Date())
      table.datetime('final_date').notNullable()
      table.datetime('alert_date').notNullable()
      table.enu('status', ['to do','stopped' ,'doing', 'done']).notNullable().defaultTo('to do')
      table.enu('priority', ['low','medium','high']).notNullable().defaultTo('low')
      table.timestamps()
    })
  }

  down() {
    this.drop('activities')
  }
}

module.exports = ActivitySchema
