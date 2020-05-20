'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Interruption extends Model {
  activity() {
    return this.belongsTo('App/Models/Activity', 'activity_id')
  }
}

module.exports = Interruption
