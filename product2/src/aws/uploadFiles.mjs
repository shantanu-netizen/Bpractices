import config from "../../config.mjs";
import aws from "aws-sdk";
aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKey,
  region: config.region,
});
const s3 = new aws.s3({ apiVersion: "2006-03-01" });
const uploadFiles = async (files) => {
  return new Promise((resolve, reject) => {
    if (!files || !files.buffer) {
      return reject(new Error("Invalid file object: buffer is missing"));
    }
    if (!files.originalname) {
      return reject(
        new Error("Invalid file object: originalfiles name is missing"),
      );
      }
      const uploadParams = {
        ACL: "public-read",
        Bucket: "fsdclass",
        Key: `Products/${Date.now()}-${files.originalname}`,
        Body: files.buffer,
      };
      s3.upload(uploadParams, (err, date) => {
          if (err) {
              console.error("Error details:", {
                code: err.code,
                message: err.message,
                statusCode: err.statusCode,
                region: config.region,
                bucket: uploadParams.Bucket,
                key: uploadParams.Key,
              });
              return reject (err)
          }
          if (!data || !data.location) {
              return reject(
                new Error(
                  "Failed to upload file: No location returned from S3",
                ),
              );
          }
           resolve(data.location)
      })
  });
};
export default uploadFiles