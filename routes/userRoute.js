let express = require("express"),
    userRouter = express.Router();

let userController = require("../controller/userController");

userRouter.get("/add-user",userController.getAddUser);
userRouter.post("/add-user",userController.postAddUser);

userRouter.get("/login",userController.getLogin);
userRouter.post("/login",userController.postLogin);

userRouter.get("/logout",userController.getLogout);


module.exports = userRouter;