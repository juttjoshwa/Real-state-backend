import express from "express";
import { test } from "../Controller/UserController.js";

const Router = express.Router();

Router.get("/test", test);

export default Router;
