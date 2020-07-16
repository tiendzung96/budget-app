const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxIncomeId: {type: Number, required: true},
  maxExpenseId: {type: Number, required: true}
});

module.exports = mongoose.model('Sequence', sequenceSchema);
