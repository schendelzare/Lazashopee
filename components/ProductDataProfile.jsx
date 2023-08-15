import Image from "next/image";
import { MdAddShoppingCart } from "react-icons/md";
import { useSession } from "next-auth/react";
import Loader from "@ui/loader";
import { useContext } from "react";
import { CartContext } from "@context/context";
import { useRouter, useSearchParams } from "next/navigation";
import Suggestion from "./Suggestion";
const ProductDataProfile = ({
  data,
  deleteProduct,
  updateProduct,
  isSubmitting,
}) => {
  const { data: session } = useSession();

  const router = useRouter();

  const ctxData = useContext(CartContext);
  const { addItem: addToCartHandler } = ctxData;

  const addToCart = (data) => {
    const item = {
      id: data._id,
      creator: data.creator._id,
      name: data.product_name,
      price: data.product_price,
      image: data.image,
      quantity: data.quantity,
      amount: 1,
    };

    addToCartHandler(item);
  };

  const navigateToUserHandler = (id) => {
    router.push(`/profile-user?userId=${id}`);
  };

  return (
    <>
      {!isSubmitting && data ? (
        <div>
          <div className="grid grid-cols-1  lg:grid-cols-2 p-2 gap-1  text-orange bg-white rounded-md tracking-tight mx-1 text-gray-500 font-medium">
            <div className=" rounded-md flex justify-center items-center min-h-[300px] ">
              <img
                src={data.image}
                alt="display pic"
                className="object-contain h-[450px] w-[450px] rounded-md"
              />
            </div>

            <div className="flex flex-col  p-2 rounded-md lg:justify-center lg:gap-4">
              <label className="flex justify-between flex-col">
                <h1 className="flex items-center text-3xl font-medium text-primary-orange   gap-4">
                  <span className=" ">{data.product_name} </span>
                </h1>
                <span className="flex font-semibold items-center text-lg my-3">
                  ${data.product_price.toFixed(2)}
                </span>
              </label>

              <span>Seller: {data.creator.username}</span>
              <span>available stock: {data.quantity}</span>
              <span className="flex justify-between flex-initial w-800 mb-3">
                #{data.tag}
                <span className="flex gap-4 items-center">
                  {session?.user.id === data.creator._id ? (
                    <div className="flex gap-4 rounded px-3 font-semibold">
                      <button
                        className="text-red-600 hover:scale-110"
                        onClick={deleteProduct.bind(null, data._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="text-red-600 hover:scale-110"
                        onClick={updateProduct.bind(null, data._id)}
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                  {session?.user ? (
                    <span className="nav_cart">
                      <MdAddShoppingCart
                        size={30}
                        onClick={addToCart.bind(null, data)}
                      />
                    </span>
                  ) : (
                    <p className="text-red-500">Sign-in and start shopping!</p>
                  )}

                  <Image
                    src={data.creator.image}
                    width={30}
                    height={30}
                    alt="seller"
                    className="rounded-full active:scale-90"
                    onClick={navigateToUserHandler.bind(null, data.creator._id)}
                  />
                </span>
              </span>
              <div className="flex flex-col justify-center items-center ">
                <h3>Description</h3>
                <p className="h-44 lg:h-52 m-1 overflow-auto text-justify">
                  {data.product_description}
                </p>
              </div>
            </div>
          </div>
          <Suggestion tag={data.tag} />
        </div>
      ) : (
        <div className="flex-center h-[50vh]">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ProductDataProfile;
