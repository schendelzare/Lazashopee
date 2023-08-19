import { CartContext } from "@context/context";
import { useRouter } from "next/navigation";

import React, { useContext } from "react";

const ProductList = React.memo(({ data }) => {
  const ctx = useContext(CartContext);
  const { addItem: addToCartHandler } = ctx;
  const router = useRouter();

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

  const handleProductData = (item) => {
    router.push(`/products/product-data?prodId=${item._id}`);
  };

  return (
    <div className="">
      <ul className="prod_ul tracking-tight ">
        {data
          ? data.map((item) => (
              <li
                key={item._id}
                className=" group relative w-full animate-fade-right animate-delay-300 animate-once "
              >
                <div
                  className="bg-my-gray"
                  onClick={handleProductData.bind(null, item)}
                >
                  <img
                    src={item.image}
                    alt="display picture"
                    className="rounded-md  p-1   h-48  group-hover:scale-125 mx-auto"
                  />
                </div>
                <div className="">
                  <div className=" ">
                    <div className="flex flex-col animate-fade-right animate-delay-500 animate-once">
                      <span className=" w-full font-extrabold flex justify-between">
                        <h3 className="w-auto mr-1">{item.product_name}</h3>
                        <span className="font-medium">
                          ${item.product_price.toFixed(2)}
                        </span>
                      </span>
                      <span className="text-xs text-gray-600 font-inter ">
                        {item.tag}
                      </span>

                      <button
                        onClick={addToCart.bind(null, item)}
                        className="py-1.5  border border-black rounded-full my-2 w-28 group-hover:bg-my-green group-hover:text-white font-semibold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
});

export default ProductList;
