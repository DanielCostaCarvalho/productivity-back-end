'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Activity extends Model {
  interruptions() {
    return this.hasMany('App/Models/Interruption')
  }

  partOf() {
    return this.belongsTo('App/Models/Project', 'project_id')
  }

  owner() {
    return this.belongsTo('App/Models/User', 'user_id')
  }
}

module.exports = Activity
