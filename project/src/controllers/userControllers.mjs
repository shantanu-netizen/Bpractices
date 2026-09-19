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
export {register,login}