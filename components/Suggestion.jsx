import Product from "@app/products/page";
import Loader from "@ui/loader";

import React, { useEffect, useState } from "react";

const Suggestion = ({ tag }) => {
  const [filterSearch, setFilterSearch] = useState([]);
  const [data, setData] = useState([]);

  const getProduct = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Error fetch!");
      const data = await response.json();

      setData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const filterProducts = (tag) => {
    const regex = new RegExp(tag, "i"); // 'i' flag for case-insensitive search
    return data.filter(
      (item) => regex.test(item.tag) || regex.test(item.product_name)
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchData = filterProducts(tag);
      setFilterSearch(searchData);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [data, tag]);

  return (
    <div className="">
      <h1 className="mx-5 text-xl font-semibold indent-3">Related Items</h1>
      {filterSearch.length !== 0 ? (
        <Product data={filterSearch} />
      ) : (
        <div className="flex-center h-[50vh]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Suggestion;
