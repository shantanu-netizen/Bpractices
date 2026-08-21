import jwt from "jsonwebtoken"
import config from "../../config.mjs";
const authenction = async (req, res, next) => {
    try {
         let token = req.Header.authorization;
         if (!token) {
           return res.status(400).send({ message: "token is required" });
         }
         token = token.split(" ")[1];
         let decoded = jwt.verify(token, config.secretToken, (err, decodedToken) => {
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
export default authenction