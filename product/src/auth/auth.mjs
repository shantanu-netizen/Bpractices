import jwt from 'jsonwebtoken'
import config from '../../config.mjs'
const authentication = (req, res, next) => {
    let token = req.Header['authorization']
    token = token.split(' ')[1]
    if (!token) {
        return res
          .status(401)
          .send({ message: "Please login to access this resource" });
    }
    jwt.verify(token, config.token, (err, decodedToken) => {
        if (err) {
            return res.status(401).send({ message: "Invalid credentials" });
        }
        req.user = decodedToken
        next()

    })
}