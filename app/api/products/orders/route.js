import { connectToDB } from "@utils/database";
import MyOrders from "@models/myorders";
import Products from "@models/products";

export const POST = async (request, { params }) => {
  const { creator, orders } = await request.json();

  if (!orders) throw "Orders are required!";
  if (!creator) throw "Creator is required!";

  try {
    await connectToDB();
    const newOrders = new MyOrders({
      creator,
      orders: orders,
    });
    await newOrders.save();

    orders.map(async (item) => {
      await Products.updateOne(
        {
          _id: item.id,
        },
        {
          $inc: {
            quantity: item.amount * -1,
          },
        },
        { runValidators: true }
      );
    });

    return new Response(newOrders, {
      status: 200,
      message: "Adding Product succesful!",
    });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
