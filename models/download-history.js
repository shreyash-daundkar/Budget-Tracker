const { Schema, model } = require('mongoose');


const downloadHistorySchema = Schema({
    fileName : {
        type : String,
        required: true
    },
    location : {
        type : String,
        required: true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})


module.exports = model('DownloadHistory', downloadHistorySchema);