"use client";
import Product from "@app/products/page";
import useHttps from "@hooks/https";
import Loader from "@ui/loader";
import React, { useState, useEffect } from "react";

const Feed = React.memo(() => {
  const { data, loading, error, sendRequest } = useHttps();

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const url = "/api/products";

  useEffect(() => {
    sendRequest(url);
  }, []);

  //searchbar query
  const filterProducts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return data.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.product_name) ||
        regex.test(item.tag)
    );
  };

  const handleOnChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterProducts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <div>
      <div id="feed" className="flex-center items-center gap-5   rounded m-5 ">
        <input
          value={searchText}
          className="search_bar "
          onChange={handleOnChange}
          maxLength="10"
          placeholder="Search Product"
        />
      </div>

      {!loading && data ? (
        <Product
          searchResults={searchedResults}
          searchText={searchText}
          data={data}
        />
      ) : (
        <div className="flex-center h-[50vh]">
          <Loader />
        </div>
      )}
    </div>
  );
});

export default Feed;
