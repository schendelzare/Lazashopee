"use client";
import React, { useContext, useState } from "react";
import Cart from "@components/Cart";
import { CartContext } from "@context/context";
import { useSession } from "next-auth/react";
import Loader from "@ui/loader";
import useHttps from "@hooks/https";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { loading, sendRequest } = useHttps();

  const { data: session } = useSession();

  const router = useRouter();

  const ctxData = useContext(CartContext);
  const {
    items,
    totalAmount,
    addItem: addToCartHandler,
    removeItem: removeItemHandler,
    reset: resetCartHandler,
  } = ctxData;

  const addToCart = (data) => {
    const item = {
      id: data.id,
      creator: data.creator,
      name: data.name,
      price: data.price,
      image: data.image,
      quantity: data.quantity,
      amount: 1,
    };

    addToCartHandler(item);
  };

  const removeToCart = (id) => {
    removeItemHandler(id);
  };

  const addToMyOrdersHandler = async (data) => {
    const newItem = [];

    for (let key in items) {
      newItem.push({
        id: items[key].id,
        product_name: items[key].name,
        product_price: items[key].price,
        image: items[key].image,
        amount: items[key].amount,
      });
    }

    const myOrders = {
      creator: session?.user.id,
      orders: newItem,
    };

    sendRequest(
      "/api/products/orders",
      "POST",
      JSON.stringify(myOrders),
      resetCartHandler(),
      router.push("/"),
      alert("Item Successfully placed to my orders!")
    );
  };

  return (
    <div>
      {items.length !== 0 ? (
        <div className="wd">
          <div>
            <ul>
              {items.map((item) => (
                <Cart
                  key={item.id}
                  id={item.id}
                  creator={item.creator}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                  amount={item.amount}
                  totalAmount={totalAmount}
                  addToCart={addToCart.bind(null, item)}
                  removeToCart={removeToCart.bind(null, item.id)}
                />
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="my-2">
            <button
              className="form_button"
              disabled={loading}
              onClick={addToMyOrdersHandler.bind(null, items[0].creator)}
            >
              {!loading ? "Place order" : <Loader />}
            </button>
          </div>
        </div>
      ) : (
        <p className="m-5">Ooops! Your cart is empty. Start shopping now!</p>
      )}
    </div>
  );
};

export default CartPage;
