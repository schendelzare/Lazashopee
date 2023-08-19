import React from "react";

const Cart = React.memo(
  ({
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
      <section className="bg-my-gray rounded-xl my-5">
        <div className="flex flex-row mx-auto">
          <div className="flex flex-col  p-3">
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

          <img
            src={image}
            className="w-20 h-20 m-auto rounded-md"
            alt="image"
          />
        </div>
      </section>
    );
  }
);

export default Cart;
