var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Expense = require('../models/expense');

function returnError(res, error){
  res
    .status(500)
    .json({
      message: 'An error occured',
      error: error
    })
}

router.get('/', (req, res, next) =>{
  Expense.find()
    .then(expenses => {
      res
        .status(200)
        .json({
          message: 'Expenses fetched successfully!',
          expenses: expenses
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.get('/:id', (req, res, next) =>{
  Expense.findOne({
    "id": req.params.id
  })
    .then(expense => {
      res
        .status(200)
        .json({
          message: 'Expense fetched successfully!',
          expense: expense
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.post('/', (req, res, next)=>{
  const maxExpenseId = sequenceGenerator.nextId("expenses");
  const expense = new Expense({
    id: maxExpenseId,
    date: req.body.date,
    name: req.body.name,
    amount: req.body.amount,
    description: req.body.description,
    type: req.body.type,
  });

  expense.save()
    .then(createdExpense => {
      res
        .status(201)
        .json({
          message: 'Expense added successfully',
          expense: createdExpense
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  Expense.findOne({
    id: req.params.id
  })
  .then(expense => {
    expense.date = req.body.date;
    expense.name = req.body.name;
    expense.amount = req.body.amount;
    expense.description = req.body.description;
    expense.type = req.body.type;

    Expense.updateOne({
      id: req.params.id
    }, expense)
    .then(result => {
      res
        .status(204)
        .json({
          message: 'Expense updated successfully'
        })
    })
    .catch(error => {
      returnError(res, error);
    });

  })
  .catch(error => {
    res.status(500).json({
      message: 'Expense not found.',
      error: {
        expense: 'Expense not found'
      }
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Expense.findOne({
    id: req.params.id
  })
  .then(expense => {
    Expense.deleteOne({
      id: req.params.id
    })
    .then(result => {
      res
        .status(204)
        .json({
          message: "Expense deleted successfully"
        });
    })
    .catch(error => {
      returnError(res, error);
    })
  })
  .catch(error => {
    returnError(res, error);
  });
});

module.exports = router;
