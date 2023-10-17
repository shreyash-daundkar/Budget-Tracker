const expense = require('../models/expense');

exports.displayexpense = async (req, res, next) => res.json(await req.user.getExpenses());

exports.addexpense = async (req, res, next) => {
    try{
        res.json(await req.user.createExpense(req.body));
    } catch(error) {
        console.log(error);
    }
}

exports.deleteexpense = async (req, res, next) => {
    const data = await expense.findByPk(req.params.id);
    data.destroy();
}

exports.editexpense = async (req, res, next) => {
    const data = await expense.findByPk(req.params.id);
    data.amount = req.body.amount;
    data.category = req.body.category;
    data.description = req.body.description;
    data.save();
    res.json(data);
}