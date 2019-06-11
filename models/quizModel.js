const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    status:{
        type:String,
        enum: ['save','publish'],
        required: true
    },
    questions: [{
        main: {type: String,required: true},
        correctAnswer: {type: String, required:true},
        wrongAnswers: [{type:String,required: true}],
        explanation: {type:String,required: true}
    }]
});
module.exports = mongoose.model("quiz",quizSchema);