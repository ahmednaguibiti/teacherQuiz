const quizModel = require("../models/quizModel"),
      userModel = require("../models/userModel");

let questionsArray = [];
let importantId = null;



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
    // console.log(questionsArray);
    // response.render("teacher",{"questionsArray":questionsArray});
}

exports.getUpdateQuestion = (request,response) => {
    console.log(request.params.index);
    let questionIndex = request.params.index;
    questionsArray[questionIndex] = {
        main: request.params.question,
        correctAnswer: request.params.correctAnswer,
        explanation: request.params.explanation,
        wrongAnswers: [request.params.wrongAnswer1, request.params.wrongAnswer2, request.params.wrongAnswer3]
    }
}

exports.postUpdateQuestionInArray = (request,response) => {
    response.redirect("/teacher/test");
}

exports.getDeleteQuestion = (request,response) => {
    console.log(request.params.index);
    let questionIndex = request.params.index;
    let filterArray = questionsArray.filter(element => element!=questionsArray[questionIndex]);
    questionsArray = filterArray;
}

exports.postDeleteFromDB = (request,response) => {
    response.redirect("/teacher/test");
}

exports.getCreateQuiz = (request,response) => {
    questionsArray = [];
    importantId = null;
    console.log(questionsArray);
    response.redirect("/teacher/test");
}

exports.test = (request,response)=>{
    response.render("teacher",{questionsArray:questionsArray,quizId:importantId});
}


exports.postCreateQuiz = (request,response) => {
    userModel.findOne({email: request.session.email})
    .then(result => {
        response.render("teacher",{"questionsArray":questionsArray});
    }).catch(error => console.log(error));
}

exports.getSaveQuiz = (request,response) => {
    if(importantId != null){
        console.log("yarb");
        quizModel.findOne({_id:importantId})
        .then(result => {
            result.questions = questionsArray;
            return result.save();
        })
        .then(result => {
            importantId = null;
            response.redirect("/teacher/saved-quiz/")
        }).catch(error => console.log("can't update quiz in DB"));
    }else{
        console.log(importantId);
        console.log("yarb Tany");
        userModel.findOne({email:request.session.email})
        .then(result => {
                let quiz = new quizModel({
                    userId: result._id,
                    status: 'save',
                    questions: questionsArray
            });
            console.log(quiz);
            quiz.save()
            .then(result => {
                questionsArray = [];
                response.redirect("/teacher/saved-quiz");
            }).catch(error => console.log(error));
        }).catch(error => console.log(error));
    }
}

exports.postCreateQuiz = (request,response) => {
    userModel.findOne({email: request.session.email})
    .then(result => {
        response.render("teacher",{"questionsArray":questionsArray});
    }).catch(error => console.log(error));
}

exports.getPublishQuiz = (request,response) => {
    if(importantId != null){
        console.log("yarb");
        quizModel.findOne({_id:importantId})
        .then(result => {
            result.questions = questionsArray;
            result.status = "publish";
            return result.save();
        })
        .then(result => {
            importantId = null;
            response.redirect("/teacher/published-quiz/")
        }).catch(error => console.log("can't update quiz in DB"));
    }else{    
        userModel.findOne({email:request.session.email})
        .then(result => {
                let quiz = new quizModel({
                    userId: result._id,
                    status: 'publish',
                    questions: questionsArray
            });
            console.log(quiz);
            quiz.save()
            .then(result => {
                questionsArray = [];
                response.redirect("/teacher/published-quiz");
            }).catch(error => console.log(error));
        }).catch(error => console.log(error));
    }
}

exports.getSavedQuiz = (request,response) => {
    userModel.findOne({email:request.session.email})
    .then(result => {
        quizModel.find({status:"save",userId:result._id})
        .then(result => {
            response.render("saved-quiz",{quizzes: result});
        }).catch(error => console.log(error));
    }).catch(error => console.log(error)); 
}

exports.getPublishedQuiz = (request,response) => {
    userModel.findOne({email:request.session.email})
    .then(result => {
        quizModel.find({status:"publish",userId:result._id})
        .then(result => {
            response.render("published-quiz",{quizzes: result});
        }).catch(error => console.log(error));
    }).catch(error => console.log(error)); 
}

exports.getQuizPage = (request,response) => {
    let quizId = request.params.id;
    importantId = quizId;
    quizModel.findOne({_id:quizId})
    .then(result => {
        questionsArray = result.questions;
        response.redirect("/teacher/test");
    }).catch(error => console.log("no quiz found quizPageController"));
}

exports.getPublishQuizPage = (request,response) => {
    let publishQuizId = request.params.id;
    quizModel.findOne({_id:publishQuizId})
    .then(result => {
        console.log(result);
        response.render("publishQuizPage",{publishQuiz:result.questions});
    }).catch(error => console.log(error));
}