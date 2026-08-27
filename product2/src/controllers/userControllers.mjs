import userModel from "../models/userModels.mjs";
import bcrypt from "bcrypt"

const register = async (req, res) => {
    try {
        const data = req.body
        const password = data.password
        if (!password) {
            return res.status(400).send({message:"password is required"})
        }
        data.password = await bcrypt.hash(password, 10)
        const file = await uploadFile(file[0])
            if(!file || file.length === 0){
            return res.status(400).send({message:"file is required"})
        }
        const user = await userModel.create(data)
        return res.status(200).send({message:"Create data succesfully",status:true,data:user})
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
}
