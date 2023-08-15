import Products from "@models/products";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const products = await Products.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response("Error to get post", { status: 500 });
  }
};
