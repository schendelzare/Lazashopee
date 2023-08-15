import Loader from "@ui/loader";
import Image from "next/image";
import React from "react";
import ProductList from "./productList";

const MyProfile = ({
  desc,
  userImage,
  user,
  email,
  id,
  myPost,
  isSubmitting,
}) => {
  return (
    <section className="m-5 tracking-tight ">
      {!isSubmitting && userImage ? (
        <div>
          <div className="md:grid grid-cols-2 bg-white rounded-md p-2">
            <div className="flex">
              <Image
                src={userImage}
                width={150}
                height={150}
                alt="user image"
                className="rounded-full p-4 "
                priority={true}
              />

              <div className="flex-center flex-col font-normal text-sm  gap-1 m-auto text-gray-500">
                <span className="font-semibold">{user}</span>
                <span>{email}</span>
                <span>user_id: {id}</span>
              </div>
            </div>
            <div className=" flex-center font-medium">{desc}</div>
          </div>
          {myPost ? (
            <div className="mt-2 ">
              <ProductList data={myPost} />
            </div>
          ) : (
            <p className="flex-center h-[50vh]">
              No data Found! Start selling now!
            </p>
          )}
        </div>
      ) : (
        <div className="flex-center h-[50vh]">
          <Loader />
        </div>
      )}
    </section>
  );
};

export default MyProfile;
