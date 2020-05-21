'use strict'

class UpdateActivity {
  get rules() {
    return {
      description: 'string',
      initial_date: 'date',
      alert_date: 'date',
      final_date: 'date',
      priority: 'in:low,medium,high'
    }
  }
}

module.exports = UpdateActivity
