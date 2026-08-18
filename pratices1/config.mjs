import dotenv from "dotenv";
dotenv.config()
const config = {
    uri: process.env.MongoosURI,
    port: process.env.PORT,
    secretToken: process.env.secretToken
}
export default config
