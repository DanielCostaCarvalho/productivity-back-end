'use strict'

const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

class ActivityController {
  async store({ request, response, auth, params }) {
    const data = request.only(['description', 'initial_date', 'final_date', 'alert_date', 'priority'])

    const user = await auth.getUser()

    const { project_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot create an activity for others users projects')
    }

    data['project_id'] = project_id
    data['user_id'] = user.id

    const activity = await Activity.create(data)

    return activity
  }

  async index({ params, auth, response, request }) {
    const { page } = request.get() || 1

    const user = await auth.getUser()

    const { project_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot view activities for others users projects')
    }

    const paused = await Activity.query()
      .where({ project_id, status: 'paused' })
      .orderBy('alert_date')
      .paginate(page)

    const stopped = await Activity.query()
      .where({ project_id, status: 'stopped' })
      .orderBy('alert_date')
      .paginate(page)

    const toDo = await Activity.query()
      .where({ project_id, status: 'to do' })
      .orderBy('alert_date')
      .paginate(page)

    const done = await Activity.query()
      .where({ project_id, status: 'done' })
      .orderBy('alert_date')
      .paginate(page)

    const doing = await Activity.query()
      .where({ project_id, status: 'doing' })
      .orderBy('alert_date')
      .paginate(page)

    return { toDo, doing, stopped, paused, done }
  }
}

module.exports = ActivityController
