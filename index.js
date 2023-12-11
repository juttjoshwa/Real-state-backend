import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import DB_connect from "./DataBase/DB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send("server is working fine");
});

// ! use routes at this point

app.listen(process.env.PORT, () => {
  try {
    console.log("server is working fine on http://localhost:4000/");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});

DB_connect();

