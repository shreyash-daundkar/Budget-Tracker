const express = require('express');
const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/', expenseController.displayexpense);

router.post('/add', expenseController.addexpense);
router.post('/edit/:id', expenseController.editexpense);
router.post('/delete/:id', expenseController.deleteexpense);

module.exports = router;