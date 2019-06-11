const User = require("../models/userModel");

exports.getAddUser = (request,response) => {
    response.render("register");
}

exports.postAddUser = (request,response,next) => {
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const role = request.body.role;
    const user = new User({
        username: username,
        email: email,
        password: password,
        role: role
    });
    user.save()
    .then(result => {
        request.session.loggedIn = true;
        request.session.email = email;
        response.redirect("/teacher/create-quiz");
    })
    .catch(error => console.log(error));
}

exports.getLogin = (request,response) => {
    response.render("login",{"msg":request.flash("msg")});
}

exports.postLogin = (request,response) => {
    let email = request.body.email;
    let password = request.body.password;
    User.find({email:email,password:password})
    .then(result => {
        if(result[0] != null){
            console.log(result[0].email);
            request.session.loggedIn = true;
            request.session.email = result[0].email;
            response.redirect("/teacher/create-quiz");
        }else{
            request.flash("msg","not valid data");
            response.redirect("/user/login");
        }
    }).catch(error => console.log(error + " not vaild Data"));
}

exports.getLogout = (request,response) => {
    request.session.destroy();
    response.redirect("/login");
};