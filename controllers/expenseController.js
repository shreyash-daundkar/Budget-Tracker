const sequelize = require('../util/database');


exports.displayexpense = async (req, res, next) => {
    try {
        const currPage = parseInt(req.query.currPage);
        const limit = parseInt(req.query.limit);

        if (isNaN(currPage) || isNaN(limit)) {
            return res.status(400).json({ message: 'Invalid page or limit parameter' });
        }

        const offset = (currPage - 1) * limit;

        const count = await req.user.countExpenses();
        const totalPages = Math.ceil(count / limit);

        console.log('totalPages:', totalPages);

        const expense = await req.user.getExpenses({ offset, limit });

        res.json({ expense, totalPages }); 
        
    } catch (error) {
        handelDatabaseError(res, error);
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
        handelDatabaseError(res, error);
    }
}


exports.deleteexpense = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        const data = await req.user.getExpenses({
            where: { id : req.query.expenseId },
        });
        if(data.length === 0) res.status(404).json({ message: 'expense not found' });
    
        req.user.expense -= data[0].amount;
        await req.user.save({transaction: t});

        await data[0].destroy({transaction: t});

        await t.commit();

    } catch (error) {
        await t.rollback();
        handelDatabaseError(res, error);
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
        handelDatabaseError(res, error);
    }
}


function handelDatabaseError(res, error) {
    console.log(error);
    return res.status(500).json({message: error.message});
}