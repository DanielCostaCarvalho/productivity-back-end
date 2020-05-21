'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActivitySchema extends Schema {
  up() {
    this.create('activities', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.string('description', 100).notNullable()
      table.datetime('initial_date')
      table.datetime('final_date')
      table.datetime('alert_date').notNullable()
      table.enu('status', ['to do','stopped', 'paused' ,'doing', 'done']).notNullable().defaultTo('to do')
      table.enu('priority', ['low','medium','high']).notNullable().defaultTo('low')
      table.timestamps()
    })
  }

  down() {
    this.drop('activities')
  }
}

module.exports = ActivitySchema
