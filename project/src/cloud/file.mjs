import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
const uploadOnCloud = async (localFile) => {
    try {
        if (!localFile) {
          return null;
        }
        const response = await cloudinary.uploader.upload(localFile,{
        resource_type:"auto"
    })
        console.log("File is uploaded on cloudinary", response.url)
        return response
    } catch (error) {
        fs.unlinksync(localFile)
        return null
    } 
}
export default uploadOnCloud