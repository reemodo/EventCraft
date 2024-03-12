const mongoose = require('mongoose');


const redAlertSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },

});


const RedAlert = mongoose.model('RedAlert', redAlertSchema);

module.exports = RedAlert;
