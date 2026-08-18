import mongoose from "mongoose";
const blog = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required."],
    },

    body: {
      type: String,
      required: [true, "body is required."],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: [true, "id is required"],
    },

    tags: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      required: [true, "category is required."],
    },

    subcategory: {
      type: [String],
      default: [],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  },
);

const blogModel = mongoose.model("Blog", blog);
export default blogModel;