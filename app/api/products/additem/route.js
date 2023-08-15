import { connectToDB } from "@utils/database";
import Products from "@models/products";
import validator from "validator";

export const POST = async (req, res) => {
  const {
    userId,
    product_name,
    product_description,
    product_price,
    tag,
    image,
    qty,
  } = await req.json();

  if (!product_name) throw "Product name is required!";
  if (!product_price) throw "Product price is required!";
  if (!tag) throw "Tag is required!";
  if (!image) throw "Image is required!";
  if (!userId) throw "User is not define!";
  if (!qty) throw "Quantity is not define!";

  if (!validator.isNumeric(product_price.toString()))
    throw "Amount must be a valid number!";
  if (!validator.isNumeric(qty.toString()))
    throw "Quantity! must be a valid number!";

  try {
    await connectToDB();
    const newProducts = new Products({
      creator: userId,
      product_description,
      product_name,
      product_price: product_price,
      tag,
      image,
      quantity: qty,
    });
    await newProducts.save();

    return new Response(JSON.stringify(newProducts), {
      status: 201,
      message: "Adding Product succesful!",
    });
  } catch (e) {
    return new Response("Failed to create new product", { status: 500 });
  }
};
