'use strict'

class StoreProject {
  get rules() {
    return {
      name: 'required|string|max:80',
      description: 'string',
      initial_date: 'date',
      final_date: 'date',
      scope: 'required|in:study,work,personal'
    }
  }
}

module.exports = StoreProject
