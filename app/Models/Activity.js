'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Activity extends Model {
  partOf() {
    return this.belongsTo('App/Models/Project', 'project_id')
  }

  activities() {
    return this.hasMany('App/Models/Activity')
  }
}

module.exports = Activity
