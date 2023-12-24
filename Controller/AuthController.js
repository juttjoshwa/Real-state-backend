import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";

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

    const user = await User.create({
      name,
      email,
      password: hashed_pass,
    });

    return res.status(201).json({
      success: true,
      message: user,
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      messsage: "something went wrong" || error.message,
    });
  }
};
