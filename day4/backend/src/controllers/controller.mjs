import userModel from "../models/user.mjs";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../../config.mjs";
import { isValidObjectId } from "mongoose";
const userpost = async (req, res) => {
    try {
        let { fname, email, phone, password } = req.body
        const hashedpassword = await bcrypt.hash(password, 10)
        const user = new userModel({
          fname,
          email,
          phone,
          password:hashedpassword
        });
        await user.save()
        return res.status(200).send({message:"user created"})
    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({message:"validation error"})
        } else if (error.message.includes("duplication")) {
             return res.status(400).send({ message: "duplication error" });
        } else {
            return res.status(500).send({ message: "internal error" });
        }
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user=await userModel.findOne({email})
        if (!user) {
            return res.status(400).send({message:"user not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
             return res.status(400).send({ message: "password not matched" });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, config.token)
        return res.status(201).send({message:"login succesfull",token:token})
    } catch (error) {
         return res.status(500).send({error:error.message, message: "internal error"  });
    }
}
const getuser = async (req, res)=>{
    try {
        const { id } = req.param;
        const user = await userModel.findById({ id });
           if (!user){
            return res.status(400).send({message:"user not found"})
        }
        await user.save()
    } catch (error) {
        return res
          .status(500)
          .send({ error: error.message, message: "internal error" });
    }
}
const updateuser = async (req, res) => {
    try {
        const { id } = req.query
        const data = req.body
        if (!isValidObjectId) {
            return res.status(400).send({message:"object id not valid"})
        }
        const update = await userModel.updateById({ data })
        if (update.password) {
            password=await bcrypt.hash(update.password,10)
        }
        await update.save()
        return res.status(201).send({message:"document update succesfully"})
    } catch (error) {
        return res
          .status(500)
          .send({ error: error.message, message: "internal error" });
    }
}
export {userpost,login,getuser,updateuser}