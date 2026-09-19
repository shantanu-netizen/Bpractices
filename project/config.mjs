import dotenv from "dotenv";
dotenv.config()
const config = {
  uri: process.env.MongoosURI,
  port: process.env.PORT,
  token: process.env.secretToken,
  accessKey: process.env.api_key,
  secretAccessKey: process.env.api_secret,
  cloud: process.env.cloud_name,
};
export default config