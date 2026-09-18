import userModel from "../models/userModels.mjs";
import { uploadOnCloud } from "../cloud/file.mjs";
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
     const user= await userModel.create({
          fullname,
          password: Userpassword,
          avatar,
          coverImage: coverImage?.url || "",
          email,
          username
     })
      return res.status(201).send({message:"data created succesfully", data:user})
  } catch (error) {
      if (error.message.includes("validation")) {
        return res
          .status(400)
          .send({ message: "failed", error: error.message });
      } else if (error.message.includes("duplicate")) {
        return res
          .status(400)
          .send({ message: "failed", error: error.message });
      } else {
        return res
          .status(500)
          .send({ message: "failed", error: "Internal Server Error" });
      }
  }
};
