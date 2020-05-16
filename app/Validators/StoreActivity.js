'use strict'

class StoreActivity {
  get rules() {
    return {
      description: 'required|string',
      initial_date: 'date',
      final_date: 'required|date'
    }
  }
}

module.exports = StoreActivity
