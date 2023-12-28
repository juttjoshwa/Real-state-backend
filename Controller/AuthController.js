import AuthModel from "../Models/AuthModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(404).json({
        success: false,
        message: "please fill all the fileds",
      });
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(password, genSalt);

    const user = await AuthModel.create({
      name,
      email,
      password: hashed_pass,
    });

    user.save();

    return res.status(201).json({
      success: true,
      message: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};

const secretKey = "juttjoshwa";

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validUser = await AuthModel.findOne({ email });
    if (!validUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const ValidPassword = bcrypt.compareSync(password, validUser.password);
    if (!ValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid cridentials!",
      });
    }
    const token = jwt.sign({ id: validUser._id }, secretKey);
    const { password: pass, ...restof } = validUser._doc;

    res
      .cookie("tokken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        restof,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
    });
  }
};
