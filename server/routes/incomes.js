var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Income = require('../models/income');

function returnError(res, error){
  res
    .status(500)
    .json({
      message: 'An error occured',
      error: error
    })
}

router.get('/', (req, res, next) =>{
  Income.find()
    .then(incomes => {
      res
        .status(200)
        .json({
          message: 'Incomes fetched successfully!',
          incomes: incomes
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.get('/:id', (req, res, next) =>{
  Income.findOne({
    "id": req.params.id
  })
    .then(income => {
      res
        .status(200)
        .json({
          message: 'Income fetched successfully!',
          income: income
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.post('/', (req, res, next)=>{
  const maxIncomeId = sequenceGenerator.nextId("incomes");
  const income = new Income({
    id: maxIncomeId,
    date: req.body.date,
    name: req.body.name,
    amount: req.body.amount,
    description: req.body.description,
    type: req.body.type,
  });

  income.save()
    .then(createdIncome => {
      res
        .status(201)
        .json({
          message: 'Income added successfully',
          income: createdIncome
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  Income.findOne({
    id: req.params.id
  })
  .then(income => {
    income.date = req.body.date;
    income.name = req.body.name;
    income.amount = req.body.amount;
    income.description = req.body.description;
    income.type = req.body.type;

    Income.updateOne({
      id: req.params.id
    }, income)
    .then(result => {
      res
        .status(204)
        .json({
          message: 'Income updated successfully'
        })
    })
    .catch(error => {
      returnError(res, error);
    });

  })
  .catch(error => {
    res.status(500).json({
      message: 'Income not found.',
      error: {
        income: 'Income not found'
      }
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Income.findOne({
    id: req.params.id
  })
  .then(income => {
    Income.deleteOne({
      id: req.params.id
    })
    .then(result => {
      res
        .status(204)
        .json({
          message: "Income deleted successfully"
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
