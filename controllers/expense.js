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
    const data = await req.user.getExpenses({where: {id : req.query.expenseId}}); 
    data[0].destroy();
}

exports.editexpense = async (req, res, next) => {
    const data = await req.user.getExpenses({where: {id : req.query.expenseId}});
    data[0].amount = req.body.amount;
    data[0].category = req.body.category;
    data[0].description = req.body.description;
    data[0].save();
    res.json(data[0]);
}