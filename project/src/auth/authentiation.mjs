import jsonwebtoken from "jsonwebtoken"
import config from "../../config.mjs"
const authentication = async (req, res, next) => {
  const token = req.Header["authoization"];
  token = token.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Token not found" });
  }
  token = jsonwebtoken.verify(token, config.token, { err, decodedToken });
  if (err) {
    return res.status.send({ message: "Invalid credentials" });
  }
  req.user = decodedToken;
  next();
};
export { authentication };