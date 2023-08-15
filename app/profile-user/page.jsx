"use client";
import MyProfile from "@components/MyProfile";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const ProfileUser = () => {
  const [data, setData] = useState({ userData: "", productData: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const getUser = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/user/${userId}`);
      const data = await response.json();
      setData((prev) => ({ ...prev, userData: data }));
    } catch (error) {
      throw new Error("Error fetching user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getUserProducts = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/user/${userId}/posts`);
      const data = await response.json();
      setData((prev) => ({ ...prev, productData: data }));
    } catch (error) {
      throw new Error("Error fetching products");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getUser();
    getUserProducts();
  }, [userId]);

  return (
    <div>
      <MyProfile
        desc="Hello visitor!"
        userImage={data.userData.image}
        user={data.userData.username}
        email={data.userData.email}
        id={data.userData._id}
        myPost={data.productData}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ProfileUser;
