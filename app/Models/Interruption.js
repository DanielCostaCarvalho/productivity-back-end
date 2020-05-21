'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Interruption extends Model {
  activity() {
    return this.belongsTo('App/Models/Activity', 'activity_id')
  }

  partOf() {
    return this.belongsTo('App/Models/Project', 'project_id')
  }

  owner() {
    return this.belongsTo('App/Models/User', 'user_id')
  }
}

module.exports = Interruption
