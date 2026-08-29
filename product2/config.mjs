import dotenv from "dotenv";
dotenv.config()
const config = {
  uri: process.env.MongoosURI,
  port: process.env.PORT,
  token: process.env.secretToken,
  accessKey: process.env.accessKey,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
};
export default config