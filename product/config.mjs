import dotenv from 'dotenv'
dotenv.config()
const config = {
  port: process.env.PORT,
  mongoose: process.env.MongoDB,
  token: process.env.secretToken,
  accessKey: process.env.accessKey,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
};
export default config;