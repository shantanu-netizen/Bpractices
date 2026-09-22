import userModel from "../models/userModels.mjs";
import { uploadOnCloud } from "../cloud/file.mjs";
import jwt from "jsonwebtoken";
import config from "../../config.mjs";
const register = async (req, res) => {
  try {
    const { fullname, email, password, username } = req.body;
    const Userpassword = await bcrypt.hash(password, 10);
    if (
      [fullname, email, username, Userpassword].some(
        (fields) => fields?.trim() == "",
      )
    ) {
      return res.status(400).send({ message: "All fields is required" });
    }
    const existedUser = userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      return res.status(409).send({ message: "User already register" });
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
      return res.status(409).send({ message: "Avatar is required" });
    }
    const avatar = await uploadOnCloud(avatarLocalPath);
    const coverImage = await uploadOnCloud(coverImageLocalPath);
    if (!avatar) {
      return res
        .status(409)
        .send({ message: "Avatar is file not found in cloud" });
    }
    const user = await userModel.create({
      fullname,
      password: Userpassword,
      avatar,
      coverImage: coverImage?.url || "",
      email,
      username,
    });
    return res
      .status(201)
      .send({ message: "data created succesfully", data: user });
  } catch (error) {
    if (error.message.includes("validation")) {
      return res.status(400).send({ message: "failed", error: error.message });
    } else if (error.message.includes("duplicate")) {
      return res.status(400).send({ message: "failed", error: error.message });
    } else {
      return res
        .status(500)
        .send({ message: "failed", error: "Internal Server Error" });
    }
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!email) {
      return res.status(404).send({ message: "user not found" });
    }
    const isPassword = await bcrypt.compare(password.user.password);
    if (!isPassword) {
      return res.status(404).send({ message: "password not correct" });
    }
    const token = jwt.sign({ userId: user._Id }, config.token);
    if (!token) {
      return res.status(400).send({ message: "Invaild cerdentials" });
    }
    return res.status(200).send({ message: "login succesfull" });
  } catch (error) {
    return res.status(500).send({ message: "Internal error" });
  }
};
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({ message: "both fields are required" });
    }
    const user = await userModel.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).send({
        message: "old password is incorrect",
      });
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (!isSamePassword) {
      return res.status(404).send({
        message: "new password is incorrect",
      });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to change password",
      error: error.message,
    });
  }
};
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "user id is not valid" });
    }
    const profile = await userModel.findOne({ userId });
    if (!profile) {
      return res.status(400).send({ message: "profile is not found" });
    }
    return res
      .status(201)
      .send({ message: "your data", status: true, data: profile });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "failed", error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "user id is not valid" });
    }
    const user = await userModel
      .findByIdAndUpdate(
        userId,
        {
          $set: {
            fullname,
            email,
            username,
          },
        },
        {
          new: true,
        },
      )
      .select("-password");
    if (!user) {
      return res.status(400).send({ message: "profile is not found" });
    }
    return res
      .status(201)
      .send({ message: "Update Successfully", status: true, data: user });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "failed", error: error.message });
  }
};
const updateAvatar = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "user id is not valid" });
    }
    const avatarLocalfile = req.files?.path;
    if (!avatarLocalfile) {
      return res
        .status(400)
        .send({
          status: false,
          message: "avatar local file missing",
        });
    }
    const avatar = uploadOnCloud(avatarLocalfile);
    if (!avatar||!avatar.url) {
      return res.status(400).send({
        status: false,
        message: "avatar is missing",
      });
    }
    const upload = await userModel.findByIdAndUpdate(userId, {
      $set: {
        avatar:avatar.url
      }
    }, { new: true })
   
    if (!upload) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Avatar updated successfully",
      data: upload,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "failed", error: error.message });
  }
};

const updatecoverImage = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({
        status: false,
        message: "User id is not valid",
      });
    }

    const coverLocalfile = req.file?.path;

    if (!coverLocalfile) {
      return res.status(400).send({
        status: false,
        message: "cover local file missing",
      });
    }

    const cover = await uploadOnCloud(coverLocalfile);

    if (!cover || !cover.secure_url) {
      return res.status(400).send({
        status: false,
        message: "cover upload failed",
      });
    }

    const upload = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          coverImage: coverLocalfile.url,
        },
      },
      { new: true },
    );

    if (!upload) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "cover updated successfully",
      data: upload,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Failed",
      error: error.message,
    });
  }
};
export {
  register,
  login,
  changePassword,
  getUser,
  updateUser,
  updateAvatar,
  updatecoverImage,
};
