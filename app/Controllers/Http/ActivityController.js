'use strict'

const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

class ActivityController {
  async store({ request, response, auth, params }) {
    const data = request.only(['description', 'initial_date', 'alert_date', 'priority'])

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

  async update({ request, response, auth, params }) {
    const data = request.only(['description', 'initial_date', 'final_date', 'alert_date', 'priority'])

    const user = await auth.getUser()

    const { project_id, activity_id } = params

    const project = await Project.findOrFail(project_id)

    const activity = await Activity.findOrFail(activity_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot update an activity for others users projects')
    }

    if(activity.project_id != project_id){
      return response.badRequest('This activity is not from this project')
    }

    activity.merge(data)

    activity.save()

    return activity
  }

  async start({auth, params, response}){
    const user = await auth.getUser()

    const { project_id, activity_id } = params

    const project = await Project.findOrFail(project_id)

    const activity = await Activity.findOrFail(activity_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot update an activity for others users projects')
    }

    if(activity.project_id != project_id){
      return response.badRequest('This activity is not from this project')
    }

    const initial_date = activity.initial_date || new Date()

    activity.merge({initial_date, status: 'doing'})

    activity.save()

    return activity
  }

  async finish({auth, params, response}){
    const user = await auth.getUser()

    const { project_id, activity_id } = params

    const project = await Project.findOrFail(project_id)

    const activity = await Activity.findOrFail(activity_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot update an activity for others users projects')
    }

    if(activity.project_id != project_id){
      return response.badRequest('This activity is not from this project')
    }

    activity.merge({final_date: new Date(), status: 'done'})

    await activity.save()

    return activity
  }

  async destroy({auth, params, response}){
    const user = await auth.getUser()

    const { project_id, activity_id } = params

    const project = await Project.findOrFail(project_id)

    const activity = await Activity.findOrFail(activity_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot update an activity for others users projects')
    }

    if(activity.project_id != project_id){
      return response.badRequest('This activity is not from this project')
    }

    await activity.delete()

    return { sucess: true }
  }
}

module.exports = ActivityController
