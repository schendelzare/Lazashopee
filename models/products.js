import mongoose, { Schema, model, models } from "mongoose";

const ProductsSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product_name: {
      type: String,
      required: [true, "Product name  is required"],
    },
    product_price: {
      type: Number,
      required: [true, "Product price price required"],
    },
    product_description: {
      type: String,
      required: [true, "Product description is required"],
    },
    tag: {
      type: String,
      required: [true, "Tag is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
  },
  { timestamps: true }
);

const Products = models.Products || model("Products", ProductsSchema);

export default Products;
