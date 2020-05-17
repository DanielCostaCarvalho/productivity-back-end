'use strict'

class StoreActivity {
  get rules() {
    return {
      description: 'required|string',
      initial_date: 'date',
      final_date: 'required|date',
      alert_date: 'required|date',
      priority: 'required|in:study,work,personal'
    }
  }
}

module.exports = StoreActivity
