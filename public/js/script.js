document.getElementById("saveQuestion").onclick = function(){
    let question = encodeURI(document.getElementsByName("question")[0].value),
    correctAnswer = encodeURI(document.getElementsByName("correctAnswer")[0].value),
    explanation = encodeURI(document.getElementsByName("explanation")[0].value),
    wrongAnswer1 = encodeURI(document.getElementsByName("wrongAnswer1")[0].value),
    wrongAnswer2 = encodeURI(document.getElementsByName("wrongAnswer2")[0].value),
    wrongAnswer3 = encodeURI(document.getElementsByName("wrongAnswer3")[0].value);
    if(question != "" && correctAnswer != "" && explanation != "" && wrongAnswer1 != "" && wrongAnswer2 != "" && wrongAnswer3 != ""){
        // let ajaxRequest = new XMLHttpRequest();
        // ajaxRequest.open("GET","http://localhost:3000/teacher/quiz/" + question + "/" + correctAnswer + "/" + explanation + "/" + wrongAnswer1 + "/" + wrongAnswer2 + "/" + wrongAnswer3);
        // ajaxRequest.send();
        let ajaxRequest = new XMLHttpRequest();
        
        ajaxRequest.open("post","http://localhost:3000/teacher/quiz/");
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


document.getElementsByName("editQuestion").forEach(element =>
    element.onclick = function(){
    this.parentElement.style.display = "none";
    this.parentElement.nextElementSibling.style.display = "block";
})

document.getElementsByName("deleteQuestion").forEach(element => {
    element.onclick = function(){
        let index = this.value;
        let quizId = document.getElementById("deleteQuestionFromDB").value;
        console.log(index);
        let ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open("GET","http://localhost:3000/teacher/quiz/delete-question/" + index);
        ajaxRequest.send();
    }
})

// document.getElementsByName("updateForm").forEach(element => 
//     element.onsubmit = function(e){
//         e.preventDefault();
// })

document.getElementsByName("updateQuestionButton").forEach(element => 
    element.onclick = function(){
        this.parentElement.parentElement.style.display = "none";
        this.parentElement.parentElement.previousElementSibling.style.display = "block";
        console.log("hello");


    let question = encodeURI(this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[1].value),
    correctAnswer = encodeURI(this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[1].value),
    explanation = encodeURI(this.previousElementSibling.previousElementSibling.previousElementSibling.children[1].value),
    wrongAnswer1 = encodeURI(this.previousElementSibling.children[1].children[0].value),
    wrongAnswer2 = encodeURI(this.previousElementSibling.children[1].children[1].value),
    wrongAnswer3 = encodeURI(this.previousElementSibling.children[1].children[2].value),
    index = this.previousElementSibling.previousElementSibling.children[0].value;

    if(question != "" && correctAnswer != "" && explanation != "" && wrongAnswer1 != "" && wrongAnswer2 != "" && wrongAnswer3 != ""){
        let ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open("GET","http://localhost:3000/teacher/quiz/update-question/" + question + "/" + correctAnswer + "/" + explanation + "/" + wrongAnswer1 + "/" + wrongAnswer2 + "/" + wrongAnswer3 + "/" + index);
        ajaxRequest.send();
    }
})


