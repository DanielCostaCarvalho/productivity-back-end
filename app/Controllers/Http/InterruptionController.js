'use strict'

const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')
const Interruption = use('App/Models/Interruption')

class InterruptionController {
  async index({params, auth, request}){
    const { page } = request.get() || 1

    const user = await auth.getUser()

    const { project_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot view interruptions for others users projects')
    }

    const data = project.interruptions().paginate(page)

    return data
  }

  async store({ request, response, auth, params }) {
    const data = request.only(['description', 'type'])

    const user = await auth.getUser()

    const { project_id, activity_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot create an interruption for others users projects')
    }

    const activity = await Activity.findOrFail(activity_id)

    if(activity.project_id != project_id){
      return response.badRequest('This activity is not from this project')
    }

    if(data.type == 'stop'){
      activity.status = 'stopped'
    }

    if(data.type == 'pause'){
      activity.status = 'paused'
    }

    activity.save()

    data['user_id'] = user.id
    data['activity_id'] = activity_id

    const interruption = await project.interruptions().create(data)

    return interruption
  }

  async finish({ response, auth, params }) {
    const user = await auth.getUser()

    const { project_id, activity_id, interruption_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot create an interruption for others users projects')
    }

    const activity = await Activity.findOrFail(activity_id)

    if(activity.project_id != project_id){
      return response.badRequest('This activity is not from this project')
    }

    const interruption = await Interruption.findOrFail(interruption_id)

    if(interruption.activity_id != activity_id){
      return response.badRequest('This interruption is not from this activity')
    }

    activity.status = 'doing'

    activity.save()

    interruption.merge({final_date: new Date()})

    interruption.save()

    return interruption
  }
}

module.exports = InterruptionController
