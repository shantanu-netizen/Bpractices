import userModel from "../models/user.mjs";
import bcrypt from "bcrypt";
const user = async (req, res) => {
  try {
    const data = req.body;
    const password = data.password;
    if (!password) {
      return res.status(400).send({ message: "password is required" });
    }
    if (password.length < 8 && password.length > 15) {
      return res.status(400).send({ message: "password length required" });
    }
    data.password = await bcrypt.hash(password, 10);
    const user = await userModel.create(data);
    return res.status(200).send({ message: "created succesfully", data: user });
  } catch (error) {
    if (error.message.includes("duplication")) {
      return res.status(400).send({ message: "failed", error: error.message });
    }
    if (error.message.includes("validation")) {
      return res.status(400).send({ message: "failed", error: error.message });
    } else {
      return res.status(500).send({ message: "Internal server", error: error.message });
    }
  }
};
const login = async (req, res)=>{
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).send({message:"User not found"})
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
           return res.status(400).send({ message: "Password is incorrect" });
        }
        const token = jwt.sign({ userId: user._id }, { secretToken })
        return res.status(200).send({ message: "login succesfully", data:{token} });
    } catch (error) {
         return res
           .status(500)
           .send({ message: "Internal server", error: error.message });
    }
}
export {user,login}