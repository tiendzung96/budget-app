const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema({
  id: {type: String, required: true},
  date: {type: Date, required: true},
  name: {type: String, required: true},
  amount: {type: String, required: true},
  description: {type: String},
  type: {type: String}
});

module.exports = mongoose.model('Income', incomeSchema);
