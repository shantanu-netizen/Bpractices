import jwt from "jsonwebtoken";
import userModel from "../models/userModels.mjs";
import bcrypt from "bcrypt";
import uploadFiles from "../aws/uploadFiles.mjs";
import config from "../../config.mjs";
const register = async (req, res) => {
  try {
    const data = req.body;
    const password = data.password;
    if (!password) {
      return res.status(400).send({ message: "password is required" });
    }
    data.password = await bcrypt.hash(password, 10);
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).send({ message: "file is required" });
    }
    const profileImage = await uploadFiles(files[0]);
    data.profileImage = profileImage;
    if (!profileImage) {
      return res.status(500).send({
        message: "failed",
        error: "Failed to upload profile picture",
      });
    }
    const user = await userModel.create(data);
    return res
      .status(200)
      .send({ message: "Create data succesfully", status: true, data: user });
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
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).send({ message: "password is wrong" });
    }
    const token = jwt.sign({ userId: user._Id }, config.token);
    if (!token) {
      return res.status(400).send({ message: "Invalid Cerdentials" });
    }
    return res.status(200).send({ message: "Login", data: token });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal server", error: error.message });
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
const putUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const update = req.body;
    const user = await userModel.findByIdAndUpdate(userId, update, {
      new: true,
    });
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
export { register, login, getUser, putUser };
