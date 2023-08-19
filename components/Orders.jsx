import React from "react";

const Orders = React.memo(({ name, price, amount, image, date, time }) => {
  return (
    <section className="">
      <div className="flex flex-row border-b  mx-auto">
        <div className="flex flex-col flex-grow py-3">
          <h1 className="cart_h1 ">{name}</h1>
          <span>${price}</span>
          <span>Total: ${amount * price}</span>
          <span>Quantity: {amount}</span>
          <span>Date of purchase: {date}</span>
          <span>{time}</span>
        </div>

        <img src={image} className="w-20 h-20 m-auto rounded-xl p-2" />
      </div>
    </section>
  );
});

export default Orders;
