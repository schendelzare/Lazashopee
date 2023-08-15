"use client";
import Form from "@components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddItem = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    tag: "",
    qty: "",
    image: null,
  });
  const { product_name, product_price, product_description, tag, image, qty } =
    productData;

  const [isSubmitting, setSubmitting] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/products/additem", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          product_name: product_name,
          product_price: product_price,
          product_description: product_description,
          tag: tag,
          image: image,
          qty: qty,
        }),
      });

      if (response.ok) {
        router.push("/");
        setProductData({
          product_name: "",
          product_price: "",
          product_description: "",
          tag: "",
          image: "",
          qty: "",
        });
        console.log("Add item succesful!");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Sell "
      productData={productData}
      setData={setProductData}
      isSubmitting={isSubmitting}
      submitHandler={submitHandler}
    />
  );
};

export default AddItem;
