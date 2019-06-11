const express = require("express"),
      teacherRoute = express.Router(),
      teacherController = require("../controller/quizController");


teacherRoute.get("/create-quiz",teacherController.getCreateQuiz);
teacherRoute.post("/create-quiz",teacherController.postCreateQuiz);

// teacherRoute.get("/quiz/:question/:correctAnswer/:explanation/:wrongAnswer1/:wrongAnswer2/:wrongAnswer3",teacherController.getAddQuestion);

teacherRoute.get("/quiz/update-question/:question/:correctAnswer/:explanation/:wrongAnswer1/:wrongAnswer2/:wrongAnswer3/:index",teacherController.getUpdateQuestion);

teacherRoute.get("/quiz/delete-question/:index",teacherController.getDeleteQuestion);
// teacherRoute.get("/quiz/delete-question/:index/:quizId",teacherController.getDeleteQuestionFromDB);

teacherRoute.get("/save-quiz",teacherController.getSaveQuiz);
teacherRoute.get("/publish-quiz",teacherController.getPublishQuiz);

teacherRoute.get("/saved-quiz",teacherController.getSavedQuiz);
teacherRoute.get("/published-quiz",teacherController.getPublishedQuiz);

teacherRoute.get("/quiz-page/:id",teacherController.getQuizPage);


teacherRoute.get("/test",teacherController.test);
teacherRoute.post("/test",teacherController.test);

teacherRoute.post("/deleteFromDB",teacherController.postDeleteFromDB);

teacherRoute.post("/updateQuestionInArray",teacherController.postUpdateQuestionInArray)

teacherRoute.get("/publish-quiz-page/:id",teacherController.getPublishQuizPage);

teacherRoute.post('/quiz',teacherController.getAddQuestion);

module.exports = teacherRoute;