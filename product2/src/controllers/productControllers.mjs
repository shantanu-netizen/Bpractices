import mongoose from "mongoose";
import uploadFiles from "../aws/uploadFiles.mjs";
import productModel from "../models/product.mjs";
const product = async (req, res) => {
  try {
    const data = req.body;
    const file = req.files;
    if (!files || !files.length === 0) {
      return res.status(400).send({ message: "Product Image is required" });
    }
    const productImage = await uploadFiles(files[0]);
    data.productImage = productImage;
    if (!productImage) {
      return res.status(400).send({ message: "Product Image is not fetch" });
    }
    const product = await productModel.create(data);
    return res
      .status(200)
      .send({
        message: "product successfully fetch",
        status: true,
        data: product,
      });
  } catch (error) {
    if (error.message.includes("validation")) {
      return res.status(400).send({ message: "failed", error: error.message });
    } else if (error.message.includes("duplicate")) {
      return res.status(400).send({ message: "failed", error: error.message });
    } else {
      return res
        .status(500)
        .send({ message: "failed", error: "Internal Server Error" });
    }
  }
};
const getProduct = async (req, res) => {
    try {
        const { productId } = req.params
        if (!mongoose.Types.ObjectId.isValid(productId)) {
             return res
               .status(400)
               .send({ message: "Product Id is not valid" });
        }
        const product = await productModel.findById({ id: productId })
        if (!product) {
            return res.status(400).send({ message: "Product is not found" });
        }
         return res.status(200).send({
           message: "product data",
           status: true,
           data: product,
         });
    } catch (error) {
        return res
        .status(500)
        .send({ message: "failed", error: "Internal Server Error" });
    }
}