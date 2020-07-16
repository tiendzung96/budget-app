
var Sequence = require('../models/sequence');

var maxIncomeId;
var maxExpenseId;

var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function (err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxIncomeId = sequence.maxIncomeId;
      maxExpenseId = sequence.maxExpenseId;
    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "incomes":
      maxIncomeId++;
      updateObject = {maxIncomeId: maxIncomeId};
      nextId = maxIncomeId;
      break;
    case "expenses":
      maxExpenseId++;
      updateObject = {maxExpenseId: maxExpenseId};
      nextId = maxExpenseId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function (err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
