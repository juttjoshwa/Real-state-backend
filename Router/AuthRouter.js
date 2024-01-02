import express from "express";
import { SignIn, SignUp, google } from "../Controller/AuthController.js";

const Router = express.Router();

Router.post("/signup", SignUp);
Router.post("/signin", SignIn);
Router.post("/google", google);

export default Router;
