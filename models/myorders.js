import mongoose, { Schema, model, models } from "mongoose";

const MyOrdersSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orders: [
      {
        id: {
          type: Schema.Types.ObjectId,
          required: [true, "id is required"],
        },
        product_name: {
          type: String,
          required: [true, "Product name  is required"],
        },
        product_price: {
          type: Number,
          required: [true, "Product price price required"],
        },

        image: {
          type: String,
          required: [true, "Image is required."],
        },
        amount: {
          type: Number,
          required: [true, "amount is required"],
        },
      },
    ],
  },
  { timestamps: true }
);

const MyOrders = models.MyOrders || model("MyOrders", MyOrdersSchema);

export default MyOrders;
