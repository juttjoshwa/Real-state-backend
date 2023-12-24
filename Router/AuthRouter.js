import express from "express";
import { SignUp } from "../Controller/AuthController.js";

const Router = express.Router();

Router.post("/signup", SignUp);

export default Router;
