import dotenv from "dotenv"
dotenv.config()
const config = {
    uri: process.env.MongoosURI,
    port: process.env.PORT,
    token: process.env.secretToken
};
export default config;