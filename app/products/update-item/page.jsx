"use client";

import Form from "@components/Form";
import useHttps from "@hooks/https";
import Loader from "@ui/loader";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Update = () => {
  const { data, loading, error, sendRequest } = useHttps();

  const [productData, setProductData] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    tag: "",
    qty: "",
    image: "",
  });

  const { product_name, product_price, product_description, tag, image, qty } =
    productData;

  const searchParams = useSearchParams();
  const prodId = searchParams.get("prodId");

  const router = useRouter();

  useEffect(() => {
    const getProdData = async () => {
      try {
        const response = await fetch(`/api/products/${prodId}`);
        const data = await response.json();
        console.log("update-item", data);

        setProductData({
          product_name: data.product_name,
          product_price: data.product_price,
          product_description: data.product_description,
          tag: data.tag,
          qty: data.quantity,
          image: data.image,
        });
      } catch (error) {
        throw new Error("Cannot get product data");
      }
    };
    getProdData();
  }, [prodId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const body = {
      product_name: product_name,
      product_price: product_price,
      product_description: product_description,
      tag: tag,
      image: image,
      quantity: qty,
    };
    sendRequest(
      `/api/products/${prodId}`,
      "PATCH",
      body,
      null,
      router.push("/profile"),
      alert("Item succesfully updated!")
    );
  };

  return (
    <>
      {productData ? (
        <Form
          type="Update "
          productData={productData}
          setData={setProductData}
          isSubmitting={loading}
          submitHandler={submitHandler}
        />
      ) : (
        <div className="flex-center h-[50vh]">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Update;
