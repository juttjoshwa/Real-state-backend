import bcryptjs from "bcrypt";
import AuthModel from "../Models/AuthModel.js";

export const updateUserInfo = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        message: "You can only update your account!",
      });
    }
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await AuthModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...restof } = updateUser._doc;

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      restof,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong" || error.message,
    });
  }
};
