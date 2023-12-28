import express from "express";
import { SignIn, SignUp } from "../Controller/AuthController.js";

const Router = express.Router();

Router.post("/signup", SignUp);
Router.post("/signin", SignIn);

export default Router;
