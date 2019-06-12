const express = require("express"),
      teacherRoute = express.Router(),
      teacherController = require("../controller/quizController");

//create quiz route
teacherRoute.get("/create-quiz",teacherController.getCreateQuiz);
teacherRoute.post("/create-quiz",teacherController.postCreateQuiz);


//edit question in create quiz page
teacherRoute.post("/quiz/update-question/",teacherController.getUpdateQuestion);


//delete question in the create quiz page
teacherRoute.get("/quiz/delete-question/:index",teacherController.getDeleteQuestion);


//save the quiz
teacherRoute.get("/save-quiz",teacherController.getSaveQuiz);
//publish the quiz
teacherRoute.get("/publish-quiz",teacherController.getPublishQuiz);


//get saved quizzes
teacherRoute.get("/saved-quiz",teacherController.getSavedQuiz);
//get published quizzes
teacherRoute.get("/published-quiz",teacherController.getPublishedQuiz);


//get details about specific quiz
teacherRoute.get("/quiz-page/:id",teacherController.getQuizPage);


//redirect the page to applay changes in the question
teacherRoute.get("/test",teacherController.test);
teacherRoute.post("/test",teacherController.test);


//ajax request to delete question
teacherRoute.post("/deleteFromDB",teacherController.postDeleteFromDB);
//ajax request to update the question
teacherRoute.post("/updateQuestionInArray",teacherController.postUpdateQuestionInArray)


//make quiz publish after save it
teacherRoute.get("/publish-quiz-page/:id",teacherController.getPublishQuizPage);


//ajax request to add question to array to display it in the same page 
teacherRoute.post('/quiz',teacherController.getAddQuestion);


//to render the questionsarray to the create quiz page
teacherRoute.post("/addQuestionForm",teacherController.postAddQuestionForm)

module.exports = teacherRoute;