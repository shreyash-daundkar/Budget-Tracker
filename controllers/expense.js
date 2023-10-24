const sequelize = require('../util/database');


exports.displayexpense = async (req, res, next) => {
    try {
        res.json(await req.user.getExpenses()); 
    } catch (error) {
        handelDatabaseError(error);
    }
}


exports.addexpense = async (req, res, next) => {
    const t = await sequelize.transaction();

    try{
        req.user.expense += req.body.amount;
        await req.user.save({ transaction: t });
        
        const expense = await req.user.createExpense(req.body, { transaction: t });
        await t.commit();
        res.json(expense);
        
    } catch(error) {
        await t.rollback();
        handelDatabaseError(error);
    }
}


exports.deleteexpense = async (req, res, next) => {
    try {
        const data = await req.user.getExpenses({
            where: { id : req.query.expenseId },
        });
        if(data.length === 0) res.status(404).json({ message: 'expense not found' });
    
        req.user.expense -= data[0].amount;
        await req.user.save();

        await data[0].destroy();
    } catch (error) {
        handelDatabaseError(error);
    }
}


exports.editexpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    
    try {
        const data = await req.user.getExpenses({
            where: { id : req.query.expenseId }, 
        });
        if(data.length === 0) return res.status(404).json({ message: 'expense not found' });

        req.user.expense -= data[0].amount;
        req.user.expense += req.body.amount;
        await req.user.save({ transaction: t });
    
        data[0].amount = req.body.amount;
        data[0].category = req.body.category;
        data[0].description = req.body.description;
        await data[0].save({ transaction: t });
        
        await t.commit();
        res.json(data[0]);

    } catch (error) {
        await t.rollback();
        handelDatabaseError(error);
    }
}


function handelDatabaseError(error) {
    return req.status(500).json({message: err.message});
}