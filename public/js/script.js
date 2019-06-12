//when click on add question

document.getElementById("saveQuestion").onclick = function(){

    // get the input values to send with ajax
    let question = encodeURI(document.getElementsByName("question")[0].value),
    correctAnswer = encodeURI(document.getElementsByName("correctAnswer")[0].value),
    explanation = encodeURI(document.getElementsByName("explanation")[0].value),
    wrongAnswer1 = encodeURI(document.getElementsByName("wrongAnswer1")[0].value),
    wrongAnswer2 = encodeURI(document.getElementsByName("wrongAnswer2")[0].value),
    wrongAnswer3 = encodeURI(document.getElementsByName("wrongAnswer3")[0].value);

    // start validation
    if(question != ""){
        document.getElementById("emptyQuestion").style.display = "none";
        document.getElementById("addQuestionForm").onsubmit = function(){
            this.unbind('submit').submit()
        }
    }else{
        document.getElementById("emptyQuestion").style.display = "block";
        document.getElementById("addQuestionForm").onsubmit = function(event){
            event.preventDefault();
        }
    }
    if(correctAnswer != ""){
        document.getElementById("emptyCorrect").style.display = "none";
        document.getElementById("addQuestionForm").onsubmit = function(){
            this.unbind('submit').submit()
        }
    }else{
        document.getElementById("emptyCorrect").style.display = "block";
        document.getElementById("addQuestionForm").onsubmit = function(event){
            event.preventDefault();
        }
    }
    if(explanation != ""){
        document.getElementById("emptyExplanation").style.display = "none";
        document.getElementById("addQuestionForm").onsubmit = function(){
            this.unbind('submit').submit()
        }
    }else{
        document.getElementById("emptyExplanation").style.display = "block";
        document.getElementById("addQuestionForm").onsubmit = function(event){
            event.preventDefault();
        }
    }
    if(wrongAnswer1 != ""){
        document.getElementById("emptyWrong1").style.display = "none";
        document.getElementById("addQuestionForm").onsubmit = function(){
            this.unbind('submit').submit()
        }
    }else{
        document.getElementById("emptyWrong1").style.display = "block";
        document.getElementById("addQuestionForm").onsubmit = function(event){
            event.preventDefault();
        }
    }
    if(wrongAnswer2 != ""){
        document.getElementById("emptyWrong2").style.display = "none";
        document.getElementById("addQuestionForm").onsubmit = function(){
            this.unbind('submit').submit()
        }
    }else{
        document.getElementById("emptyWrong2").style.display = "block";
        document.getElementById("addQuestionForm").onsubmit = function(event){
            event.preventDefault();
        }
    }
    if(wrongAnswer3 != ""){
        document.getElementById("emptyWrong3").style.display = "none";
        document.getElementById("addQuestionForm").onsubmit = function(){
            this.unbind('submit').submit()
        }
    }else{
        document.getElementById("emptyWrong3").style.display = "block";
        document.getElementById("addQuestionForm").onsubmit = function(event){
            event.preventDefault();
        }
    }
    // end validation

    //send ajax call to server
    
    if(question != "" && correctAnswer != "" && explanation != "" && wrongAnswer1 != "" && wrongAnswer2 != "" && wrongAnswer3 != ""){
        console.log("hello");
        let ajaxRequest = new XMLHttpRequest();
        // ajaxRequest.open("post","http://localhost:3000/teacher/quiz");
        ajaxRequest.open("post","https://fast-taiga-77864.herokuapp.com/teacher/quiz/");
        ajaxRequest.setRequestHeader("Content-type", "application/json");
        let data = {
            question : question,
            correctAnswer : correctAnswer,
            explanation:explanation,
            wrongAnswer1:wrongAnswer1,
            wrongAnswer2:wrongAnswer2,
            wrongAnswer3:wrongAnswer3,
        }
        let req =  JSON.stringify(data);
        ajaxRequest.send(req);
    }
}

// when click on edit to display update Form

document.getElementsByName("editQuestion").forEach(element =>
    element.onclick = function(){
    this.parentElement.style.display = "none";
    this.parentElement.nextElementSibling.nextElementSibling.style.display = "block";
    this.parentElement.nextElementSibling.style.display = "none";
})

// when click on delete to edit question

document.getElementsByName("deleteQuestion").forEach(element => {
    element.onclick = function(){
        let index = this.value;
        let quizId = document.getElementById("deleteQuestionFromDB").value;
        console.log(index);
        let ajaxRequest = new XMLHttpRequest();
        // ajaxRequest.open("GET","http://localhost:3000/teacher/quiz/delete-question/" + index);
        ajaxRequest.open("GET","https://fast-taiga-77864.herokuapp.com/teacher/quiz/delete-question/" + index);
        ajaxRequest.send();
    }
})


// when click on update to edit question

document.getElementsByName("updateQuestionButton").forEach(element => 
    element.onclick = function(){

        // get the input values to send with ajax
        let question = encodeURI(this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[1].value),
        correctAnswer = encodeURI(this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[1].value),
        explanation = encodeURI(this.previousElementSibling.previousElementSibling.previousElementSibling.children[1].value),
        wrongAnswer1 = encodeURI(this.previousElementSibling.children[1].value),
        wrongAnswer2 = encodeURI(this.previousElementSibling.children[3].value),
        wrongAnswer3 = encodeURI(this.previousElementSibling.children[5].value),
        index = this.previousElementSibling.previousElementSibling.children[0].value;

        // start validation
        if(question != ""){
            document.getElementById("emptyUpdateQuestion").style.display = "none";
            document.getElementById("updateFormElement").onsubmit = function(){
                this.unbind('submit').submit()
            }
        }else{
            document.getElementById("emptyUpdateQuestion").style.display = "block";
            document.getElementById("updateFormElement").onsubmit = function(event){
                event.preventDefault();
            }
        }
        if(correctAnswer != ""){
            document.getElementById("emptyUpdateCorrect").style.display = "none";
            document.getElementById("updateFormElement").onsubmit = function(){
                this.unbind('submit').submit()
            }
        }else{
            document.getElementById("emptyUpdateCorrect").style.display = "block";
            document.getElementById("updateFormElement").onsubmit = function(event){
                event.preventDefault();
            }
        }
        if(explanation != ""){
            document.getElementById("emptyUpdateExplanation").style.display = "none";
            document.getElementById("updateFormElement").onsubmit = function(){
                this.unbind('submit').submit()
            }
        }else{
            document.getElementById("emptyUpdateExplanation").style.display = "block";
            document.getElementById("updateFormElement").onsubmit = function(event){
                event.preventDefault();
            }
        }
        if(wrongAnswer1 != ""){
            document.getElementById("emptyUpdateWrong1").style.display = "none";
            document.getElementById("updateFormElement").onsubmit = function(){
                this.unbind('submit').submit()
            }
        }else{
            document.getElementById("emptyUpdateWrong1").style.display = "block";
            document.getElementById("updateFormElement").onsubmit = function(event){
                event.preventDefault();
            }
        }
        if(wrongAnswer2 != ""){
            document.getElementById("emptyWrong2").style.display = "none";
            document.getElementById("updateFormElement").onsubmit = function(){
                this.unbind('submit').submit()
            }
        }else{
            document.getElementById("emptyUpdateWrong2").style.display = "block";
            document.getElementById("updateFormElement").onsubmit = function(event){
                event.preventDefault();
            }
        }
        if(wrongAnswer3 != ""){
            document.getElementById("emptyUpdateWrong3").style.display = "none";
            document.getElementById("updateFormElement").onsubmit = function(){
                this.unbind('submit').submit()
            }
        }else{
            document.getElementById("emptyUpdateWrong3").style.display = "block";
            document.getElementById("updateFormElement").onsubmit = function(event){
                event.preventDefault();
            }
        }
        // end validation

        // send ajax
        if(question != "" && correctAnswer != "" && explanation != "" && wrongAnswer1 != "" && wrongAnswer2 != "" && wrongAnswer3 != ""){
            console.log("yarb");
            let ajaxRequest = new XMLHttpRequest();
            // ajaxRequest.open("post","http://localhost:3000/teacher/quiz/update-question");
            ajaxRequest.open("post","https://fast-taiga-77864.herokuapp.com/teacher/quiz/update-question");
            ajaxRequest.setRequestHeader("Content-type", "application/json");        
            let data = {
                question : question,
                correctAnswer : correctAnswer,
                explanation:explanation,
                wrongAnswer1:wrongAnswer1,
                wrongAnswer2:wrongAnswer2,
                wrongAnswer3:wrongAnswer3,
                index:index
            }
            let req =  JSON.stringify(data);
            ajaxRequest.send(req);
    }
})


