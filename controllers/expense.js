const expense = require('../models/expense');

exports.displayexpense = async (req, res, next) => res.json(await expense.findAll());

exports.addexpense = async (req, res, next) => res.json(await expense.create(req.body));

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