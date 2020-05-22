'use strict'

const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

class AllActivitiesController {
  async index({ auth, request }) {
    const { page } = request.get() || 1

    const user = await auth.getUser()

    const data = await Activity.query()
      .select('activities.*', 'projects.name as project')
      .where('activities.user_id', user.id)
      .andWhere(function() {
        this.whereNull('activities.final_date')
      })
      .andWhere(function() {
        this.whereNot({ status: 'done' })
      })
      .leftJoin('projects', 'projects.id', 'activities.project_id')
      .orderBy('alert_date')
      .paginate(page)

    return data
  }
}

module.exports = AllActivitiesController
