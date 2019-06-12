const quizModel = require("../models/quizModel"),
      userModel = require("../models/userModel");

let questionsArray = [];
let importantId = null;


//ajax request toadd question to array
exports.getAddQuestion = (request,response) => {
    let question = decodeURI(request.body.question);
    let correctAnswer = decodeURI(request.body.correctAnswer);
    let explanation = decodeURI(request.body.explanation);
    let wrongAnswer1 = decodeURI(request.body.wrongAnswer1);
    let wrongAnswer2 = decodeURI(request.body.wrongAnswer2);
    let wrongAnswer3 = decodeURI(request.body.wrongAnswer3);
    questionsArray.push({
        main:question,
        correctAnswer:correctAnswer,
        explanation:explanation,
        wrongAnswers:[wrongAnswer1,wrongAnswer2,wrongAnswer3]
    });
}

//to render the questions array to the create quiz page
exports.postAddQuestionForm = (request,response) => {
    response.redirect("/teacher/test");
}

//ajax request to update question in the array
exports.getUpdateQuestion = (request,response) => {
    let questionIndex = request.body.index;
    questionsArray[questionIndex] = {
        main: decodeURI(request.body.question),
        correctAnswer: decodeURI(request.body.correctAnswer),
        explanation: decodeURI(request.body.explanation),
        wrongAnswers: [decodeURI(request.body.wrongAnswer1), decodeURI(request.body.wrongAnswer2), decodeURI(request.body.wrongAnswer3)]
    }
}

//to render questions Array after updated
exports.postUpdateQuestionInArray = (request,response) => {
    response.redirect("/teacher/test");
}

//ajax request to delete question from array
exports.getDeleteQuestion = (request,response) => {
    let questionIndex = request.params.index;
    let filterArray = questionsArray.filter(element => element!=questionsArray[questionIndex]);
    questionsArray = filterArray;
}

//to render the questions array after deleted question
exports.postDeleteFromDB = (request,response) => {
    response.redirect("/teacher/test");
}

//to make questions array is empty to add new quiz
exports.getCreateQuiz = (request,response) => {
    questionsArray = [];
    importantId = null;
    response.redirect("/teacher/test");
}

//render the questions array and flash message
exports.test = (request,response)=>{
    response.render("teacher",{questionsArray:questionsArray,quizId:importantId,"msg":request.flash("msg")});
}


exports.postCreateQuiz = (request,response) => {
    userModel.findOne({email: request.session.email})
    .then(result => {
        response.render("teacher",{"questionsArray":questionsArray});
    }).catch(error => console.log(error));
}

// save the quiz in the database
exports.getSaveQuiz = (request,response) => {
    // check if the quiz is exists or not if exist update it
    if(importantId != null){
        quizModel.findOne({_id:importantId})
        .then(result => {
            if(questionsArray.length == 0){
                return
            }else{
                result.questions = questionsArray;
                return result.save();
            }
        })
        .then(result => {
            if(result == null){
                request.flash("msg","you must add at least one question to save quiz");
                response.redirect("/teacher/create-quiz");
            }else{
                importantId = null;
                response.redirect("/teacher/saved-quiz/");
            }
        }).catch(error => console.log("can't update quiz in DB"));
    }
    // if the quiz not exist store it in the database
    else{
        userModel.findOne({email:request.session.email})
        .then(result => {
            if(questionsArray.length == 0){
                return;
            }else{
                let quiz = new quizModel({
                    userId: result._id,
                    status: 'save',
                    questions: questionsArray
                });
                
                return quiz.save()
            }
        })
        .then(result => {
            if(result != null){
                questionsArray = [];
                response.redirect("/teacher/saved-quiz");
            }else{
                request.flash("msg","you must add at least one question to save quiz");
                response.redirect("/teacher/create-quiz");
            }
        })
        .catch(error => console.log(error));
    }
}


// save the quiz as published in the database
exports.getPublishQuiz = (request,response) => {
    // check if the quiz is exist or not if exist update it to publish
    if(importantId != null){
        quizModel.findOne({_id:importantId})
        .then(result => {
            if(questionsArray.length == 0){
                return
            }else{
                result.questions = questionsArray;
                result.status = "publish";
                return result.save();
            }
        })
        .then(result => {
            if(result == null){
                request.flash("msg","you must add at least one question to save quiz");
                response.redirect("/teacher/create-quiz");
            }else{
                importantId = null;
                response.redirect("/teacher/published-quiz/");
            }
        }).catch(error => console.log("can't update quiz in DB"));
    }
    // if the quiz not exist save it as published in the database
    else{    
        userModel.findOne({email:request.session.email})
        .then(result => {
            if(questionsArray.length == 0){
                return;
            }else{
                let quiz = new quizModel({
                    userId: result._id,
                    status: 'publish',
                    questions: questionsArray
                });
                return quiz.save()
            }
        }).then(result => {
            if(result != null){
                questionsArray = [];
                response.redirect("/teacher/published-quiz");
            }else{
                request.flash("msg","you must add at least one question to publish quiz");
                response.redirect("/teacher/create-quiz");
            }
        }).catch(error => console.log(error));
    }
}

// get the saved quizzes from database
exports.getSavedQuiz = (request,response) => {
    userModel.findOne({email:request.session.email})
    .then(result => {
        quizModel.find({status:"save",userId:result._id})
        .then(result => {
            response.render("saved-quiz",{quizzes: result});
        }).catch(error => console.log(error));
    }).catch(error => console.log(error)); 
}

// get the published quizzes from database
exports.getPublishedQuiz = (request,response) => {
    userModel.findOne({email:request.session.email})
    .then(result => {
        quizModel.find({status:"publish",userId:result._id})
        .then(result => {
            response.render("published-quiz",{quizzes: result});
        }).catch(error => console.log(error));
    }).catch(error => console.log(error)); 
}

// get specific quiz and display it
exports.getQuizPage = (request,response) => {
    let quizId = request.params.id;
    importantId = quizId;
    quizModel.findOne({_id:quizId})
    .then(result => {
        questionsArray = result.questions;
        response.redirect("/teacher/test");
    }).catch(error => console.log("no quiz found quizPageController"));
}

// get specific published quiz and display it
exports.getPublishQuizPage = (request,response) => {
    let publishQuizId = request.params.id;
    quizModel.findOne({_id:publishQuizId})
    .then(result => {
        response.render("publishQuizPage",{publishQuiz:result.questions});
    }).catch(error => console.log(error));
}