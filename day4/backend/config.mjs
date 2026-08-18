import dotenv from 'dotenv'
dotenv.config()
const config = {
  uri: process.env.MongoDB,
  port: process.env.port || 2000,
  token: process.env.secretToken,
};
export default config