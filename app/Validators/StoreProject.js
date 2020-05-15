'use strict'

class StoreProject {
  get rules () {
    return {
      name: 'required|string|max:80',
      description: 'string',
      initialDate: 'date',
      finalDate: 'date',
      scope: 'required|in:estudo,trabalho,pessoal'
    }
  }
}

module.exports = StoreProject
