let express = require("express"),
    userRouter = express.Router();

let userController = require("../controller/userController");

// register route
userRouter.get("/add-user",userController.getAddUser);
userRouter.post("/add-user",userController.postAddUser);

// login route
userRouter.get("/login",userController.getLogin);
userRouter.post("/login",userController.postLogin);

// logout route
userRouter.get("/logout",userController.getLogout);


module.exports = userRouter;