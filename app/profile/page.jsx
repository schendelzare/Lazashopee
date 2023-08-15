"use client";
import MyProfile from "@components/MyProfile";
import useHttps from "@hooks/https";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Profile = () => {
  const { data, loading, error, sendRequest } = useHttps();
  const { data: session } = useSession();

  useEffect(() => {
    try {
      sendRequest(`/api/user/${session?.user.id}/posts`);
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }, [session?.user.id]);

  return (
    <MyProfile
      desc="Welcome to your personalized profile page."
      userImage={session?.user.image}
      user={session?.user.name}
      email={session?.user.email}
      id={session?.user.id}
      myPost={data}
      isSubmitting={loading}
    />
  );
};

export default Profile;
