'use strict'

const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

class AllActivitiesController {
  async index({ auth, request }) {
    const { page } = request.get() || 1

    const user = await auth.getUser()

    const data = await Activity.query()
      .where('user_id', user.id)
      .andWhere(function() {
        this.whereNull('final_date')
      })
      .andWhere(function() {
        this.whereNot({ status: 'done' })
      })
      .orderBy('alert_date')
      .paginate(page)

    return data
  }
}

module.exports = AllActivitiesController
