import dotenv from "dotenv"
dotenv.config()
const config={
    uri : process.env.MongoosURI,
    port:process.env.PORT||2000
}
export default config