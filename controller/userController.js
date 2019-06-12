const User = require("../models/userModel");

// display register form 
exports.getAddUser = (request,response) => {
    response.render("register",{"msg":request.flash("msg")});
}

// store user data in the database
exports.postAddUser = (request,response,next) => {
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const role = request.body.role;

    // check the input data if it correct save it
    if(username != "" && email != "" && password != ""){
        // check if the user is exist or not
        User.findOne({email:email})
        .then(result => {
            if(result != null){
                request.flash("msg","The Email is already exist");
                response.redirect("/user/add-user");
            }else{
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
        })
        
    }
    // if the data isn't correct falsh message and redirect to register form
    else{
        request.flash("msg","You Must Input Valid Data");
        response.redirect("/user/add-user");
    }
}

// display the login form
exports.getLogin = (request,response) => {
    response.render("login",{"msg":request.flash("msg")});
}

// check if the user is exist or not
exports.postLogin = (request,response) => {
    let email = request.body.email;
    let password = request.body.password;
    User.find({email:email,password:password})
    .then(result => {
        //if the user is exist redirect to the create quiz page
        if(result[0] != null){
            request.session.loggedIn = true;
            request.session.email = result[0].email;
            response.redirect("/teacher/create-quiz");
        }
        //if the user isn't exist falsh message and redirect to login form
        else{
            request.flash("msg","Invalid username or password ");
            response.redirect("/user/login");
        }
    }).catch(error => console.log(error + " not vaild Data"));
}

//logout user
exports.getLogout = (request,response) => {
    request.session.destroy();
    response.redirect("/user/login");
};