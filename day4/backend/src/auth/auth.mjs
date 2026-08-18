import jwt from "jsonwebtoken"
import config from "../../config.mjs"
const authenticate = async (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res
          .status(401)
          .send({
            message: "failed",
            error: "Please login to access this resource",
          });
    }
    token = token.split(" ")[1];
    jwt.verify(token, config.token, (err, decodedToken) => {
        if (err) {
             return res
               .status(401)
               .send({ message: "failed", error: "Invalid credentials" });
        }
        req.user = decodedToken;
        next();
    })
    
}
export default authenticate
