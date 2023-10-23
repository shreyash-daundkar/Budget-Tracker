exports.displayexpense = async (req, res, next) => {
    try {
        res.json(await req.user.getExpenses()); 
    } catch (error) {
        handelDatabaseError(error);
    }
}


exports.addexpense = async (req, res, next) => {
    try{
        req.user.expense += req.body.amount;
        req.user.save();
        
        res.json(await req.user.createExpense(req.body));
    } catch(error) {
        handelDatabaseError(error);
    }
}


exports.deleteexpense = async (req, res, next) => {
    try {
        const data = await req.user.getExpenses({where: {id : req.query.expenseId}});
        if(data.length === 0) res.status(404).json({message: 'expense not found'});
    
        req.user.expense -= data[0].amount;

        data[0].destroy();
    } catch (error) {
        handelDatabaseError(error);
    }
}


exports.editexpense = async (req, res, next) => {
    try {
        const data = await req.user.getExpenses({where: {id : req.query.expenseId}});
        if(data.length === 0) res.status(404).json({message: 'expense not found'});

        req.user.expense -= data[0].amount;
        req.user.expense += req.body.amount;
        req.user.save();
    
        data[0].amount = req.body.amount;
        data[0].category = req.body.category;
        data[0].description = req.body.description;
        data[0].save();
    
        res.json(data[0]);
    } catch (error) {
        handelDatabaseError(error);
    }
}


function handelDatabaseError(error) {
    req.status(500).json({message: err.message});
}