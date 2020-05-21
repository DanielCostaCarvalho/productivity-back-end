'use strict'

const Project = use('App/Models/Project')
const Activity = use('App/Models/Activity')

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

    data['user_id'] = user.id
    data['activity_id'] = activity_id

    const interruption = await project.interruptions().create(data)

    return interruption
  }
}

module.exports = InterruptionController
