import React from "react";

const Cart = ({
  id,
  creator,
  name,
  price,
  image,
  quantity,
  amount,
  addToCart,
  removeToCart,
}) => {
  return (
    <section>
      <div className="flex flex-row border-b  mx-auto">
        <div className="flex flex-col flex-grow py-3">
          <h1 className="cart_h1 ">{name}</h1>
          <span>${price}</span>
          <span>Total: ${amount * price}</span>
          <span>Quantity: {amount}</span>
          <div className="flex gap-2">
            <button className="cart_button" onClick={addToCart}>
              +
            </button>
            <button className="cart_button" onClick={removeToCart}>
              -
            </button>
          </div>
        </div>

        <img src={image} className="w-20 h-20 m-auto rounded-md" />
      </div>
    </section>
  );
};

export default Cart;
