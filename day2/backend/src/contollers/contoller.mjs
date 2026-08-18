import userModel from "../models/user.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.mjs";
const register = async (req, res) => {
  try {
    const { fname, email, password, username, dob } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      fname,
      email,
      password: hashedpassword,
      username,
      dob,
    });
    await user.save();
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, config.token);
    return res.status(200).send({ message: "Login successful", token: token });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error logging in", error: error.message });
  }
};
const getuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id)
    if (!user) {
      return res.status(400).send({ message: "user not found" })
    }
    await user.save()
    return res.status(201).send(user)
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error logging in", error: error.message });
  }
}
const update = async (req, res) => {
  try {
    const update = req.body;
    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }
    const user = await userModel
      .findByIdAndUpdate(req.params.id, update, { new: true })
      .select("-password");
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }
   return res.send({ message: "User updated successfully", user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error logging in", error: error.message });
  }
}
export { register, login, getuser, update };
