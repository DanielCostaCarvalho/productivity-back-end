'use strict'

class StoreActivity {
  get rules() {
    return {
      description: 'required|string',
      alert_date: 'required|date',
      priority: 'in:low,medium,high'
    }
  }
}

module.exports = StoreActivity
