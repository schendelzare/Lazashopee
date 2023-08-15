"use client";
import ProductDataProfile from "@components/ProductDataProfile";
import useHttps from "@hooks/https";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductData = (props) => {
  const { data, loading, error, sendRequest } = useHttps();

  const searchParams = useSearchParams();
  const prodId = searchParams.get("prodId");

  const router = useRouter();

  useEffect(() => {
    sendRequest(`/api/products/${prodId}`);
  }, [prodId]);

  //delete product on database
  const deleteHandler = async (id) => {
    const hasConfirmed = confirm("Are you sure you want to delete this?");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/products/${id.toString()}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Delete Failed!");
        }

        router.push("/profile");
        alert("Item successfuly deleted!");
      } catch (error) {
        throw new Error("!omething went wrong!");
      }
    }
  };

  //update the item
  const handleProductUpdate = (id) => {
    router.push(`/products/update-item?prodId=${id}`);
  };

  return (
    <ProductDataProfile
      data={data}
      deleteProduct={deleteHandler}
      updateProduct={handleProductUpdate}
      isSubmitting={loading}
    />
  );
};

export default ProductData;
