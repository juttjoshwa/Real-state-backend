import express from "express";
import { SignIn, SignUp, google } from "../Controller/AuthController.js";
import { updateUserInfo } from "../Controller/UserController.js";
import { VerifyToken } from "../Utills/verifyToken.js";

const Router = express.Router();

Router.post("/signup", SignUp);
Router.post("/signin", SignIn);
Router.post("/google", google);
Router.post("/update/:id",VerifyToken,updateUserInfo)

export default Router;
