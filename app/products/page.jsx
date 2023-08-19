"use client";

import React from "react";
import ProductList from "@components/productList";
import Loader from "@ui/loader";

const Product = ({ searchResults, data, searchText }) => {
  return (
    <div className="mx-10">
      {searchText ? (
        <ProductList data={searchResults} />
      ) : (
        <ProductList data={data} />
      )}
      {!data && !searchText ? <Loader /> : null}
    </div>
  );
};

export default Product;
