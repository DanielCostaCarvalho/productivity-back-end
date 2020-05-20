'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  activities() {
    return this.hasMany('App/Models/Activity')
  }

  owner() {
    return this.belongsTo('App/Models/User', 'user_id')
  }
}

module.exports = Project
