'use strict'

class StoreProject {
  get rules () {
    return {
      name: 'required|string|max:80',
      description: 'string',
      initialDate: 'date',
      finalDate: 'date'
    }
  }
}

module.exports = StoreProject
