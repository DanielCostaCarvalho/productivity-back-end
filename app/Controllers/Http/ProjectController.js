'use strict'

class ProjectController {
    async store ({request, auth}){
        const data = request.only(['name', 'description', 'initial_date', 'final_date', 'scope'])

        const user = await auth.getUser()
        
        const project = await user.projects().create(data)

        return project
    }
}

module.exports = ProjectController
