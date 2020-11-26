const express = require('express')
const budget = require('../controllers/BudgetController')
const router = express.Router()

router.post('/submit', budget.addBudget)
router.get('/budget', budget.getBudget)



module.exports = router
