import dotenv from "dotenv"
dotenv.config()
const config = {
    uri: process.env.mongoose,
    port:process.env.port     
}
export default config