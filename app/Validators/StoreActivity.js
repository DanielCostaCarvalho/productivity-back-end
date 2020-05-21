'use strict'

class StoreActivity {
  get rules() {
    return {
      description: 'required|string',
      initial_date: 'date',
      alert_date: 'required|date',
      priority: 'in:low,medium,high'
    }
  }
}

module.exports = StoreActivity
