'use strict'

const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

class ActivityToDoController {
  async index({ params, auth, response, request }) {
    const { page } = request.get() || 1

    const user = await auth.getUser()

    const { project_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot view activities for others users projects')
    }

    const activities = await Activity.query()
      .where({project_id, status: 'doing'})
      .orderBy('alert_date')
      .paginate(page)

    return activities
  }
}

module.exports = ActivityToDoController
