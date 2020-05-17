'use strict'

const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

class ActivityController {
  async store({ request, response, auth, params }) {
    const data = request.only(['description', 'initial_date', 'final_date'])

    const user = await auth.getUser()

    const { project_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot create an activity for others users projects')
    }

    data['project_id'] = project_id

    const activity = await Activity.create(data)

    return activity
  }
}

module.exports = ActivityController