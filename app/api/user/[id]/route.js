import { connectToDB } from "@utils/database";
import User from "@models/users";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const user = await User.findById(params.id);

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Error Fetch User", { status: 500 });
  }
};