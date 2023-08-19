"use client";
import Orders from "@components/Orders";
import useHttps from "@hooks/https";
import Loader from "@ui/loader";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const orderId = searchParams.get("userId");

  const getdata = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/orders/${orderId}`, {});
      if (!response.ok) {
        throw new Error("Failed to fetch data!");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, [orderId]);

  let newArrayItem = [];

  for (let keys in data) {
    for (let key in data[keys].orders) {
      newArrayItem.push({
        id: data[keys].orders[key]._id,
        name: data[keys].orders[key].product_name,
        price: data[keys].orders[key].product_price,
        amount: data[keys].orders[key].amount,
        image: data[keys].orders[key].image,
        date: new Date(data[keys].createdAt).toDateString(),
        time: new Date(data[keys].createdAt).toLocaleTimeString(),
      });
    }
  }

  return (
    <div className="">
      <h1 className="font-semibold container text-center">My orders</h1>
      <ul className=" grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 ">
        {newArrayItem && !loading ? (
          newArrayItem.map((item) => (
            <li className="container" key={item.id}>
              <Orders
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                image={item.image}
                date={item.date}
                time={item.time}
              />
            </li>
          ))
        ) : (
          <div className="center_absolute">
            <Loader />
          </div>
        )}
      </ul>
      {newArrayItem.length == 0 && (
        <p className="flex-center">You have no orders! Start shopping now!</p>
      )}
    </div>
  );
};

export default MyOrders;
