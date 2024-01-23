const { Schema, model } = require('mongoose');


const expenseSchema = Schema({
    amount : {
        type : Number,
        required: true 
    },
    category : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})


module.exports = model('Expense', expenseSchema);