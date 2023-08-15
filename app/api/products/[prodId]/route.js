import { connectToDB } from "@utils/database";
import Products from "@models/products";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const productsData = await Products.findById(params.prodId).populate(
      "creator"
    );
    if (!productsData)
      return new Response("Product data Not Found", { status: 404 });

    return new Response(JSON.stringify(productsData), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Products.findByIdAndRemove(params.prodId);

    return new Response("Delete successful!", { status: 200 });
  } catch (error) {
    return new Response("Delete Failed!", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const {
    product_name,
    product_price,
    product_description,
    tag,
    quantity,
    image,
  } = await request.json();

  if (!product_name) throw "product name is required!";
  if (!product_price) throw "product price is required!";
  if (!product_description) throw "description is required!";
  if (!tag) throw "tag is required!";
  if (!quantity) throw "quantity is required!";
  if (!image) throw "image is required!";

  try {
    await connectToDB();

    const existingProduct = await Products.findById(params.prodId);

    if (!existingProduct) return new Response("Product not found!");

    existingProduct.product_name = product_name;
    existingProduct.product_price = product_price;
    existingProduct.product_description = product_description;
    existingProduct.tag = tag;
    existingProduct.quantity = quantity;
    existingProduct.image = image;

    await existingProduct.save();

    return new Response("Successfully updated the Product details!", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Updating!", {
      status: 500,
    });
  }
};
