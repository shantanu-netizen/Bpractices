import jwt from "jsonwebtoken";
import config from "../../config.mjs";
const authenticateToken = (req, res, next) => {
  let token = req.headers["authorization"];
  // console.log("Token:", token);
  token = token.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      message: "failed",
      error: "Please login to access this resource",
    });
  }
  jwt.verify(token, config.token, (err, decodedToken) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "failed", error: "Invalid credentials" });
    }
    req.user = decodedToken;
    next();
  });
};
const authorization = async (req, res, next) => {
  const user = req.user
  if (!user) {
   return res.status(403).send({ message: "failed", error: "Access denied" });
  }
  let userid = user.id
  let id = req.params.id
  if (userid !== id) {
    return res.status(403).send({ message: "failed", error: "Access denied" });
  }
  next()
}
export { authenticateToken, authorization };