const Budget = require('../models/Budget')

const userCont = require('../controllers/UserController')
const mongoose = require('mongoose')



exports.addBudget = function (req, res) {
  var {  title, budgetVal, color } = req.body
  color += "7f"
  if ( !title && !budgetVal && !color ) {

    return res.status(422).json({ 'error': 'Please provide title, budget, and color' })
  }

  Budget.findOne({ title }, function (err, existingBudget) {
    if (err) {
      return res.status(422).json({ 'error': 'Oops! Something Went Wrong.' })
    }
    if (existingBudget) {
      return res.status(422).json({ 'error': 'Error! A Budget Already Exists With This Title.' })
    }
    else {
      const budget = new Budget({
          title, budgetVal, color
      })

      budget.save(function (err) {
        if (err) {
          return res.status(422).json({

            'error': 'Oops! Something Went Wrong.'
          })
        }
        return res.status(200).json({ 'added': true })
      })
    }
  })
 }

 exports.getBudget = function (req, res) {
   Budget.find({}).then((data) => {
    res.json({data});
   });



  }

