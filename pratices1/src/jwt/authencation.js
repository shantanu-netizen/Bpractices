import jwt from "jsonwebtoken"
import secretToken from "../../config.mjs"
import mongoose from "mongoose"
const authenction = async (req, res, next) => {
    try {
         let token = set.Header.authorization;
         if (!token) {
           return res.status(400).send({ message: "token is required" });
         }
         let token = token.split(" ")[1];
         let decoded = jwt.verify(token, secretToken, (err, decodedToken) => {
           if (err) {
             return res.status(400).send({ message: "Invalid Token" });
           }
           return decodedToken;
         });
         req.decoded = decoded;
         next();
    } catch (error) {
        return res.status(500).send({ message:"Internal error"})
    }
}