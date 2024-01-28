const mongoose = require('mongoose');

const Expense = require('../models/expense');
const User = require('../models/user');



exports.createExpense = async options => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const { expenseObj, userId } = options;

        const expense = await new Expense({
            ...expenseObj,
            userId,
        });

        await expense.save({ session });

        const user = await User.findById( userId );
        user.expense += expenseObj.amount;
        await user.save({ session });

        await session.commitTransaction();
        return expense;

    } catch (error) {
        await session.abortTransaction();
        throw error;

    } finally {
        await session.endSession();
    }
}


exports.countExpenses = async options => {
    try {
        const { userId } = options;

        const count = await Expense.countDocuments({ userId });

        return count;
    } catch (error) {
        throw error;
    }
}


exports.readExpenses =  async options => {
    try {
        const { userId, limit, offset } = options;

        const whereCondition = userId ? { userId } : {};

        const expense = await Expense.find( whereCondition ).lean().skip( offset ).limit( limit );
    
        expense.forEach(x => x.id = x._id.toString());
        
        return expense;
    } catch (error) {
        throw error;
    }
}


exports.readExpenseById =  async options => {
    try {
        const { expenseId } = options;

        const expense = await Expense.findById( expenseId ).lean();

        expense.id = expense._id.toString();
        return expense;

    } catch (error) {
        throw error;
    }
}


exports.deleteExpense = async options => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const { expenseObj: { _id, amount, userId }} = options;

        await Expense.deleteOne({ _id }, { session });

        const user = await User.findById( userId );
        user.expense -= amount;
        await user.save({ session });

        await session.commitTransaction();
        return;

    } catch (error) {
        await session.abortTransaction();
        throw error;

    } finally {
        await session.endSession();
    }
}


exports.updateExpense = async options => {

    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const { expenseId, newExpenseObj} = options;

        const oldExpense = await Expense.findById( expenseId );
        
        const user = await User.findById( oldExpense.userId );

        user.expense -= oldExpense.amount;
        user.expense += newExpenseObj.amount;

        oldExpense.amount = newExpenseObj.amount;
        oldExpense.category = newExpenseObj.category;
        oldExpense.description = newExpenseObj.description;

        await oldExpense.save({ session });

        await user.save({ session });

        await session.commitTransaction();
        return oldExpense;

    } catch (error) {
        await session.abortTransaction();
        throw error;

    } finally {
        await session.endSession();
    }
}