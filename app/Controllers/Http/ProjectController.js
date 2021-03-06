'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async store({ request, auth }) {
    const data = request.only(['name', 'description', 'initial_date', 'final_date', 'scope'])

    const user = await auth.getUser()

    const project = await user.projects().create(data)

    return project
  }

  async index({ request, auth }) {
    const { page } = request.get() || 1

    const user = await auth.getUser()

    const projects = await Project.query().where({user_id: user.id, active: true}).paginate(page)

    return projects
  }

  async show({ auth, params }) {
    const user = await auth.getUser()

    const { project_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot create an activity for others users projects')
    }

    return project
  }

  async update({ request, auth, params }) {
    const data = request.only(['name', 'description', 'initial_date', 'final_date', 'scope'])

    const user = await auth.getUser()

    const { project_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot create an activity for others users projects')
    }

    project.merge(data)

    await project.save()

    return project
  }

  async inactive({ auth, params }) {
    const user = await auth.getUser()

    const { project_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot create an activity for others users projects')
    }

    project.merge({ active: false })

    await project.save()

    return project
  }

  async delete({ auth, params }) {

    const user = await auth.getUser()

    const { project_id } = params

    const project = await Project.findOrFail(project_id)

    if (project.user_id !== user.id) {
      return response.forbidden('Cannot create an activity for others users projects')
    }


    await project.delete()

    return { sucess: true }
  }
}

module.exports = ProjectController
