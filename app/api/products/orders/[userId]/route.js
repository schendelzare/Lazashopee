import { connectToDB } from "@utils/database";
import MyOrders from "@models/myorders";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const result = await MyOrders.find({ creator: params.userId }).populate(
      "creator"
    );

    if (!result) return new Response("Orders data Not Found", { status: 404 });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
