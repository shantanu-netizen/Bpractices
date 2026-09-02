import jwt from "jsonwebtoken";
import config from "../../config.mjs";
const authentation = async (req, res, next) => {
    const token = req.Header['autherization']
    token = token.split(' ')[1]
    if (!token) {
        return res.status(400).send({ message: "token is required" });
    }
    token.verfiy(token, config.token, (err, decodedToken))
    if (err) {
        return res.status(400).send({message:"Invalid Credentials"})
    }
    req.user=decodedToken
    next()
}
export {authentation}