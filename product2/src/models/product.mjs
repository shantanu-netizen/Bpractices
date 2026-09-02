import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    currencyId: { type: String, required: true, enum: ["INR"] },

    currencyFormat: {
      type: String,
      required: true,
      default: "₹",
    },

    isFreeShipping: { type: Boolean, default: false },
    productImage: { type: String, required: true }, // s3 link
    style: { type: String },
    availableSizes: {
      type: [String],
      required: true,
      validate: {
        validator: function (sizes) {
          return sizes.length >= 1;
        },
        message: "At least one size is required",
      },
      enum: ["S", "XS", "M", "X", "L", "XXL", "XL"],
    },
    installments: { type: Number, min: 0 },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
const productModel = new mongoose.model("product", productSchema);
export default productModel;
