'use strict'

const Project = use('App/Models/Project')

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
}

module.exports = InterruptionController
